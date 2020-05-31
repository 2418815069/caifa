<script>
import { formConfig } from './config';
import { cloneDeep } from 'lodash';
import { registerApi } from './api';
import {getprovinceConfig} from '@/common/util';
import Storage from '@/common/storage';

export default {
    data() {
        return {
            formConfig,
            formData: {},
            provinceDisplayName: ''
        };
    },
    components: {
    },
    async created() {
        let v = await getprovinceConfig();
        this.provinceDisplayName = v.provinceDisplayName;
    },
    methods: {
        handleEditUpdate(formData) {
            this.formData = formData;
        },
        goBack() {
            this.$router.back();
        },
        hanleRegister() {
            this.$refs.registerForm.validate(async (valid) => {
                if (valid) {
                    let copyData = cloneDeep(this.formData);
                    if (copyData.dengLuMm !== copyData.dengLuMmAgain) {
                        this.$message('两次密码不一致');
                        return;
                    }
                    copyData.yongHuLx = copyData.registerLink.yongHuLx;
                    if (copyData.registerLink.yongHuLx === '1') {
                        const provinceData = Storage.get('provinceData');
                        copyData.xzCode = provinceData.provinceCode;
                    }
                    if (copyData.registerLink.yongHuLx === '2') {
                        copyData.xzCode = copyData.registerLink.shi;
                        if (!copyData.xzCode) {
                            this.$message('需要选择市');
                            return;
                        }
                    }
                    if (copyData.registerLink.yongHuLx === '3') {
                        copyData.xzCode = copyData.registerLink.xian;
                        if (!copyData.xzCode) {
                            this.$message('需要选择县');
                            return;
                        }
                    }
                    if (copyData.registerLink.yongHuLx === '4') {
                        copyData.xzCode = copyData.registerLink.xiang;
                        if (!copyData.xzCode) {
                            this.$message('需要选择乡，如果没有乡数据，请重新选择..');
                            return;
                        }
                    }
                    if (!copyData.xzCode) {
                        this.$message('请选择所属区域');
                        return;
                    }
                    delete copyData.registerLink;
                    const res = await registerApi(copyData);
                    if (res) {
                        this.$notify({
                            title: '提示',
                            type: 'success',
                            message: '注册成功'
                        });
                        setTimeout(() => {
                            this.$router.back();
                        }, 500);
                    } else {
                        this.$notify({
                            title: '提示',
                            type: 'error',
                            message: '注册失败'
                        });
                    }
                }
            });
        }
    },
    mounted: function () {
    },
    beforeDestroy: () => {
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
    <el-main class="register-main">
      <div class="register">
        <div class="register-type">用户注册</div>
        <xcy-form
            class="registerForm"
            ref="registerForm"
            :config="formConfig"
            :data="formData"
            @input="handleEditUpdate"
        />
        <footer class="footer">
          <el-button @click="hanleRegister" type="primary">注册</el-button>
          <el-button @click="goBack">返回</el-button>
        </footer>
      </div>
    </el-main>
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
.register
  width 800px
  margin 50px auto
.register-type
  text-align center
  font-size 20px
  margin-bottom 10px
  margin-top 50px
.footer
  margin 0px auto
  margin-bottom 30px
  text-align center
.register-main
  margin-bottom 0
.registerForm
  margin 10px 0
</style>
