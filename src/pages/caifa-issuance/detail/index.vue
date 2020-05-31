<script>
import { getCaiFaZhengBtn, handlCaifazhengBtn, getTongZhiShuHtml } from './api';
import { cloneDeep } from 'lodash';
import printHtml from '@/components/common/editor-print';
export default {
    data() {
        return {
            detail: {},
            btnActions: [],
            formDatas: [],
            printValue: ''
        };
    },
    components: {
        printHtml
    },
    async created() {
        this.getDetail();
        console.log('执行操作');
    },
    methods: {
    // 返回按钮（前端）
        goBack() {
            this.$router.go(-1);
        },
        async getDetail() {
            const detail = await getCaiFaZhengBtn(this.$route.query);
            let arr = [];
            detail.map(x => {
                if (x.btnActions) {
                    let config = [];
                    x.btnActions[0].config.map(configItem => {
                        let con;
                        // 上传附件
                        if (configItem.type === 'upload') {
                            con = {
                                label: configItem.label,
                                type: 'upload',
                                prop: configItem.propName,
                                width: 'auto',
                                rules: [
                                    {
                                        required: configItem.rules === '1',
                                        message: configItem.placeholder,
                                        trigger: 'blur'
                                    }
                                ]
                            };
                            config.push(con);
                        }
                        if (configItem.type === 'textarea') {
                            con = {
                                label: configItem.label,
                                type: 'input',
                                width: 'auto',
                                prop: configItem.propName,
                                Attributes: {
                                    type: 'textarea',
                                    maxlength: '100',
                                    placeholder: configItem.placeholder,
                                    style: {
                                        width: '400px'
                                    },
                                    autosize: { minRows: 6, maxRows: 10 }
                                },
                                rules: [
                                    {
                                        required: configItem.rules === '1',
                                        message: configItem.placeholder,
                                        trigger: 'blur'
                                    }
                                ]
                            };
                            config.push(con);
                        }
                        if (configItem.type === 'select') {
                            con = {
                                label: configItem.label,
                                type: 'select',
                                width: 'auto',
                                prop: configItem.propName + 1,
                                needLabel: true,
                                allProps: [configItem.propName, configItem.propVal],
                                placeholder: configItem.placeholder,
                                options: configItem.options,
                                rules: [
                                    {
                                        required: configItem.rules === '1',
                                        message: configItem.placeholder,
                                        trigger: 'blur'
                                    }
                                ]
                            };
                            config.push(con);
                        }
                        if (configItem.type === 'input') {
                            con = {
                                label: configItem.label,
                                type: 'input',
                                width: 'auto',
                                prop: configItem.propName,
                                placeholder: configItem.placeholder,
                                rules: [
                                    {
                                        required: configItem.rules === '1',
                                        message: configItem.placeholder,
                                        trigger: 'blur'
                                    }
                                ]
                            };
                            config.push(con);
                        }
                        if (configItem.type === 'checkbox') {
                            con = {
                                label: configItem.label,
                                type: 'checkbox',
                                prop: configItem.propName,
                                width: 'auto',
                                options: configItem.options,
                                isValue: true,
                                placeholder: configItem.placeholder,
                                rules: [
                                    {
                                        required: configItem.rules === '1',
                                        message: configItem.placeholder,
                                        trigger: 'blur'
                                    }
                                ]
                            };
                            config.push(con);
                        }
                        if (configItem.type === 'radio') {
                            con = {
                                label: configItem.label,
                                type: 'radio',
                                width: 'auto',
                                prop: configItem.propName,
                                options: configItem.options,
                                value: configItem.defaultval,
                                placeholder: configItem.placeholder,
                                rules: [
                                    {
                                        required: configItem.rules === '1',
                                        message: configItem.placeholder,
                                        trigger: 'blur'
                                    }
                                ]
                            };
                            config.push(con);
                        }
                    });
                    arr.push({
                        title: x.actionName,
                        actionId: x.actionId,
                        btnName: x.actionName,
                        config: config
                    });
                } else {
                    arr.push({
                        title: x.actionName,
                        actionId: x.actionId,
                        btnName: x.actionName
                    });
                }
            });

            let formDatas = [];
            this.btnActions = arr.map((btn, index) => {
                formDatas.push(btn.data || {});
                btn.handleUpdate = formData => {
                    let copyDatas = cloneDeep(this.formDatas);
                    copyDatas[index] = formData;
                    this.formDatas = copyDatas;
                };
                btn.handleShow = async (key, actionId) => {
                    // 各类通知书
                    const guid = this.$route.query.guid;
                    if (String(actionId).includes('tong_zhi_shu')) {
                        const options = detail[key].btnActions[0].config[0].options;
                        for (let index = 0; index < options.length; index++) {
                            const element = options[index];
                            if (element.label === 'getUrl') {
                                let htmlStr = await getTongZhiShuHtml(element.value, guid);
                                this.$refs.printLiuChengDanId.setDialogShow();
                                setTimeout(() => {
                                    this.printValue = htmlStr;
                                }, 200);
                            }
                            if (element.label === 'postUrl') {
                                this.$refs.printLiuChengDanId.setSaveTongZhiShu(element.value, guid);
                            }
                        }
                        return;
                    }
                    let copyBtns = cloneDeep(arr);
                    copyBtns[key].dialogVisible = true;
                    this.btnActions = copyBtns;
                };
                btn.handleClose = key => {
                    let copyBtns = cloneDeep(arr);
                    let copyDatas = cloneDeep(this.formDatas);
                    copyDatas[key] = {};
                    copyBtns[key].dialogVisible = false;
                    this.formDatas = copyDatas;
                    this.btnActions = copyBtns;
                };
                btn.handleOk = async (key, actionId) => {
                    this.$refs[actionId][0].validate(async valid => {
                        if (valid) {
                            const formData = this.formDatas[key];
                            formData.guid = this.$route.query.guid;
                            formData.actionId = actionId;
                            if (this.btnActions[key].config) {
                                this.btnActions[key].config.map(configItem => {
                                    if (configItem.type === 'select') {
                                        configItem.allProps.map((allItem, index) => {
                                            if (index === 0) {
                                                formData[allItem] = formData[configItem.prop].label;
                                            }
                                            if (index === 1) {
                                                formData[allItem] = formData[configItem.prop].value;
                                            }
                                        });
                                        // delete formData[configItem.prop];
                                    }
                                });
                            }
                            let v = await handlCaifazhengBtn(formData);
                            if (v.code === 200) {
                                this.$message({
                                    type: 'success',
                                    message: v.message || '操作成功'
                                });
                                btn.handleClose(key);
                                this.$router.go(-1);
                            }
                        }
                    });
                };
                return btn;
            });
            this.formDatas = formDatas;
        }
    }
};
</script>

