<script>
import { getFaguiList, deleteFagui, saveFagui, editFagui } from './api';
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
            addVisible: false,
            editVisible: false
        };
    },
    components: {
    },
    async created() {
        this.handeleQuery();
    },
    methods: {
        // 查询触发
        async handeleQuery() {
            const res = await getFaguiList(Object.assign({}, {
                page: this.pagerInfo.pageNo,
                size: this.pagerInfo.pageSize
            }, this.filterData));
            this.listData.list = res.content;
            this.listData.total = res.totalElements;
        },
        // 操作区回调
        async handleAction({ action, data }) {
            switch (action) {
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
                const res = await deleteFagui(data);
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
                    const res = await saveFagui(Object.assign({}, this.formData, {
                        leiBie: 'xw'
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
            this.$refs.addForm.validate(async (valid) => {
                if (valid) {
                    const res = await editFagui(Object.assign({}, this.editFormData, {
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
    <el-button type="primary" @click="handleAdd">新增法规</el-button>
    <xcy-list
        style="padding-top: 20px"
        :data="listData"
        :props="listPropsConfig"
        :pagerInfo="pagerInfo"
        @action="handleAction"
        :hasPager="true"
        @updatePagerInfo="updatePagerInfo"
    />
    <el-dialog  :close-on-click-modal="false" width="80%" title="新增法规" :visible.sync="addVisible">
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
    <el-dialog  :close-on-click-modal="false" width="80%" title="编辑法规" :visible.sync="editVisible">
        <xcy-form
            v-if="editVisible"
            ref="addForm"
            :config="formConfig"
            :data="editFormData"
            @input="handleEditUpdate"
        />
        <div style="width:300px;margin:0 auto">
            <el-button type="primary" size="mini" @click="editApply">修改</el-button>
            <el-button type="primary" size="mini" @click="handleCancel">取消</el-button>
        </div>
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
