<script>
import { cloneDeep } from 'lodash';
import {
    getXzName
} from '@/common/util';
import { getFileList, deleteFile, saveFile, updateFile } from './api';
import { filterConfig, listPropsConfig, formConfig } from './config';
import Storage from '@/common/storage';
const provinceData = Storage.get('provinceData');
export default {
    data() {
        return {
            filterConfig,
            filterData: {
                danWei: provinceData.provinceCode
            },
            listPropsConfig,
            listData: {
                list: [],
                total: 0
            },
            pagerInfo: {
                pageSize: 10,
                pageNo: 1,
                currentPage: 1
            },
            formConfig,
            formData: {
                code: provinceData.provinceCode
            },
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
        async handeleQuery(data) {
            const res = await getFileList(Object.assign({}, {
                page: this.pagerInfo.pageNo,
                size: this.pagerInfo.pageSize
            }, this.filterData, data));
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
                    this.editFormData = cloneDeep(data);
                    break;
            }
        },
        onDeleteItem(data) {
            this.$confirm('确定要删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const res = await deleteFile(data);
                if (res) {
                    this.handeleQuery();
                    this.handleCancel();
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
            this.pageInfo = pageInfo;
            this.handeleQuery({
                page: pageInfo.pageNo,
                pageSize: pageInfo.pageSize
            });
        },
        // 查询项变化
        updateForm(data) {
            this.filterData = data;
        },
        handleAdd() {
            this.formData = {
                code: provinceData.provinceCode
            };
            this.addVisible = true;
        },
        async saveApply() {
            this.$refs.addForm.validate(async (valid) => {
                if (valid) {
                    let copyFormData = cloneDeep(this.formData);
                    const { code } = copyFormData;
                    if (code.length === 2) {
                        copyFormData.leiXing = 1;
                    } else if (code.length === 4) {
                        copyFormData.leiXing = 2;
                    } else {
                        copyFormData.leiXing = 3;
                    }
                    const codeName = await getXzName(code);
                    copyFormData.kuoZhan1 = null;
                    copyFormData.codeName = codeName;
                    if (this.formData.fileUrl) {
                        copyFormData.fileUrl = `${copyFormData.fileUrl[0].response.data.fileUrl}`;
                    }
                    const res = await saveFile(JSON.stringify(copyFormData));
                    if (res) {
                        this.handeleQuery();
                        this.handleCancel();
                        this.$message({
                            type: 'success',
                            message: '添加成功!'
                        });
                    }
                }
            });
        },
        async editApply() {
            this.$refs.addForm.validate(async (valid) => {
                if (valid) {
                    let copyFormData = cloneDeep(this.editFormData);
                    const { code } = copyFormData;
                    if (code.length === 2) {
                        copyFormData.leiXing = 1;
                    } else if (code.length === 4) {
                        copyFormData.leiXing = 2;
                    } else {
                        copyFormData.leiXing = 3;
                    }
                    const codeName = await getXzName(code);
                    copyFormData.kuoZhan1 = null;
                    copyFormData.codeName = codeName;
                    const res = await updateFile(copyFormData);
                    if (res) {
                        this.handeleQuery();
                        this.handleCancel();
                        this.$message({
                            type: 'success',
                            message: '修改成功!'
                        });
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
    <xcy-form
      :needResetBtn='true'
      :config="filterConfig"
      :data="filterData"
      @query="handeleQuery"
      @input="updateForm"
    ></xcy-form>
    <el-button type="primary" @click="handleAdd">新增文件</el-button>
    <xcy-list
      style="padding-top: 20px"
      :data="listData"
      :props="listPropsConfig"
      :pagerInfo="pagerInfo"
      @action="handleAction"
      :hasPager="true"
      @updatePagerInfo="updatePagerInfo"
    />
    <el-dialog  :close-on-click-modal="false" width="700px" title="新增文件" :visible.sync="addVisible">
        <xcy-form
            v-if="addVisible"
            ref="addForm"
            :config="formConfig"
            :data="formData"
            @input="handleUpdate"
        />
        <div class="footer">
            <el-button type="primary" size="mini" @click="saveApply">保存</el-button>
            <el-button type="primary" size="mini" @click="handleCancel">取消</el-button>
        </div>
    </el-dialog>
    <el-dialog  :close-on-click-modal="false" width="700px" title="编辑文件" :visible.sync="editVisible">
        <xcy-form
            v-if="editVisible"
            ref="addForm"
            :config="formConfig"
            :data="editFormData"
            @input="handleEditUpdate"
        />
        <div class="footer">
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
  .footer
    text-align center
    margin-top 30px
</style>