<template>
  <div class="issuance-detail1">
    <div class="footer">
      <div :key="key" v-for="(btn, key) in btnActions" class="footer-item">
        <el-button
          size="small"
          type="primary"
          @click="btn.handleShow(key,btn.actionId)"
        >{{btn.btnName}}</el-button>
        <el-dialog
          :close-on-click-modal="false"
          :title="btn.title"
          :visible.sync="btn.dialogVisible"
          width="50%"
        >
          <xcy-form
            :ref="btn.actionId"
            :config="btn.config"
            :data="formDatas[key]"
            @input="btn.handleUpdate"
          />
          <span slot="footer" class="dialog-footer">
            <el-button @click="btn.handleClose(key)">取 消</el-button>
            <el-button type="primary" @click="btn.handleOk(key,btn.actionId)">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <el-button size="small" type="primary" @click="goBack">返回</el-button>
    </div>

    <!-- 各种通知书打印组件 -->
    <print-html ref="printLiuChengDanId" v-model="printValue"></print-html>
  </div>
</template>

<style lang="stylus" scoped>
.issuance-detail1 {
  height: 100%;
  box-sizing: border-box;
}

.content {
  padding: 20px;
}

.footer {
  padding: 35px 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  .footer-item {
    margin: 0 10px;
  }
}
</style>
