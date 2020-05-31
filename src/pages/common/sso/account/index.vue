<script>
import {
    getUserListByTicket,
    bindUserByGuid,
    setDefault,
    unBindUserByGuid,
    getUserListByGuid,
    getUserInfo,
    quanxianmenu,
    getXingZhengDanWei,
    getXiangArr,
    setUnDefault,
    quanXianShenQing
} from './api';
import {
    getprovinceConfig
} from '@/common/util';
import Storage from '@/common/storage';

const Types = {
    LIE_BIAO: '列表',
    ZHANG_HAO_BANG_DING: '账号绑定',
    QUAN_XIAN_SHEN_QING: '权限申请'
};
import {cloneDeep} from 'lodash';

export default {
    data() {
        return {
            user: {},
            userList: [],
            jueSeArr: [],
            // 绑定账号相关数据
            cityOption: [
                {
                    label: '省',
                    value: '1'
                },
                {
                    label: '市',
                    value: '2'
                },
                {
                    label: '县',
                    value: '3'
                },
                {
                    label: '乡镇',
                    value: '4'
                }
            ],
            bindData: {},
            applyData: {
                // zhen_shi_xm: ''
                jiaoSeBh: '6e54a5a5-db60-4a2f-ae42-4689ef7a9d6d',
                yongHuLx: '1',
                xueLi: '本科',
                zhengZhiMm: '党员',
                xingBie: '男'
            },
            // containerH: `height: ${self.innerHeight - 200}px`,
            type: Types.LIE_BIAO,
            Types,
            areaData: {},
            address: [],
            danWei: '',
            xingZhengJiBie: '1',
            shiArr: [],
            shiValue: '',
            xianValue: '',
            xiangValue: '',
            xianArr: [],
            xiangArr: [],
            jueSeObj: {}
        };
    },
    components: {},
    async created() {
        const provinceData = await getprovinceConfig();
        this.danWei = provinceData.provinceCode;
        await this.init();

        // 设置查询数组
        this.setArr();
    },
    methods: {
        async setArr() {
            let res = await quanxianmenu({page: 1, size: 100000});
            this.jueSeArr = res.content.map(item => {
                return {
                    label: item.jiaoSeMc,
                    value: item.jiaoSeBh
                };
            });
            console.log(999);
            console.log(this.jueSeArr);
        },
        // 初始化
        async init(guids) {
            const {guid, Ticket} = this.$route.query;
            let v = '';
            if (guids) {
                v = await getUserListByGuid({guid: guids});
                this.user = v.user;
            }
            if (Ticket && !guids) {
                v = await getUserListByTicket({token: Ticket});
                this.user = v.user;
                this.isDefaultToCaiFa(v.userList);
            }
            if (guid && !guids) {
                v = await getUserListByGuid({guid: guid});
                this.user = v.user;
            }
            this.shiArr = await getXingZhengDanWei({cParentcode: this.danWei});
            this.userList = v.userList;
        },
        // 单位变化
        danWeiChange(value) {
            this.danWei = value;
        },
        // 使用默认账号进入系统
        async isDefaultToCaiFa(userList) {

            for (let o = 0; o < userList.length; o++) {
                const element = userList[o];
                if (element.jwt) {
                    Storage.set('jwt', element.jwt);
                }
            }

            // 只有一个账号且有效直接进系统
            if (userList.length === 1 && userList[0].isUse === '1') {
                await this.handleLogoin(userList[0]);
                return;
            }

            for (let index = 0; index < userList.length; index++) {
                const element = userList[index];
                // 有默认账号使用默认账号且有效 进入系统
                if (element.isDefault === '1' && element.isUse === '1') {
                    await this.handleLogoin(element);
                    return;
                }
            }
        },
        // 删除用户类型select
        limitUserType() {

        },

        // 判断权限申请用户类型
        checkApplyUserType() {
            console.log(11);
        },
        setUserToThis(user, user_list) {

        },
        // 设置登陆信息
        async setUserInfo(user) {
        },
        // 登陆
        async handleLogoin(user) {
            if (user.isUse === '0') {
                alert(' 此用户无效');
                return;
            }
            Storage.set('jwt', user.jwt);
            const data = await getUserInfo();
            // 加强userinfo属性
            let allUser = Object.assign(data, {guid: this.user.guid});
            Storage.set('userInfo', allUser);
            setTimeout(() => {
                this.$router.push('./document-manage');
            }, 300);
        },
        // 设为默认
        async setDefaultUser(setUser, index) {
            console.log(setUser);
            console.log(this.userList[index]);
            let v = '';
            if (setUser.isDefault === '1') {
                v = await setUnDefault(
                    {
                        yongHuBh: setUser.yongHuBh,
                        guid: this.user.guid
                    }
                );
            } else {
                v = await setDefault(
                    {
                        yongHuBh: setUser.yongHuBh
                    }
                );
            }

            if (v.code === 200) {
                this.$message({
                    type: 'success',
                    message: v.message
                });
                this.init(this.user.guid);
            }
        },
        // 解除绑定
        async handleUnbind(user) {
            console.log(user);
            let v = await unBindUserByGuid({yongHuBh: user.yongHuBh});
            if (v.code === 200) {
                this.$message({
                    type: 'success',
                    message: '设置成功'
                });
                this.init(this.user.guid);
            }
        },
        // 绑定用户
        async bindUser(bindData) {
            console.log(bindData);
            if (!bindData.dengLuMc) {
                alert('请输入用户名');
                return;
            }

            if (!bindData.dengLuMm) {
                alert('请输入密码');
                return;
            }
            let c = await bindUserByGuid(
                {
                    dengLuMC: bindData.dengLuMc,
                    dengLuMm: bindData.dengLuMm,
                    guid: this.user.guid,
                    realName: this.user.realname,
                    tel: this.user.tel
                }
            );
            if (c.code === 200) {
                this.$message({
                    type: 'success',
                    message: '绑定成功'
                });
                this.handleChangeType('列表');
                this.init(this.user.guid);
            }
            console.log(c);
        },
        // 权限申请
        async ssoUserNewRequest() {
            let obj = '';

            obj = Object.assign({}, this.applyData, {xzCode: this.danWei}, {zhejiangSlzyUsername: this.user.guid});
            let arr = [
                'dianHua',
                'jueSeBh',
                'xingBie',
                'xueLi',
                'xzCode',
                'yongHuLx',
                'zhejiangSlzyUsername',
                'zhenShiXm',
                'zhengZhiMm'
            ];
            for (let index = 0; index < arr.length; index++) {
                const element = arr[index];
                if (!obj[element]) {
                    alert('请完善信息');
                    return;
                }
            }
            if (obj.yongHuLx === '1') {
                // delete obj.xzCode;
            }
            if (obj.yongHuLx === '2' && obj.xzCode.length !== 4) {
                alert('请选择行政区域');
                return;
            }
            if (obj.yongHuLx === '3' && obj.xzCode.length !== 6) {
                alert('请选择行政区域');
                return;
            }
            if (obj.yongHuLx === '4' && obj.xzCode.length !== 10) {
                alert('请选择行政区域');
                return;
            }

            let v = await quanXianShenQing(obj);
            if (v.code === 200) {
                this.$message({
                    type: 'success',
                    message: '设置成功'
                });
                this.init();
                this.handleChangeType(Types.LIE_BIAO);
            }
        },

        // 改变type
        async handleChangeType(type) {
            this.type = type;
            if (type === '权限申请') {
                this.shiValue = '';
                this.xianValue = '';
                this.xiangValue = '';
                const provinceData = await getprovinceConfig();
                this.shiArr = await getXingZhengDanWei({cParentcode: provinceData.provinceCode});
                this.applyData = {
                    zhenShiXm: this.user.realname,
                    dianHua: this.user.tel,
                    jueSeBh: '6e54a5a5-db60-4a2f-ae42-4689ef7a9d6d',
                    yongHuLx: '1',
                    xueLi: '本科',
                    zhengZhiMm: '党员',
                    xingBie: '男'
                };
            }
            if (type === '账号绑定') {
                this.bindData = {
                    dengLuMc: '',
                    dengLuMm: ''
                };
            }
        },
        async shiChange(value) {
            this.xianArr = await getXingZhengDanWei({cParentcode: value});
            this.danWei = value;
            this.xianValue = '';
        },
        async xianChange(value) {
            this.xiangArr = await getXiangArr({xianBianMa: value});
            this.danWei = value;
            this.xiangValue = '';
        },
        async xiangChange(value) {
            this.danWei = value;
        },
        async jueSeChange(value) {
            this.jueSeObj = this.jueSeArr.filter(x => {
                if (x.value === value) {
                    return x;
                }
            });
            let copyApplyData = cloneDeep(this.applyData);
            if (String(this.jueSeObj[0].label).includes('省')) {
                copyApplyData.yongHuLx = '1';
            }
            if (String(this.jueSeObj[0].label).includes('市')) {
                copyApplyData.yongHuLx = '2';
            }
            if (String(this.jueSeObj[0].label).includes('县')) {
                copyApplyData.yongHuLx = '3';
            }
            if (String(this.jueSeObj[0].label).includes('乡')) {
                copyApplyData.yongHuLx = '4';
            }
            this.applyData = copyApplyData;
        },
        async yongHuLxChange(value) {
            // 重新选择单位
            this.shiValue = '';
            this.xianValue = '';
            this.xiangValue = '';
            if (value === '1') {
                const provinceData = await getprovinceConfig();
                this.danWei = provinceData.provinceCode;
                if (!String(this.jueSeObj[0].label).includes('省')) {
                    alert('当前角色权限与行政级别不匹配');
                }
            }
            if (value === '2') {
                if (!String(this.jueSeObj[0].label).includes('市')) {
                    alert('当前角色权限与行政级别不匹配');
                }
            }
            if (value === '3') {
                if (!String(this.jueSeObj[0].label).includes('县')) {
                    alert('当前角色权限与行政级别不匹配');
                }
            }
            if (value === '4') {
                if (!String(this.jueSeObj[0].label).includes('乡')) {
                    alert('当前角色权限与行政级别不匹配');
                }
            }
        }
    },
    computed: {},
    watch: {
    }
};
</script>

