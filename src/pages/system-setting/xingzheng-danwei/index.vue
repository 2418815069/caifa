<script>
import {listPropsConfig, addFormConfig} from './config';
import {getList, deleteItem, addYanZheng, editItem} from './api';
import danWeiComm from '@/components/common/danwei';
import Storage from '@/common/storage';

export default {
    data() {
        return {
            // 新增相关
            addDialogVisible: false,
            addFormData: {},
            addFormConfig,
            listPropsConfig,
            listData: [],
            danWeiBind: {
                prop: {
                    // guiKouShow: false,
                    shiXianShow: true
                }
            },
            cParentcode: Storage.get('userInfo').xzCode,
            isEdit: ''
        };
    },
    components: {
        danWeiComm
    },
    methods: {
        // 打开新增弹窗
        addShenHeGuiZe() {
            console.log(this.cParentcode);
            this.isEdit = false;
            this.addFormData = {};
            if (this.cParentcode.length === 4) {
                this.addDialogVisible = true;
                this.addFormData.ccode = this.cParentcode;
            } else {
                alert('请选择市');
            }

        },
        addFormUpdate(data) {
            this.addFormData = data;
        },
        danWeiChange(value) {
            this.cParentcode = value;
        },
        async addOk() {
            console.log(this.addFormData);
            this.$refs.addDialogForm.validate(async valid => {
                if (valid) {
                    let length = this.addFormData.ccode.endsWith('00') ? 4 : 6;
                    let obj = {
                        cparentcode: this.addFormData.ccode.substr(0, length - 2),
                        cfrcode: this.addFormData.ccode.substr(0, length)
                    };
                    let v = '';
                    if (this.isEdit) {
                        v = await editItem(Object.assign(this.addFormData, obj));
                    } else {
                        v = await addYanZheng(Object.assign(this.addFormData, obj));
                    }
                    if (v.code === 200) {
                        this.$message({
                            type: 'success',
                            message: v.message
                        });
                        this.addDialogVisible = false;
                        this.fetchList({cParentcode: this.cParentcode});
                    }
                }
            });

        },
        addClose() {
            this.addDialogVisible = false;
        },
        async fetchList(params) {
            const list = await getList(params);
            this.listData = list;
        },
        // 操作区回调
        handleAction({action, data}) {
            switch (action) {
                case 'delete':
                    this.onDeleteItem(data);
                    break;
                case 'edit':
                    this.isEdit = true;
                    this.addFormData = data;
                    this.addDialogVisible = true;
                    break;
            }
        },
        onDeleteItem(data) {
            this.$confirm('确定要删除当前行政区划', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(async () => {
                    let v = await deleteItem({guid: data.guid});
                    if (v.code === 200) {
                        this.$message({
                            type: 'success',
                            message: v.message
                        });
                        this.fetchList({cParentcode: this.cParentcode});
                    }
                });
        }
    },
    async created() {
        this.fetchList({cParentcode: this.cParentcode});
    },
    watch: {
        cParentcode: function (value) {
            this.fetchList({cParentcode: value});
        }
    }
};
</script>

<template>
    <div>
        <el-form>
            <el-form-item label="单位:">
                <dan-wei-comm v-bind="danWeiBind" @change="danWeiChange"/>
            </el-form-item>
        </el-form>
        <el-button type="primary" size="small" @click="addShenHeGuiZe">创建行政区划</el-button>
        <el-dialog
                :close-on-click-modal="false"
                title="创建行政区划"
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
          <el-button type="primary" @click="addOk()" v-text="isEdit?'修改':'确定'"></el-button>
      </span>
        </el-dialog>
        <xcy-list
                :data="listData"
                :props="listPropsConfig"
                @action="handleAction"
        />
    </div>
</template>

<style lang="stylus" scoped>
    .container {
        margin: 20px 0;
        padding: 20px;
    }
</style>
