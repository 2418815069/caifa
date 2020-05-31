<template>
  <div id="app">
    <el-container
      v-if="pageType==='common'"
    >
      <el-header class="not-print">
        <div class="title">
          <div class="zh-CN">全国林木采伐管理系统——{{provinceDisplayName}}(2.0)</div>
          <div class="en-US">The national forest tree cutting management system</div>
        </div>
        <div>
          <span>欢迎您：{{userInfo && userInfo.zhenShiXm}}</span>
          <span style="padding:0 10px">今天是：{{this.$getTime()}} 星期{{"日一二三四五六".charAt(new Date().getDay())}} </span>
          <span class="partition-icon">|</span>
          <el-dropdown
            trigger='click'
            @command="handleCommand"
          >
            <span
              class="el-dropdown-link"
              style="color:white"
            >
              更多操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                command="switchUser"
                v-if="this.$root.isZheJiang"
              >切换账户</el-dropdown-item>
              <el-dropdown-item command="a">常见问题</el-dropdown-item>
              <el-dropdown-item command="b">操作说明</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <span class="partition-icon">|</span>
          <span @click="loginOut">退出</span>
        </div>
      </el-header>
      <el-container>
        <el-aside
          class="not-print el-aside-fixed"
          :width="asideWidth"
          :style="asideStyle"
        >
          <el-menu
            :unique-opened='true'
          >
           <el-menu-item  @click="openOrClose">
            <span slot="title">网页导航</span>
            <i :class="asideHeaderIcon"></i>
            </el-menu-item>
            <el-submenu
              :class="['el-submenu', {'hideArrow': asideHeaderIcon === 'el-icon-right'}]"
              :key='key'
              :index="menu.target"
              v-for="(menu, key) in menus"
            >
              <template slot="title"><i :class="menu.icon"></i>{{menu.menuMc}}</template>
              <el-menu-item
                style="border-bottom: 1px dashed #e1e1e1;"
                v-show="item.menuMc"
                :index="item.target"
                :key="$index"
                v-for="(item, $index) in menu.children"
                @click="handleLink(item,`${menu.target}/${item.target}`)"
              >
                <div>{{item.menuMc}}</div>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main :style="containerH">
          <router-view v-if="routerShow"></router-view>
        </el-main>
      </el-container>
    </el-container>
    <div
      :style="ssoContainerH"
      v-if="pageType==='sso'"
    >
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Storage from '@/common/storage';
import { cloneDeep } from 'lodash';
import request from '@/common/api/request';
import {
    loginOut,
    getprovinceConfig
} from '@/common/util';