<template>
    <div>
        <div class="account-managementWrap">
            <div class="account-headerWrap">
                <div class="account-header">
                    <div class="account-headerTitle">全国林木采伐管理系统</div>
                </div>
            </div>
            <div class="account-select" v-if="type === Types.LIE_BIAO">
                <div class="account-select-header">
                    <div class="account-select-headerTitle">姓名：{{user.realname}}</div>
                    <div class="account-select-headerTitle">手机号码：{{user.tel}}</div>
                </div>
                <div class="account-select-body" id="wrapper">
                    <div class="scroll">
                        <ul class="account-list">
                            <li :key="key" v-for="(user, key) in userList" @click="handleLogoin(user)">
                                <a href="javascript:void(0)">
                                    <p>
                                        <b>账号：</b>
                                        <span>{{user.dengLuMc}}</span>
                                    </p>
                                    <p>
                                        <b>地区：</b>
                                        <span>{{user.xzDanwei}}</span>
                                    </p>
                                    <p>
                                        <b>角色：</b>
                                        <span>{{user.jueSe}}</span>
                                    </p>
                                    <p>
                                        <b>状态：</b>
                                        <span v-if="user.status=='有效'" style="color:#419D7A">{{user.status}}</span>
                                        <span v-else>{{user.status}}</span>
                                    </p>
                                </a>
                                <div class="Unlink" @click.stop="handleUnbind(user)" title="解除绑定">
                                    <i class="el-icon-unlock"></i>
                                </div>
                                <div class="checkboxWrap">
                                    <div class="checkbox checkbox-default" @click.stop="setDefaultUser(user,key)">
                                        <div :class="['checkbox-btn', user.isDefault === '1' ? 'checked' : '']"></div>
                                        <span>设为默认帐号</span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <a href="javascript:void(0)">
                                    <i class="fa fa-plus-circle"></i>
                                </a>
                                <div
                                        class="addAccount addAccountNew"
                                        @click="handleChangeType(Types.QUAN_XIAN_SHEN_QING)"
                                >
                                    <a href="javascript:void(0)">权限申请</a>
                                </div>
                                <div
                                        class="addAccount addAccountOld"
                                        @click="handleChangeType(Types.ZHANG_HAO_BANG_DING)"
                                >
                                    <a href="javascript:void(0)">账号绑定</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="account-new" v-if="type === Types.QUAN_XIAN_SHEN_QING">
                <div class="account-new-header">
                    <div class="account-new-headerTitle">权限申请</div>
                    <div class="account-new-headerBtn">
                        <a href="javascript:void(0)" @click="handleChangeType(Types.LIE_BIAO)">返回选择帐号</a>
                    </div>
                </div>
                <div class="account-new-body">
                    <div class="a-form">
                        <div class="a-form-group">
                            <label class="a-label">真实姓名</label>
                            <div class="a-input">
                                <input type="text" v-model="applyData.zhenShiXm" disabled name="realName"/>
                            </div>
                        </div>
                        <div class="a-form-group">
                            <label class="a-label">角色权限</label>
                            <div class="a-input">
                                <el-select
                                        name="userType"
                                        style="width:100%"
                                        @change="jueSeChange"
                                        v-model="applyData.jueSeBh"
                                >
                                    <el-option
                                            v-for="(item,key) in jueSeArr"
                                            :key="key"
                                            :label="item.label"
                                            :value="item.value"
                                            :disabled="item.disabled"
                                    ></el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="a-form-group">
                            <label class="a-label">行政级别</label>
                            <div class="a-input">
                                <el-select
                                        name="userType"
                                        style="width:100%"
                                        @change="yongHuLxChange"
                                        v-model="applyData.yongHuLx"
                                        placeholder="请选择用户类型"
                                >
                                    <el-option
                                            v-for="(item,key) in cityOption"
                                            :key="key"
                                            :label="item.label"
                                            :value="item.value"
                                            :disabled="item.disabled"
                                    ></el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="a-form-group">
                            <label class="a-label">用户部门</label>
                            <div class="a-input">
                                <el-input v-model="applyData.yongHuDw"></el-input>
                            </div>
                        </div>
                        <div class="a-form-group">
                            <label class="a-label">行政区域</label>
                            <div class="a-input">
                                <!-- <dan-wei-comm v-if="applyData.yongHuLx!=='1'" v-bind="danWeiBind" @change="danWeiChange" /> -->
                                <el-select
                                        v-if="applyData.yongHuLx==='2'||applyData.yongHuLx==='3'||applyData.yongHuLx==='4'"
                                        name="userType"
                                        style="width:100%"
                                        v-model="shiValue"
                                        placeholder="请选择市"
                                        @change="shiChange"
                                >
                                    <el-option
                                            v-for="(item,key) in shiArr"
                                            :key="key"
                                            :label="item.cmc"
                                            :value="item.cfrcode"
                                    ></el-option>
                                </el-select>
                                <el-select
                                        v-if="applyData.yongHuLx==='3'||applyData.yongHuLx==='4'"
                                        name="userType"
                                        style="width:100%"
                                        v-model="xianValue"
                                        placeholder="请选择县"
                                        @change="xianChange"
                                >
                                    <el-option
                                            v-for="(item,key) in xianArr"
                                            :key="key"
                                            :label="item.cmc"
                                            :value="item.cfrcode"
                                    ></el-option>
                                </el-select>
                                <el-select
                                        v-if="applyData.yongHuLx==='4'"
                                        name="userType"
                                        style="width:100%"
                                        v-model="xiangValue"
                                        @change="xiangChange"
                                        placeholder="请选择乡镇"
                                >
                                    <el-option
                                            v-for="(item,key) in xiangArr"
                                            :key="key"
                                            :label="item.cmc"
                                            :value="item.cfrcode"
                                    ></el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="a-form-group">
                            <label class="a-label">上岗证号</label>
                            <div class="a-input">
                                <el-input type="text" v-model="applyData.shangGangZh" name="shangGangZh"/>
                            </div>
                        </div>
                        <div class="a-form-group">
                            <label class="a-label">学历</label>
                            <div class="a-input">
                                <el-select name="xueLi" v-model="applyData.xueLi">
                                    <el-option value="博士">博士</el-option>
                                    <el-option value="硕士">硕士</el-option>
                                    <el-option value="本科">本科</el-option>
                                    <el-option value="专科">专科</el-option>
                                    <el-option value="中专">中专</el-option>
                                    <el-option value="高中">高中</el-option>
                                    <el-option value="初中">初中</el-option>
                                    <el-option value="小学">小学</el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="a-form-group">
                            <label class="a-label">政治面貌</label>
                            <div class="a-input">
                                <el-select name="zhengZhiMm" v-model="applyData.zhengZhiMm">
                                    <el-option value="党员">党员</el-option>
                                    <el-option value="团员">团员</el-option>
                                    <el-option value="群众">群众</el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="a-form-group">
                            <label class="a-label">性别</label>
                            <div class="a-input">
                                <el-radio v-model="applyData.xingBie" label="男">男</el-radio>
                                <el-radio v-model="applyData.xingBie" label="女">女</el-radio>
                            </div>
                        </div>
                        <div class="a-form-group">
                            <label class="a-label">联系电话</label>
                            <div class="a-input">
                                <el-input type="text" disabled v-model="applyData.dianHua" name="danWeiPhone"/>
                            </div>
                        </div>
                        <div class="a-form-group">
                            <label class="a-label"></label>
                            <div class="a-input">
                                <input type="submit" @click="ssoUserNewRequest()" style="width: 80px" value="申请"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="account-old" v-if="type === Types.ZHANG_HAO_BANG_DING">
                <div class="account-new-header">
                    <div class="account-old-headerTitle">账号绑定</div>
                    <div class="account-old-headerBtn">
                        <a href="javascript:void(0)" @click="handleChangeType(Types.LIE_BIAO)">返回选择帐号</a>
                    </div>
                </div>
                <div class="account-new-body">
                    <form class="a-form">
                        <div class="a-form-group">
                            <label class="a-label">用户名</label>
                            <div class="a-input" style="width:250px">
                                <input type="text" v-model="bindData.dengLuMc" style="width:240px"/>
                                <span style="color:red">*</span>
                                <!-- <div class="a-input-icon">
                                  <i class="fa fa-user"></i>
                                </div> -->
                            </div>
                        </div>
                        <div class="a-form-group">
                            <label class="a-label">密码</label>
                            <div class="a-input" style="width:250px">
                                <input class="a-input-password" v-model="bindData.dengLuMm" type="password"
                                       style="width:240px"/>
                                <span style="color:red">*</span>
                                <!-- <div class="a-input-icon">
                                  <i class="fa fa-lock"></i>
                                </div> -->
                                <div class="a-input-btn">
                                    <a onClick="passwordToggle()" href="javascript:void(0)">
                                        <i class="fa fa-eye"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="a-form-group">
                            <label class="a-label"></label>
                            <div class="a-input">
                                <input type="submit" value="绑 定" @click="bindUser(bindData)"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
    .el-select-dropdown__item {
        padding: 0 20px;
    }

    .account-managementWrap {
        position: relative;
        background-color: #f0f0f0;
        background-image: url("./images/am_body_bg.jpg");
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        font-family: sans-serif !important;
        height: 100%;
    }

    .account-headerWrap {
        position: relative;
        height: auto;
        background-color: #fff;
        box-shadow: 0 2px 3px rgba(29, 29, 29, 0.15)
    }

    .account-header {
        margin: 0 auto;
        padding: 10px 0;
        width: 960px;
        line-height: 40px;
    }

    .account-header:after {
        content: "";
        display: block;
        clear: both;
    }

    .account-headerTitle {
        float: left;
        color: #303030;
        font-size: 24px;
        font-weight: 600;
        -webkit-touch-callout: none; /* iOS Safari */

        -webkit-user-select: none; /* Chrome/Safari/Opera */

        -khtml-user-select: none; /* Konqueror */

        -moz-user-select: none; /* Firefox */

        -ms-user-select: none; /* Internet Explorer/Edge */

        user-select: none;
    }

    .account-headerBtn {
        float: right;
    }

    .account-headerBtn a {
        color: #297CE2;
    }

    .account-headerBtn a:hover {
        text-decoration: underline;
    }

    .account-select {
        position: relative;
        width: 600px;
        margin: 60px auto;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 2px 3px rgba(0, 0, 0, 0.25);
        overflow: hidden;
    }

    .account-select-header {
        padding: 10px 20px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        line-height: 30px;
        background-color: #297CE2
    }

    .account-select-header:after {
        content: "";
        display: block;
        clear: both;
    }

    .account-select-headerTitle {
        text-align: left;
        font-size: 14px;
        font-weight: 600;
        color: #fff;
    }

    .account-select-headerBtn {
        float: right;
    }

    .account-select-headerBtn a {
        color: #fff;
    }

    .account-select-headerBtn a:hover {
        text-decoration: underline;
    }

    .account-select-body {
        margin: 5px;
        padding: 15px;
        height: 50vh;
        min-height: 240px;
        overflow: hidden;
    }

    .account-list {
        margin-right: -10px;
    }

    .account-list:after {
        content: "";
        display: block;
        clear: both;
    }

    .account-list li {
        position: relative;
        float: left;
        width: 180px;
        margin-right: 10px;
        margin-bottom: 10px;
    }

    .account-list li > a {
        height: 100px;
        padding: 9px;
        border: 1px solid #e0e0e0;
        background-color: #f0f0f0;
        text-align: center;
        display: block;
    }

    .account-list li > a p {
        line-height: 20px;
        font-size: 12px;
        color: #404040;
        text-align: left;
    }

    .account-list li > a i {
        line-height: 80px;
        color: #e0e0e0;
        font-size: 48px;
    }

    .account-list li:hover > a {
        background-color: #FFF4C5;
    }

    .account-list li:hover .Unlink {
        display: block;
    }

    .account-list li:hover > a i {
        color: #c0c0c0;
    }

    .account-list li:hover .checkboxWrap {
        background-color: rgba(0, 0, 0, 0.75)
    }

    .account-list li:hover .account-unbind {
        display: block;
    }

    .account-list li:hover .checkbox.checkbox-default span {
        display: inline-block
    }

    .account-list li:hover .addAccount {
        background-color: rgba(0, 0, 0, 0.25);
        display: block;
    }

    .account-unbind {
        display: none;
        position: absolute;
        z-index: 99;
        top: 10px;
        right: 10px;
        width: 14px;
        height: 14px;
    }

    .account-unbind > a {
        width: 100%;
        height: 100%;
        display: block;
        line-height: 14px;
        font-size: 14px;
        color: #ff8888;
        text-align: center;
    }

    .account-unbind > a:hover {
        color: #ff3333;
    }

    .account-unbind > a i {
        text-align: left;
    }

    .checkboxWrap {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        margin: 0;
        padding: 1px;
        height: 22px;
    }

    .checkbox.checkbox-default {
        position: relative;
        float: right;
        top: 0;
        margin-right: 5px;
    }

    .checkbox.checkbox-default span {
        position: absolute;
        top: 0;
        left: -78px;
        display: none;
        font-size: 12px;
        color: #fff;
        line-height: 20px;
    }

    .checkbox.checkbox-default label {
        top: 2px;
        padding-left: 0;
    }

    .checkbox.checkbox-default label::before {
        border-radius: 50%;
    }

    .checkbox.checkbox-default input[type="checkbox"]:checked + label::before {
        border: 2px solid #03e64e;
        background-color: #03e64e;
    }

    .radio input[type="radio"]:checked + label::before {
        border: 2px solid #03e64e;
        background-color: #03e64e;
    }

    .account-list li .addAccount {
        height: 100px;
        position: absolute;
        top: 0;
        bottom: 0;
        width: 50%;
        text-align: center;
    }

    .account-list li .addAccountNew {
        left: 0;
    }

    .account-list li .addAccountOld {
        right: 0;
    }

    .account-list li .addAccount > a {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 80px;
        height: 30px;
        margin-top: -15px;
        margin-left: -40px;
        padding: 0;
        line-height: 30px;
        text-align: center;
        background-color: #297CE2;
        color: #fff;
        font-size: 12px;
        border: none;
        display: block;
    }

    .account-new, .account-old {
        margin: 60px auto;
        width: 600px;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 2px 3px rgba(0, 0, 0, 0.25);
        overflow: hidden;
    }

    .account-new-header, .account-old-header {
        padding: 10px 20px;
        background-color: #297CE2;
    }

    .account-new-header:after, .account-old-header:after {
        content: "";
        display: block;
        clear: both;
    }

    .account-new-headerTitle, .account-old-headerTitle {
        float: left;
        font-size: 20px;
        line-height: 40px;
        font-weight: 600;
        color: #fff;
    }

    .account-new-headerBtn, .account-old-headerBtn {
        float: right;
    }

    .account-new-headerBtn a, .account-old-headerBtn a {
        color: #fff;
        font-size: 14px;
        line-height: 40px;
    }

    .account-new-headerBtn a:hover, .account-old-headerBtn a:hover {
        text-decoration: underline
    }

    .account-new-body, .account-old-body {
        padding: 30px 60px;
    }

    .a-form {
    }

    .a-form-group {
        margin: 15px 0;
    }

    .a-label {
        display: inline-block;
        width: 120px;
        padding: 0 5px;
        text-align: right;
        vertical-align: top;
        line-height: 30px;
        color: #404040;
    }

    .a-input {
        position: relative;
        display: inline-block;
        width: 240px;
        vertical-align: middle;
    }

    .a-input input[type="text"], .a-input input[type="password"] {
        width: 100%;
        height: 30px;
    }

    .account-old .a-input input[type="text"], .account-old .a-input input[type="password"] {
        padding-left: 30px;
    }

    .a-input input[type="submit"] {
        width: 120px;
        height: 40px;
        margin-top: 10px;
        background-color: #297CE2;
        border-radius: 2px;
        border: none;
        color: #fff;
        font-size: 14px;
        text-align: center;
        box-shadow: 0 2px 3px rgba(41, 124, 226, .3)
    }

    .a-input input[type="submit"]:active {
        box-shadow: none;
    }

    .a-input select {
        width: 100%;
        height: 30px;
        padding-right: 0;
        padding-top: 0;
        padding-bottom: 0;
        line-height: 28px;
    }

    .a-input select + select {
        margin-top: 15px;
    }

    .a-input .radio {
        margin: 5px 15px 5px 0
    }

    .a-input .a-input-icon {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 30px;
        text-align: center
    }

    .a-input .a-input-icon i {
        line-height: 30px;
        color: #ddd;
        font-size: 14px;
    }

    .a-input .a-input-btn {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 30px;
        text-align: center
    }

    .a-input .a-input-btn i {
        line-height: 30px;
        color: #ccc;
        font-size: 14px;
    }

    .checkbox-btn {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 1px solid #c0c0c0;
    }

    .checkbox-btn.checked {
        background-color: #03e64e;
        border: 2px solid #03e64e;
    }

    .checkbox-btn.checked::after {
        content: "";
        display: inline-block;
        position: absolute;
        width: 5px;
        height: 9px;
        top: 2px;
        left: 6px;
        padding-left: 2px;
        padding-top: 2px;
        font-size: 14px;
        color: #788188;
        -webkit-transition: border 0.15s ease-in-out, color 0.15s ease-in-out;
        -o-transition: border 0.15s ease-in-out, color 0.15s ease-in-out;
        transition: border 0.15s ease-in-out, color 0.15s ease-in-out;
        border-bottom: 2px solid #ffffff;
        border-right: 2px solid #ffffff;
        -webkit-transform: rotate(40deg);
        -ms-transform: rotate(40deg);
        transform: rotate(40deg);
    }

    .Unlink {
        display: none;
        position: absolute;
        top: 5px;
        right: 5px;
        padding: 3px;
        font-size: 16px;
        color: pink;
        cursor: pointer;
        border-radius: 5px;
    }

    /* CSS Document */

    *, *:before, *:after {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    body, div, ul, ol, li, h1, h2, h3, h4, h5, h6, form, input, fieldset, textarea, p, th, td {
        margin: 0;
        padding: 0;
    }

    body, fieldset, img {
        border: none;
    }

    html, body {
        display: block;
        overflow: auto;
        width: 100%;
        height: 100%;
    }

    body {
        position: relative;
        font-size: 14px;
        line-height: 1.428571429;
        color: #333333;
        font-family: "Microsoft YaHei", "sans-serif", "San Francisco Display", "firstFont" !important;
        background: #ffffff;
    }

    a {
        text-decoration: none;
        cursor: pointer;
        color: inherit;
    }

    a:link,
    a:visited,
    a:hover,
    a:focus,
    a:active,
    input {
        outline: 0;
    }

    b,
    strong {
        font-weight: bold;
    }

    ul, ol, li {
        list-style: none;
    }

    img {
        display: block;
    }

    input,
    textarea,
    select {
        font-size: 16px;
    }

    select,
    textarea,
    input[type='text'],
    input[type='search'],
    input[type='password'],
    input[type='datetime'],
    input[type='datetime-local'],
    input[type='date'],
    input[type='month'],
    input[type='time'],
    input[type='week'],
    input[type='number'],
    input[type='email'],
    input[type='url'],
    input[type='tel'],
    input[type='color'] {
        display: inline-block;
        padding: 4px 6px;
        font-size: 12px;
        font-weight: normal;
        line-height: 20px;
        -webkit-user-select: text;
        border: 1px solid #c8dcf3;
        border-radius: 2px;
        color: #788188;
        font-family: inherit;
        transition: border linear .2s, box-shadow linear .2s;
    }

    select {
        height: 30px;
    }

    input:hover,
    textarea:hover,
    select:hover {
        border-color: #97b5d8;
        z-index: 99;
    }

    input:focus,
    textarea:focus,
    select:focus,
    input:active,
    textarea:active,
    select:active {
        outline: 0;
    }

    input[disabled], textarea[disabled], select[disabled], input[disabled='disabled'], textarea[disabled='disabled'], select[disabled='disabled'],
    input[disabled]:hover, textarea[disabled]:hover, select[disabled]:hover, input[disabled='disabled']:hover, textarea[disabled='disabled']:hover, select[disabled='disabled']:hover {
        border-color: #e9e9e9;
        background-color: #f9f9f9;
    }

    code {
        margin: 0 10px;
        padding: 3px 5px;
        color: #333;
        font-size: 12px;
        border-radius: 3px;
        vertical-align: middle;
        background-color: rgba(255, 102, 0, 0.25);
    }

    cite {
        font-style: normal;
        padding: 0 8px;
    }

    .row {
        margin: 0;
        padding: 0;
        width: 100%;
        height: auto;
    }

    div .row:last-child {
        margin-bottom: 0;
    }

    .row:before, .row:after {
        display: table;
        content: ' ';
    }

    .row:after {
        clear: both;
    }

    .col-mx-1, .col-mx-2, .col-mx-2-4, .col-mx-3, .col-mx-4, .col-mx-5, .col-mx-6, .col-mx-7, .col-mx-8, .col-mx-9, .col-mx-10, .col-mx-11, .col-mx-12 {
        min-height: 1px;
    }

    .row > [class*='col-mx-'] {
        float: left;
    }

    .col-mx-12 {
        width: 100%;
    }

    .col-mx-11 {
        width: 91.6667%;
    }

    .col-mx-10 {
        width: 83.3333%;
    }

    .col-mx-9 {
        width: 75%;
    }

    .col-mx-8 {
        width: 66.6667%;
    }

    .col-mx-7 {
        width: 58.3333%;
    }

    .col-mx-6 {
        width: 50%;
    }

    .col-mx-5 {
        width: 41.1667%;
    }

    .col-mx-4 {
        width: 33.3333%;
    }

    .col-mx-3 {
        width: 25%;
    }

    .col-mx-2-4 {
        width: 20%;
    }

    .col-mx-2 {
        width: 16.6667%;
    }

    .col-mx-1 {
        width: 8.3333%;
    }

    .float-right {
        float: right;
    }

    .float-left {
        float: left;
    }

    .clear-both:after {
        content: "";
        display: block;
        clear: both;
    }


</style>
