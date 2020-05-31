<script>
import { filterConfig, listPropsConfig, bianGenglistPropsConfig } from './config';
import {postHuiShou, getCaiFaXianEList } from './api';
import wenHaoComm from '@/components/common/wenHao';
import Storage from '@/common/storage';
export default {
    data() {
        const userInfo = Storage.get('userInfo') || {};
        return {
            filterConfig,
            filterData: {
                nianFen: new Date().getFullYear(),
                bianXianBm: userInfo.xzCode,
                page: 1,
                size: 10
            },
            nianFen: new Date().getFullYear(),
            listPropsConfig,
            listData: {
                list: [],
                total: 0
            },
            pagerInfo: {
                pageSize: 10,
                pageNo: 1
            },
            wenHao: '',
            guid: '',
            commBind: {
                prop: {
                    isAllShow: false,
                    rules: [
                        { required: true, message: '请选择文号', trigger: 'blur' }
                    ]
                }
            },
            yiFenPeilistConfig: {
            },
            // 变更表格
            bianGenglistData: [],
            bianGenglistPropsConfig,
            bianGengConfig: {
            }
        };
    },
    components: {
        wenHaoComm
    },
    computed: {
    },
    async created() {
        this.search();
    },
    mounted() {

    },
    methods: {
        // 查询
        async  search(data) {
            let obj = {
                nianFen: this.filterData.nianFen,
                page: this.pagerInfo.pageNo,
                bianXianBm: this.filterData.bianXianBm.substr(0, 10),
                size: this.pagerInfo.pageSize
            };
            if (this.filterData.bianXianBm.length === 12) {
                Object.assign(obj, {guiKouBm: this.filterData.bianXianBm});
            }
            let v = await getCaiFaXianEList(Object.assign(obj, data));
            this.listData = {
                list: v.content,
                total: v.totalElements
            };
            this.nianFen = this.filterData.nianFen;
        },
        // 查询项变化
        async updateForm(data) {
            this.filterData = data;
        },
        // 分页触发
        updatePagerInfo(pageInfo) {
            let obj = {
                page: pageInfo.pageNo,
                size: pageInfo.pageSize
            };
            this.search(obj);
        },
        wenHaoChange(value) {
            this.wenHao = value;
        },
        actionClick({data, action}) {
            if (action === 'huiShou') {
                this.bianGenglistData = [data];
                this.guid = data.guid;
            }
        },
        getQueryByHtml(xHTMLCollection) {
            let obj = {};
            for (let i = 0; i < xHTMLCollection.length; i++) {
                if (xHTMLCollection[i].getAttribute('prop') !== 'undefined') {
                    obj[xHTMLCollection[i].getAttribute('prop')] = Number(xHTMLCollection[i].value);
                }
            }
            return obj;
        },
        // 回收按钮
        async huiShouClick() {
            if (!this.wenHao) {
                alert('请选择文号');
                return;
            }
            const htmlList = document.getElementById('bianGengTable').getElementsByTagName('input');
            let query = this.getQueryByHtml(htmlList);
            let v = await postHuiShou(Object.assign(query, {wenHao: this.wenHao}, {guid: this.guid}));
            if (v.code === 200) {
                this.$message({
                    type: 'success',
                    message: v.message
                });
                this.search();
                this.bianGenglistData = [];
            }
        }
    },
    watch: {
        filterData: {
            handler: async function (value, oldValue) {
                if (JSON.stringify(value) === JSON.stringify(oldValue)) {
                    return;
                }
                this.search();
            },
            deep: true
        }
    }
};
</script>

<template>
    <div>
        <div class="title-bck">第一步  选择单位</div>
        <xcy-form
            :config="filterConfig"
            :data="filterData"
            @input="updateForm"
        />
        <div class="title-bck">第二步  选择要变更项</div>
        <div class="title-bck2">{{nianFen}}年单位已分配指标</div>
        <div class="table-title">单位: 立方米、株</div>
        <xcy-list
            :data="listData"
            :props="listPropsConfig"
            :pagerInfo="pagerInfo"
            :hasPager="true"
            :config="yiFenPeilistConfig"
            @action="actionClick"
            @updatePagerInfo="updatePagerInfo"
        />
        <div class="title-bck2">第三部  变更计划</div>
        <div class="zhui-jia-input">
      <el-form label-width="46px" label-position="left">
        <el-form-item label="文号:">
          <wen-hao-comm v-bind="commBind" @change="wenHaoChange" />
        </el-form-item>
      </el-form>

<div class="table-title">单位: 立方米、株</div>
     <xcy-list
     id="bianGengTable"
            ref="bianGengTable"
            :data="bianGenglistData"
            :props="bianGenglistPropsConfig"
        />
        <div class="explain pt3">说明：（1）只能将生态公益林的更新采伐变更到抚育或其它采伐；先输入更新采伐串出的量，后输入抚育或其它采伐串入的量。</div>
        <div class="explain">说明：（2）只能将商品林的主伐变更到抚育或其它采伐；先输入主伐串出的量，后输入抚育或其它采伐串入的量。</div>
        <div class="table-footer">注：红色字体表示剩余可变更的量。</div>
    <div style="text-align:center">
      <el-button size="small" type="primary" v-if="bianGenglistData.length" @click="huiShouClick">分项变更</el-button>
    </div>
    </div>
    </div>
</template>

<style lang="stylus" scoped>
.container {
    margin: 20px 0;
    padding: 20px;
    border: 1px solid #e6e6e6;
    overflow-y: scroll;
}

.table-title {
  text-align: right;
  margin-bottom: 4px;
  font-size: 12px;
}
.explain {
    font-size 13px;
    padding-bottom 3px;
    color: red;
    background-color yellow
    display inline-block
}
.pt3 {
    padding-top 3px
}
.table-footer {
  text-align: left;
  margin-bottom: 4px;
  font-size: 12px;
  color:red;
}

</style>
