<script>
import { listPropsConfig } from './config';
import { getList, deleteItem, addYanZheng, editItem } from './api';
import danWeiComm from '@/components/common/danwei';
import Storage from '@/common/storage';
import {cloneDeep} from 'lodash';

export default {
    data() {
        return {
            // 新增相关
            addDialogVisible: false,
            formData: {
                mingCheng: '',
                jianCheng: ''
            },
            bianMa1: '',
            bianMa2: '',
            formDataRules: {
                mingCheng: [
                    { required: true, message: '请输入规则名称', trigger: 'blur' },
                    { pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]{0,50}$/, message: '请输入名称', trigger: 'blur'}
                ],
                jianCheng: [
                    { required: true, message: '请输入简称', trigger: 'blur' },
                    { pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]{0,50}$/, message: '请输入正确简称', trigger: 'blur'}
                ]
            },
            listPropsConfig,
            listData: {
                list: [],
                total: 0
            },
            danWeiBind: {
                prop: {
                    guiKouShow: false
                    // shiXianShow: true
                }
            },
            bianXianDw: Storage.get('userInfo').xzCode,
            isEdit: '',

            pagerInfo: {
                pageSize: 10,
                pageNo: 1,
                currentPage: 1
            }
        };
    },
    components: {
        danWeiComm
    },
    methods: {
        // 打开新增弹窗
        addShenHeGuiZe() {
            console.log(this.bianXianDw);
            this.isEdit = false;
            this.formData = {};
            if (this.bianXianDw.length === 10) {
                this.addDialogVisible = true;
                this.bianMa1 = this.bianXianDw;
                this.bianMa2 = '';
            } else {
                alert('请选择编限单位');
            }

        },
        addFormUpdate(data) {
            this.formData = data;
        },
        danWeiChange(value) {
            this.bianXianDw = value;
        },
        async addOk() {
            let reg = /^[0-9]{2,2}$/;
            if (!reg.test(this.bianMa2)) {
                this.$message.error('提交失败，请输入两位数编码');
                return;
            }
            this.$refs.formRef.validate(async valid => {
                if (valid) {
                    this.formData.bianMa = this.bianMa1 + this.bianMa2;
                    this.formData.bianXianDw = this.bianMa1;
                    if (this.formData.bianMa2) {
                        delete this.formData.bianMa2;
                    }
                    if (this.formData.creationTime) {
                        delete this.formData.creationTime;
                    }

                    let v = '';
                    if (this.isEdit) {
                        v = await editItem(this.formData);
                    } else {
                        v = await addYanZheng(this.formData);
                    }
                    if (v.code === 200) {
                        this.$message({
                            type: 'success',
                            message: v.message
                        });
                        this.addDialogVisible = false;
                        this.fetchList({bianXianDw: this.bianXianDw});
                    }
                }
            });
        },
        addClose() {
            this.addDialogVisible = false;
        },
        updatePagerInfo(pageInfo) {
            this.fetchList(
                Object.assign({ bianXianDw: this.bianXianDw }, { page: pageInfo.pageNo, size: pageInfo.pageSize })
            );
        },
        async fetchList(params) {
            const list = await getList(params);
            this.listData = {
                list: list.content,
                total: list.totalElements
            };
        },
        // 操作区回调
        handleAction({ action, data }) {
            switch (action) {
                case 'delete':
                    this.onDeleteItem(data);
                    break;
                case 'edit':
                    this.isEdit = true;
                    this.formData = cloneDeep(data);
                    this.bianMa1 = data.bianMa.substr(0, 10);
                    this.bianMa2 = data.bianMa.substr(10, 2);
                    this.addDialogVisible = true;
                    break;
            }
        },
        onDeleteItem(data) {
            this.$confirm('确定要删除当前规则', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(async () => {
                    let v = await deleteItem({ guid: data.guid });
                    if (v.code === 200) {
                        this.$message({
                            type: 'success',
                            message: v.message
                        });
                        this.fetchList({bianXianDw: this.bianXianDw});
                    }
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        }
    },
    async created() {
        this.fetchList({bianXianDw: this.bianXianDw});
    },
    watch: {
        bianXianDw: function (value) {
            this.fetchList({bianXianDw: value});
        }
    }
};
</script>

<template>
  <div>
      <el-form>
        <el-form-item label="单位:">
<dan-wei-comm v-bind="danWeiBind" @change="danWeiChange" />
        </el-form-item>
        </el-form>
    <el-button type="primary" size="small" @click="addShenHeGuiZe">创建单位</el-button>
       <el-dialog
      :close-on-click-modal="false"
      title="规则定义"
      :visible.sync="addDialogVisible"
      width="770px"
    >
      <el-form ref="formRef" :model="formData" :rules="formDataRules" v-if="addDialogVisible" label-width="80px">
        <el-form-item label="名称" prop="mingCheng">
          <el-input v-model="formData.mingCheng"></el-input>
        </el-form-item>
        <el-form-item label="简称" prop="jianCheng">
          <el-input v-model="formData.jianCheng"></el-input>
        </el-form-item>
        <el-form-item label="编码" prop="bianMa2">
          <el-row>
            <el-col :span="8">
              <el-input disabled size="small" v-model="bianMa1"></el-input>
            </el-col>
            <el-col :span="16">
              <el-input size="small" v-model="bianMa2"></el-input>
              <span style="color:red">
                  归口单位为12位，现有编码后加两位即可
              </span>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addClose()">取 消</el-button>
        <el-button type="primary" @click="addOk()" v-text="isEdit?'修改':'确定'"></el-button>
      </span>
    </el-dialog>
     <!-- <el-dialog
      :close-on-click-modal="false"
      title="规则定义"
      :visible.sync="addDialogVisible"
      width="770px">
      <xcy-form
            v-if="addDialogVisible"
          ref="addDialogForm"
          :config="addFormConfig"
          :data="addFormData"
          @input="addFormUpdate"
      />
      <span slot="footer" class="dialog-footer">
          <el-button @click="addClose()">取 消</el-button>
          <el-button  type="primary" @click="addOk()" v-text="isEdit?'修改':'确定'"></el-button>
      </span>
      </el-dialog> -->
    <xcy-list
      :data="listData"
      :props="listPropsConfig"
      @action="handleAction"
       :pagerInfo="pagerInfo"
      @updatePagerInfo="updatePagerInfo"
      :hasPager="true"
    />
  </div>
</template>

<style lang="stylus" scoped>
.container {
  margin: 20px 0;
  padding: 20px;
}
</style>