export default {
    name: 'app',
    data() {
        const userInfo = Storage.get('userInfo');

        return {
            userInfo,
            containerH: {
                'overflow-y': 'auto',
                'overflow-x': 'hidden',
                'height': `${self.innerHeight - 80}px`
            },
            ssoContainerH: {
                'overflow-y': 'auto',
                'overflow-x': 'hidden',
                'height': `${self.innerHeight}px`
            },
            provinceDisplayName: '',
            menus: [],
            menusStatus: [],
            shouliNum: 0,
            pageType: 'common',
            dialogVisible: false,
            showNoticeArr: [],
            showNoticeItem: [],
            flag: true,
            viewGongGao: [],
            activeName: 'second',
            asideWidth: '170px',
            asideHeaderIcon: 'el-icon-back',
            isMenus: false,
            asideStyle: {
                'height': `${self.innerHeight - 100}px`,
                'background-color': 'rgb(238, 241, 246)'
            },
            routerShow: true
        };
    },
    components: {
    },
    methods: {
        async init() {
            this.filterPage();
            if (this.pageType === 'sso') {return;}
            await this.getMenusApi();
        },
        loginOut() {
            loginOut();
        },
        handleLink(item, link) {
            const { hash } = self.location;
            this.$router.push(link);
            if (hash.includes(link)) {
                this.routerShow = false;
                setTimeout(() => {
                    this.routerShow = true;
                }, 100);
            }
        },
        filterPage() {
            const { hash } = self.location;
            // 用于鉴权是否需要侧边栏
            const ssoType = ['/account', '/print', '/login', '/register', '/zhengwu-shenqing'];
            const isSsoType = ssoType.some(type => {
                return hash.indexOf(type) !== -1;
            });
            if (isSsoType) {
                this.pageType = 'sso';
            } else {
                this.pageType = 'common';
            }
        },
        handleCommand(command) {
            switch (command) {
                case 'switchUser':
                    const guid = Storage.get('userInfo').zhejiangSlzyUsername;
                    // if (guid) {
                    this.$router.push({ path: '/common/account', query: {
                        guid: guid
                    } });
                    // } else {
                    // alert('当前用户为备用通道登录,不能使用当前操作');
                    // }
                    break;

                default:
                    break;
            }
        },
        openOrClose() {
            this.asideWidth = this.asideWidth === '170px' ? '50px' : '170px';
            this.asideHeaderIcon = this.asideHeaderIcon === 'el-icon-right' ? 'el-icon-back' : 'el-icon-right';
        },
        // 获取menu
        /**
         * 获取menu
         * 触发条件 已登录 且 首次请求menus
         */
        async getMenusApi() {
            console.log(4);
            let data = await request({
                url: 'api/v1/jiaose/menuall',
                method: 'get',
                showLoading: false,
                params: {}
            });
            if (!data) {
                return;
            }
            // 鉴权方法
            const menus = this.filterMenus(cloneDeep(data.children));
            this.menus = menus;
            this.userInfo = Storage.get('userInfo');
        },
        // menu鉴权
        filterMenus(menus = []) {
            const { quanXianMenu } = Storage.get('userInfo');
            let quanXianMenus = [];
            quanXianMenu.map( item => {
                quanXianMenus.push(item);
                if (item.length > 3) {
                    const hasfeather = quanXianMenus.indexOf(item.slice(0, 3)) !== -1;
                    if (!hasfeather) {
                        quanXianMenus.push(item.slice(0, 3));
                    }
                }
            });
            let sendMenus = [];
            menus.map(menu => {
                const hasFatherMenu = quanXianMenus.indexOf(menu.menuBm) !== -1;
                if (hasFatherMenu) {
                    let menuObj = cloneDeep(menu);
                    menuObj.children = [];
                    menu.children.map(item => {
                        const hasChildMenu = quanXianMenus.indexOf(item.menuBm) !== -1;
                        if (hasChildMenu) {
                            menuObj.children.push(item);
                        }
                    });
                    sendMenus.push(menuObj);
                }
            });
            return sendMenus;
        },
        // 更新menu
        async updateMenus(provinceName) {
            const updateMenus = require('./update-menus').default;
            await request({
                url: 'api/v1/jiaose/menuall',
                method: 'post',
                params: {
                    provinceName,
                    menuValue: JSON.stringify(updateMenus)
                }
            });
        }
    },
    async created() {
    },
    async mounted() {
        const provinceData = await getprovinceConfig();
        this.provinceDisplayName = provinceData.provinceDisplayName;
        // 设置全局省份
        this.$root.provinceDisplayName = this.provinceDisplayName;
        this.$root.isZheJiang = provinceData.provinceCode === '33';
        this.$root.provinceCode = provinceData.provinceCode;
        this.init();
        // 如果想更新权限树🌲，就把方法打开。
        // this.updateMenus(provinceData.provinceName);
    },
    watch: {
        $route: {
            handler() {
                this.init();
            }
        }
    }
};
</script>
<style lang="stylus">
* {
  margin: 0;
  padding: 0;
}
.group-title {
  font-size 14px
  color #666
  padding-left 10px
  border-left 6px solid #88b780
  padding-right 10px
  line-height 25px
}

.el-aside {
  &::-webkit-scrollbar {
    display none
  }
}
/*====打印功能样式====*/
@media print {
  .not-print {
    opacity: 0
    display none
  }
  .active-text {
    color: #000000;
  }
  @page {
    size: auto;
    margin: 0mm;
  }
}
/*====打印功能样式====*/
</style>

<style lang="stylus" scoped>
.body {
  background: #000;
  background-color: none;
}

.el-header {
  background-color: #487367;
  color: #333;
  text-align: right;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
}
.item {
  margin-top: 10px;
  margin-right: 40px;
}
.el-aside-fixed{

}

.title {
  text-align: left;
}

.zh-CN {
  font-size: 20px;
  font-weight: 700;
}

.en-Us {
  font-size: 12px;
}

.el-icon-setting {
  margin-right: 15px;
}

.el-aside {
  overflow-x:hidden;
  overflow-y:auto;
  color: #333;
}

.partition-icon {
  padding: 0 20px;
}

.table {
  border-collapse: collapse;
}

.el-submenu.hideArrow >>> .el-submenu__title > .el-submenu__icon-arrow {
  display none
}
</style>
