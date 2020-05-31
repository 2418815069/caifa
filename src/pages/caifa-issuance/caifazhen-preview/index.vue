<script>
import { getItemCaiFaZheng, banJieApi, getJueDingShu, uploadZhaoPian, getCaiFaZhengBtn, isDaYinCaiFaZheng} from './api';
import PrintTemp from '@/components/print-temp';
import {dialogFormConfig, linNongFormConfig} from './config.js';
import printHtml from '@/components/common/editor-print';
export default {
    data() {
        return {
            linNongFormConfig,
            linNongFormData: {},
            detail: {},
            dialogFormConfig,
            dialogVisible: false,
            dialogForm: {
                lzr: '',
                ysh: ''
            },
            printValue: '',
            jueDingShuBtn: false,
            linNongDialog: false
            //  isShengBanZheng: Storage.get('userInfo').jueSeMc === '省办证',
        };
    },
    components: {
        PrintTemp,
        printHtml
    },
    mounted() {
        window.onafterprint = ()=> {
            this.$confirm('是否打印成功', '提示', {
                confirmButtonText: '是',
                cancelButtonText: '否',
                type: 'warning'
            }).then(async () => {
                console.log(this.detail);
                // 林农申请
                if (this.detail.systemType === '5') {
                    this.linNongDialog = true;
                    return;
                }

                let v = await banJieApi(Object.assign({guid: this.$route.query.guid, actionId: 'ban_jie'}, this.dialogForm));
                if (v.code === 200) {
                    this.$message({
                        type: 'success',
                        message: '发放成功'
                    });
                    this.$router.push({ path: '/caifa-issuance/banjie' });
                }
            }).catch(() => {
            });
        };
    },
    async created() {
        let guid = this.$route.query.guid;
        const res = await getItemCaiFaZheng({guid});
        this.detail = res;
        if (this.$root.isZheJiang && this.detail.timberType && this.detail.timberType === '2' || this.detail.timberType === '3') {
            try {
                let guid = this.$route.query.guid;
                await getJueDingShu({guid: guid});
                this.jueDingShuBtn = true;
            } catch (error) {
                console.log('没有决定书');
            }
        }
    },
    methods: {
        async onShowPrintCaiFaZheng() {
            // 不是林农系统调用是否可以打印接口
            if (this.detail.systemType !== '5') {
                let v = await isDaYinCaiFaZheng({guid: this.$route.query.guid});
                if (v.message === '可以打印') {
                    this.dialogVisible = true;
                    if (this.$refs.dialogForm) {
                        this.$refs.dialogForm.resetFields();
                    }
                } else {
                    alert('此采伐证不能打印');
                }
            }

            this.dialogVisible = true;
            if (this.$refs.dialogForm) {
                this.$refs.dialogForm.resetFields();
            }
        },
        async onShowPrintByJueDing() {
            let guid = this.$route.query.guid;
            let v = await getJueDingShu({guid: guid});
            this.jueDingShuBtn = true;
            this.$refs.printLiuChengDanId.setDialogShow();
            setTimeout(() => {
                this.printValue = v;
            }, 200);
            this.$refs.printLiuChengDanId.setSaveTongZhiShu('api/v1/caifazheng/juedingtongzhishu/save', guid);
        },
        handleUpdate(e) {
            this.dialogForm = e;
        },
        linNongHandleUpdate(value) {
            this.linNongFormData = value;
        },
        handleClose() {
            this.dialogVisible = false;
        },
        handleOk() {
            this.$refs.dialogForm.validate(async (valid) => {
                if (valid) {
                    window.print();
                }
            });
        },
        async linNongHandleOk() {
            const isTrue = document.getElementsByClassName('upload-demo')[0].hasChildNodes('ul');
            if (!isTrue || !document.getElementsByClassName('upload-demo')[0].getElementsByTagName('li').length) {
                alert('请上传附件'); return;
            }
            // 上传照片
            const data = this.linNongFormData.uploadRes[this.linNongFormData.uploadRes.length - 1];
            let v = await uploadZhaoPian(Object.assign({}, {guid: this.$route.query.guid}, {attrname: data.name, img: data.response.data.fileUrl }));

            if (v.code === 200) {
                let res = await banJieApi(Object.assign({guid: this.$route.query.guid, actionId: 'ban_jie'}, this.dialogForm));
                if (res.code === 200) {
                    this.$message({
                        type: 'success',
                        message: '发放成功'
                    });
                    this.$router.push({ path: '/caifa-issuance/banjie' });
                }
            } else {
                alert('推送林农系统失败,请从新上传附件');
            }
        },

        linNonghandleClose() {
            this.linNongDialog = false;
        }
    }
};
</script>

<template>
  <div class="caifazheng-preview">
    <toolbar class="not-print" v-if="Boolean(this.$route.query.needDaYinBtn)===true">
        <template slot="button">
            <el-button size="small" type="primary" @click="onShowPrintCaiFaZheng">打印采伐证</el-button>
            <el-button size="small" v-if="jueDingShuBtn" type="primary" @click="onShowPrintByJueDing">打印决定书</el-button>
        </template>
    </toolbar>
    <div class="content not-print">
        <div class="content-item">
        </div>
    </div>
    <print-temp :detail="detail"></print-temp>
    <el-dialog
   :close-on-click-modal="false"
      class="not-print"
      title="采伐证打印信息"
      :visible.sync="dialogVisible"
      width="50%">
      <xcy-form
          ref="dialogForm"
          :config="dialogFormConfig"
          :data="dialogForm"
          @input="handleUpdate"
      />
      <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose()">取 消</el-button>
          <el-button  type="primary" @click="handleOk()">确 定</el-button>
      </span>
      </el-dialog>

      <el-dialog
   :close-on-click-modal="false"
      title="林农证件照"
      :visible.sync="linNongDialog"
      width="50%">
      <xcy-form
      v-if="linNongDialog"
      id="linNongFormId"
          ref="linNongDialogForm"
          :config="linNongFormConfig"
          :data="linNongFormData"
          @input="linNongHandleUpdate"
      />
      <span slot="footer" class="dialog-footer">
          <el-button @click="linNonghandleClose()">取 消</el-button>
          <el-button  type="primary" @click="linNongHandleOk()">确 定</el-button>
      </span>
      </el-dialog>

       <!-- 各种通知书打印组件 -->
    <print-html ref="printLiuChengDanId"  v-model="printValue"></print-html>
  </div>
</template>

<style lang="stylus" scoped>
.button-wrap
  padding-bottom 20px
.content
  padding 20px
.bule
    color: rgb(0, 0, 255);

</style>
