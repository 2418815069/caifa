<script>
import { cloneDeep } from 'lodash';
import { updateYonghu, getYonghu } from './api';
import { formConfig } from './config';
import Storage from '@/common/storage';
import { getXzName } from '@/common/util';
export default {
    data() {
        return {
            formConfig,
            formData: {}
        };
    },
    methods: {
        updateForm(data) {
            this.formData = data;
        },
        // 修改
        async handleModify() {
            let copyFormData = cloneDeep(this.formData);
            this.$refs.userInfo.validate(async (valid) => {
                if (valid) {
                    if (copyFormData.dengLuMm !== copyFormData.dengLuMmAgain) {
                        this.$notify({
                            title: '校验失败',
                            type: 'error',
                            message: '两次密码不一致'
                        });
                        return;
                    }
                    if (!copyFormData.dengLuMm) {
                        delete copyFormData.dengLuMm;
                        delete copyFormData.dengLuMmAgain;
                    }
                    const res = await updateYonghu(copyFormData);
                    if (res) {
                        this.$notify({
                            title: '操作成功',
                            type: 'success',
                            message: '更新用户成功'
                        });
                        // 更新storage里的数据
                        let userInfo = await getYonghu(copyFormData);
                        delete userInfo.quanXianMenu;
                        delete userInfo.quanXian;
                        let storageUserInfo = Storage.get('userInfo') || {};
                        storageUserInfo = {
                            ...storageUserInfo,
                            ...userInfo
                        };
                        Storage.set('userInfo', storageUserInfo);
                        this.init();
                    }
                }
            });
        },
        async init() {
            let userInfo = Storage.get('userInfo') || {};
            userInfo.dengLuMmAgain = '';
            userInfo.dengLuMm = '';
            if (userInfo.xzCode) {
                userInfo.xzCodeName = await getXzName(userInfo.xzCode);
            }
            this.formData = userInfo;
        }
    },
    async created() {
        this.init();
    }
};
</script>

<template>
  <div>
    <xcy-form
      ref="userInfo"
      :config="formConfig"
      :data="formData"
      @input="updateForm"
    />
    <footer class="footer">
        <el-button @click="handleModify" type="primary">修改</el-button>
    </footer>
  </div>
</template>

<style lang="stylus" scoped>
.container {
  margin: 20px 0;
  padding: 20px;
}
.footer
  margin 50px auto
  margin-bottom 30px
  text-align center
</style>
