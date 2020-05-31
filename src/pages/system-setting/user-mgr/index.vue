<script>
import Storage from '@/common/storage';
import {getYonghuList, deleteYonghu, resetYonghu, updateYonghu} from './api';
import {filterConfig, listPropsConfig, formConfig, exportConfig} from './config';
import {showMessage, getXzName} from '@/common/util';
import {cloneDeep} from 'lodash';
import asiox from 'axios';

const provinceData = Storage.get('provinceData');
export default {
    data() {
        const userInfo = Storage.get('userInfo') || {};
        return {
            filterConfig,
            filterData: {
                xzCode: userInfo.xzCode || provinceData.provinceCode
            },
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
            editVisible: false,
            exportVisible: false,
            exportConfig,
            allChecked: false,
            exportFormData: {
                check: []
            },
            editFormData: {}
        };
    },
    components: {},
    async created() {
        this.handeleQuery();
    },
    methods: {
        // 查询触发
        async handeleQuery() {
            let res = await getYonghuList(Object.assign({}, {
                page: this.pagerInfo.pageNo,
                size: this.pagerInfo.pageSize
            }, this.filterData));
            let datas = res.data;
            let list = [];
            for (let k in datas) {
                let data = datas[k];
                data.xzCodeName = await getXzName(data.xzCode);
                list.push(data);
            }
            this.listData.list = list;
            this.listData.total = res.totalCount;
        },
        // 操作区回调
        async handleAction({action, data}) {
            switch (action) {
                case 'edit':
                    this.onEditItem(data);
                    break;
                case 'reset':
                    this.onResetItem(data);
                    break;
                case 'delete':
                    this.onDeleteItem(data);
                    break;
            }
        },
        onResetItem(data) {
            this.$confirm('确定要初始化密码?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const res = await resetYonghu(data);
                if (res) {
                    this.handeleQuery();
                    this.$message({
                        type: 'success',
                        message: '初始化密码成功! 初始密码是111111'
                    });
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },
        onDeleteItem(data) {
            this.$confirm('确定要删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const res = await deleteYonghu(data);
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
        onEditItem(data) {
            this.editFormData = cloneDeep(data);
            this.editVisible = true;
        },
        // 分页触发
        updatePagerInfo(pageInfo) {
            this.pagerInfo = pageInfo;
            this.handeleQuery();
        },
        // 查询项变化
        updateForm(data) {
            this.filterData = data;
        },
        handleReset() {
            const userInfo = Storage.get('userInfo') || {};
            this.filterData = {
                xzCode: userInfo.xzCode || provinceData.provinceCode
            };
            this.handeleQuery();
        },
        handleRegister() {
            this.$router.push('/common/register');
        },
        handleEditUpdate(formData) {
            this.editFormData = formData;
        },
        async editApply() {
            this.$refs.editForm.validate(async (valid) => {
                if (valid) {
                    const res = await updateYonghu(this.editFormData);
                    showMessage(res, () => {
                        this.handeleQuery();
                        this.handleCancel();
                    });
                }
            });
        },
        handleCancel() {
            this.editVisible = false;
        },
        exportExcel() {
            this.exportVisible = true;
        },
        handleExport(data) {
            this.exportFormData = data;
        },
        async handleOk() {
            let exportList = [];
            this.exportConfig[0].options.forEach(x => {
                if (this.exportFormData.check.includes(x.label)) {
                    exportList.push({title: x.label, field: x.prop});
                }
            });
            let query = cloneDeep(this.filterData);
            let urlStr = `${process.env.VUE_APP_BASE_API}/api/v1/yonghu/excel?`;
            let params = '';
            let arr = ['dengLuMc', 'zhenShiXm', 'dianHua', 'isUse', 'xzCode', 'yongHuLx', 'jueSeBh'];
            arr.forEach(x => {
                if (query[x]) {
                    params += `&${x}=${query[x]}`;
                }
            });
            asiox.post(urlStr + params, JSON.stringify(exportList), {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': Storage.get('jwt')
                },
                responseType: 'blob'
            }).then(res => {
                const blob = new Blob([res.data], {type: 'application/vnd.ms-excel'});
                const downloadElement = document.createElement('a');
                const href = window.URL.createObjectURL(blob);
                downloadElement.href = href;
                downloadElement.download = 'rate.xls';
                document.body.appendChild(downloadElement);
                downloadElement.click();
                document.body.removeChild(downloadElement);
                window.URL.revokeObjectURL(href);
                this.exportVisible = false;
            });
        }
    },
    watch: {
        allChecked: function (value) {
            if (value) {
                let arr = [];
                this.exportConfig[0].options.map(x => {
                    arr.push(x.label);
                });
                this.exportFormData.check = arr;
            } else {
                this.exportFormData.check = [];
            }
        }
    }
};
</script>

<template>
    <div>
        <xcy-form-query
                :needResetBtn='false'
                :config="filterConfig"
                :data="filterData"
                @reset="handleReset"
                @query="handeleQuery"
                @input="updateForm"
        >
    <span class="register" slot="moreAction">
        <el-button size="mini" type="primary" @click="handleRegister">注册用户</el-button>
        <el-button size="mini" type="primary" @click="exportExcel">导出</el-button>
    </span>
        </xcy-form-query>
        <xcy-list
                style="padding-top: 20px"
                :data="listData"
                :props="listPropsConfig"
                :pagerInfo="pagerInfo"
                @action="handleAction"
                :hasPager="true"
                @updatePagerInfo="updatePagerInfo"
        />
        <el-dialog :close-on-click-modal="false" width="400px" title="设置用户信息" :visible.sync="editVisible">
            <xcy-form
                    v-if="editVisible"
                    ref="editForm"
                    :config="formConfig"
                    :data="editFormData"
                    @input="handleEditUpdate"
            />
            <div class="footer">
                <el-button type="primary" size="mini" @click="editApply">修改</el-button>
                <el-button type="primary" size="mini" @click="handleCancel">取消</el-button>
            </div>
        </el-dialog>
        <el-dialog
                :close-on-click-modal="false"
                class="not-print"
                :visible.sync="exportVisible"
                width="50%">
            <el-checkbox v-model="allChecked">全选</el-checkbox>
            <xcy-form
                    v-if="exportVisible"
                    ref="exportForm"
                    :config="exportConfig"
                    :data="exportFormData"
                    @input="handleExport"
            />
            <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleOk()">确 定</el-button>
      </span>
        </el-dialog>
    </div>
</template>

<style lang="stylus" scoped>
    .container
        margin 20px 0
        padding 20px
        border 1px solid #e6e6e6
        overflow-y scroll

    .register
        padding-left 10px
    .footer
        text-align center
        margin-top 30px
</style>
