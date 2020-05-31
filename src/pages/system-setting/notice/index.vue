<script>
import { cloneDeep } from 'lodash';
import { getGonggaoList, deleteGonggao, saveGonggao, editGonggao } from './api';
import { listPropsConfig, formConfig } from './config';
export default {
    data() {
        return {
            listPropsConfig,
            formConfig,
            listData: {
                list: [],
                total: 0
            },
            pagerInfo: {
                pageSize: 10,
                pageNo: 1,
                currentPage: 1
            },
            formData: {},
            editFormData: {},
            viewFormData: {},
            addVisible: false,
            editVisible: false,
            viewVisible: false
        };
    },
    components: {
    },
    computed: {
        // 是否是综合查询
        isIntegratedQuery: function () {
            return window.location.hash.indexOf('integrated-query/view-notice') !== -1;
        },
        listPropsConfigC: function () {
            let copyListProps = cloneDeep(this.listPropsConfig);
            if (this.isIntegratedQuery) {
                copyListProps[copyListProps.length - 1].formatActions = function () {
                    return [{
                        label: '查看',
                        action: 'view'
                    }];
                };
            }
            return copyListProps;
        }
    },
    async created() {
        this.handeleQuery();
    },
    methods: {
        // 查询触发
        async handeleQuery() {
            const res = await getGonggaoList(Object.assign({}, {
                page: this.pagerInfo.pageNo,
                size: this.pagerInfo.pageSize
            }));
            this.listData.list = res.content;
            this.listData.total = res.totalElements;
        },
        // 操作区回调
        async handleAction({ action, data }) {
            switch (action) {
                case 'view':
                    this.viewVisible = true;
                    this.viewFormData = data;
                    break;
                case 'delete':
                    this.onDeleteItem(data);
                    break;
                case 'edit':
                    this.editVisible = true;
                    this.editFormData = data;
                    break;
            }
        },
        onDeleteItem(data) {
            this.$confirm('确定要删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const res = await deleteGonggao(data);
                if (res) {
                    this.handeleQuery();
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // 分页触发
        updatePagerInfo(pageInfo) {
            this.pagerInfo = pageInfo;
            this.handeleQuery();
        },
        handleAdd() {
            this.formData = {};
            this.addVisible = true;
        },
        async saveApply() {
            this.$refs.addForm.validate(async (valid) => {
                if (valid) {
                    const res = await saveGonggao(Object.assign({}, this.formData, {
                        leiBie: 'xw',
                        // 业务要求不要滚动，但是由于后台sql报错，先写死不滚动
                        isDisplay: 0
                    }));
                    if (res) {
                        this.$message({
                            type: 'success',
                            message: '保存成功!'
                        });
                        this.handleCancel();
                        this.handeleQuery();
                    }
                }
            });
        },
        async editApply() {
            this.$refs.editForm.validate(async (valid) => {
                if (valid) {
                    const res = await editGonggao(Object.assign({}, this.editFormData, {
                        leiBie: 'xw'
                    }));
                    if (res) {
                        this.$message({
                            type: 'success',
                            message: '修改成功!'
                        });
                        this.handleCancel();
                        this.handeleQuery();
                    }
                }
            });
        },
        handleCancel() {
            this.addVisible = false;
            this.editVisible = false;
        },
        handleUpdate(formData) {
            this.formData = formData;
        },
        handleEditUpdate(formData) {
            this.editFormData = formData;
        }
    }
};
</script>

<template>
    <div>
    <el-button v-if="!isIntegratedQuery" type="primary" @click="handleAdd">新增公告</el-button>
    <xcy-list
        style="padding-top: 20px"
        :data="listData"
        :props="listPropsConfigC"
        :pagerInfo="pagerInfo"
        @action="handleAction"
        :hasPager="true"
        @updatePagerInfo="updatePagerInfo"
    />
    <el-dialog  :close-on-click-modal="false" width="80%" title="新增公告" :visible.sync="addVisible">
        <xcy-form
            v-if="addVisible"
            ref="addForm"
            :config="formConfig"
            :data="formData"
            @input="handleUpdate"
        />
        <div style="width:300px;margin:0 auto">
            <el-button type="primary" size="mini" @click="saveApply">保存</el-button>
            <el-button type="primary" size="mini" @click="handleCancel">取消</el-button>
        </div>
    </el-dialog>
    <el-dialog  :close-on-click-modal="false" width="80%" title="编辑公告" :visible.sync="editVisible">
        <xcy-form
            v-if="editVisible"
            ref="editForm"
            :config="formConfig"
            :data="editFormData"
            @input="handleEditUpdate"
        />
        <div style="width:300px;margin:0 auto">
            <el-button type="primary" size="mini" @click="editApply">修改</el-button>
            <el-button type="primary" size="mini" @click="handleCancel">取消</el-button>
        </div>
    </el-dialog>
    <el-dialog  :close-on-click-modal="false" width="80%" title="查看" :visible.sync="viewVisible">
        <xcy-form
            :disabled='true'
            v-if="viewVisible"
            ref="editForm"
            :config="formConfig"
            :data="viewFormData"
        />
    </el-dialog>
    </div>
</template>

<style lang="stylus" scoped>
  .container
    margin 20px 0
    padding 20px
    border 1px solid #e6e6e6
    overflow-y scroll
</style>
