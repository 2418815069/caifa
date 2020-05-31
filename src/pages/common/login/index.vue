<script>
import { getVerificationCode, toLogin, getUserInfo, verificationCode } from './api';
import Storage from '@/common/storage';
import {getprovinceConfig} from '@/common/util';
export default {
    data() {
        return {
            zhangHaoForm: {
                dengLuMc: '',
                dengLuMm: '',
                pass: ''
            },
            user: {},
            provinceDisplayName: '',
            pass: '',
            phone: '',
            phoneCode: '',
            loginType: 'user',
            count: '',
            show: true,
            captcha: '',
            imgdata: '',
            zhangHaorules: {
                dengLuMc: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                dengLuMm: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                pass: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ]
            },
            ruleForm: {
                phone: '',
                code: ''
            },
            ruleFormRules: {
                phone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ]
            }
        };
    },
    components: {
    },
    async created() {
        let v = await getprovinceConfig(false);
        this.provinceDisplayName = v.provinceDisplayName;
        this.refreshCaptcha();
    },
    methods: {
        switchTo(type) {
            console.log(type);
            if (type === 'phone') {
                this.$refs.zhangHaoForm.clearValidate();
            } else {
                this.$refs.ruleForm.clearValidate();
            }
            this.loginType = type;
        },
        getCode() {
            console.log(11);
            if (!this.ruleForm.phone || this.ruleForm.phone && this.ruleForm.phone.length !== 11) {
                alert('请输入正确手机号码');
                return;
            }
            const TIME_COUNT = 60;
            if (!this.timer) {
                getVerificationCode(this.ruleForm.phone);
                this.count = TIME_COUNT;
                this.show = false;
                this.timer = setInterval(() => {
                    if (this.count > 0 && this.count <= TIME_COUNT) {
                        this.count--;
                    } else {
                        this.show = true;
                        clearInterval(this.timer);
                        this.timer = null;
                    }
                }, 1000);
            }
        },
        async refreshCaptcha() {
            this.imgdata = `${process.env.VUE_APP_BASE_API}/public/api/v1/code/image?${Math.random()}`;
        },
        handleRegister() {
            this.$router.push('/common/register');
        },
        async login(type, id, data) {
            this.$refs[id].validate(async (valid) => {
                if (valid) {
                    if (type === 'user') {
                        let loginData = {
                            dengLuMc: data.dengLuMc,
                            dengLuMm: data.dengLuMm
                        };
                        let resData = await toLogin(loginData, data.pass);
                        if (!resData) {
                            this.refreshCaptcha();
                            return;
                        }
                        Storage.set('jwt', resData.token);
                    }
                    if (type === 'phone') {
                        let resData = await verificationCode(data);
                        this.user = resData.user;
                        if (resData) {
                            this.isDefaultToCaiFa(resData.userList);
                        }
                        return;
                    }
                    setTimeout(() => {
                        this.$router.push('./document-manage');
                    }, 300);
                    const datas = await getUserInfo();
                    // // 加强userinfo属性
                    let allUser = { ...datas };
                    Storage.set('userInfo', allUser);
                }
            }
            );
        },
        // 使用默认账号进入系统
        async isDefaultToCaiFa(userList) {
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
            alert('该手机号不是平台默认有效账号，请绑定后登录');
        },
        // 登陆
        async handleLogoin(user) {
            Storage.set('jwt', user.jwt);
            const data = await getUserInfo();
            let allUser = Object.assign(data, {guid: this.user.guid});
            Storage.set('userInfo', allUser);
            setTimeout(() => {
                this.$router.push('./document-manage');
            }, 300);
        },
        addKeyDown() {
            window.onkeydown = () => {
                let key = window.event.keyCode;
                if (key === 13) {
                    if (this.loginType === 'user') {
                        this.login('user', 'zhangHaoForm', this.zhangHaoForm);
                    } else {
                        this.login('phone', 'ruleForm', this.ruleForm);
                    }
                }
            };
        }
    },
    mounted: function () {
        this.addKeyDown();
    },
    beforeDestroy: () => {
        window.onkeydown = null;
    },
    watch: {
        zhangHaoForm: function name() {
            this.$refs.zhangHaoForm.validate();
        },
        ruleForm: function name() {
            this.$refs.ruleForm.validate();
        }
    }
};
</script>

<template>
  <el-container>
    <el-header>
      <div class="title">
        <div class="zh-CN">全国林木采伐管理系统——{{provinceDisplayName}}(2.0)</div>
        <div class="en-US">National Forest Harvesting Management System</div>
      </div>
    </el-header>
    <el-main>
      <div>
        <el-form
          ref="zhangHaoForm"
          :model="zhangHaoForm"
          :rules="zhangHaorules"
          label-width="100px"
          class="card"
          v-if="loginType === 'user'"
          style="width:350px"
        >
          <div class="login-type">用户登录</div>
          <el-form-item label="用户名：" prop="dengLuMc">
            <el-input type="input" placeholder="请输入用户名" v-model="zhangHaoForm.dengLuMc" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="dengLuMm">
            <el-input placeholder="请输入密码" v-model="zhangHaoForm.dengLuMm" show-password></el-input>
          </el-form-item>
          <el-form-item label="验证码：" prop="pass" >
            <el-row>
              <el-col :span="10">
                <el-input v-model="zhangHaoForm.pass"></el-input>
              </el-col>
              <el-col :span="10">
                <img
                  :src="imgdata"
                  alt="验证码"
                  @click="refreshCaptcha"
                  style="min-width:100%;margin-left:1vw;height:40px"
                />
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" style="width:100%" @click="login('user','zhangHaoForm',zhangHaoForm)">登录</el-button>
          </el-form-item>
          <el-form-item v-if="!this.$root.isZheJiang">
            <el-button style="width:100%" @click.stop="handleRegister">注册</el-button>
          </el-form-item>
          <el-form-item v-if="this.$root.isZheJiang">
            <el-button type="primary" style="width:100%" @click="switchTo('phone')">切换至手机验证码登录</el-button>
          </el-form-item>
        </el-form>

        <el-form
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          :model="ruleForm"
          :rules="ruleFormRules"
          v-if="loginType === 'phone'"
          style="width:350px"
        >
          <div class="login-type">手机号验证码登录</div>
          <el-form-item label="手机号：" prop="phone">
            <el-input
              type="input"
              placeholder="请输入手机号"
              v-model="ruleForm.phone"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="验证码：" prop="code">
            <el-input style="width:40%" v-model="ruleForm.code"></el-input>
            <el-button style="float：right" @click="getCode">
              <span v-show="show">发送验证码</span>
              <span v-show="!show" class="count">{{count}}</span>
            </el-button>
          </el-form-item>
          <el-form-item v-if="!this.$root.isZheJiang">
            <el-button type="primary" style="width:100%" @click.stop="handleRegister">注册</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width:100%" @click="login('phone','ruleForm',ruleForm)">登录</el-button>
          </el-form-item>
          <el-form-item>
          <el-button type="primary" style="width:100%" @click="switchTo('user')">切换用户名密码登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>

<style lang="stylus" scoped>
.el-container
  height 100vh
.body
  background #000
  background-color none
.el-header
  background-color #487367
  color #333
  text-align right
  font-size 12px
  display flex
  justify-content space-between
  align-items center
  color #fff
.title
  text-align left
.zh-CN
  font-size 20px
  font-weight 700
.en-Us
  font-size 12px
.el-main
  display flex
  justify-content center
  align-items center
  margin-bottom 10vh
.el-col
  display flex
  justify-content center
  align-items center
.login-type
  text-align center
  font-size 20px
  margin-bottom 5vh
</style>
