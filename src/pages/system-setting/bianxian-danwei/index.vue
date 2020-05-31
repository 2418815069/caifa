<script>
import {listPropsConfig} from './config';
import {
    getList,
    deleteItem,
    addYanZheng,
    editItem,
    getGongChengQuQrr
} from './api';
import danWeiComm from '@/components/common/danwei';
import Storage from '@/common/storage';
import {cloneDeep} from 'lodash';

export default {
    data() {
        return {
            // 新增相关
            addDialogVisible: false,
            formData: {},
            formDataRules: {
                tianBaoGcq: [
                    {required: true, message: '请选择工程区', trigger: 'blur'}
                ],
                mingCheng: [
                    {required: true, message: '请输入名称', trigger: 'blur'},
                    {
                        pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/,
                        message: '请输入名称',
                        trigger: 'blur'
                    }
                ]
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
            danWeiBind: {
                prop: {
                    // guiKouShow: false,
                    // shiXianShow: true,
                    guiKouShow: false,
                    bianXianShow: false
                }
            },
            xianBianMa: Storage.get('userInfo').xzCode,
            gongChengQuArr: [],
            isEdit: '',
            bianMa1: '',
            bianMa2: '',
            bianMa3: ''
        };
    },
    components: {
        danWeiComm
    },
    methods: {
        async init() {
            this.gongChengQuArr = await getGongChengQuQrr();
        },
        // 打开新增弹窗
        addShenHeGuiZe() {
            this.isEdit = false;
            this.formData = {};
            if (this.xianBianMa.length === 6) {
                this.addDialogVisible = true;
                this.bianMa1 = this.xianBianMa.substr(0, 6);
                this.bianMa3 = this.gongChengQuArr[0].bianMa;
                this.formData.tianBaoGcq = this.gongChengQuArr[0].bianMa;
            } else {
                alert('请选择县');
            }
        },
        updatePagerInfo(pageInfo) {
            this.getList(
                Object.assign(
                    {xianBianMa: this.xianBianMa},
                    {page: pageInfo.pageNo, size: pageInfo.pageSize}
                )
            );
        },
        addFormUpdate(data) {
            this.formData = data;
        },
        danWeiChange(value) {
            this.xianBianMa = value;
        },
        async addOk() {
            let reg = /^[0-9]{2,2}$/;
            if (!reg.test(this.bianMa2)) {
                this.$message.error('提交失败，请输入两位数字编码');
                return;
            }
            console.log(this.formData);
            this.$refs.formRef.validate(async valid => {
                if (valid) {
                    let obj = {
                        bianMa: this.bianMa1 + this.bianMa2 + this.bianMa3,
                        xianBianMa: this.bianMa1
                    };
                    let v = '';
                    if (this.isEdit) {
                        v = await editItem(Object.assign(this.formData, obj));
                    } else {
                        v = await addYanZheng(Object.assign(this.formData, obj));
                    }
                    if (v.code === 200) {
                        this.$message({
                            type: 'success',
                            message: v.message
                        });
                        this.addDialogVisible = false;
                        this.fetchList({xianBianMa: this.xianBianMa});
                    }
                }
            });
        },
        addClose() {
            this.addDialogVisible = false;
        },
        async fetchList(params) {
            const list = await getList(params);
            this.listData = {
                list: list.content,
                total: list.totalElements
            };
        },
        // 操作区回调
        handleAction({action, data}) {
            switch (action) {
                case 'delete':
                    this.onDeleteItem(data);
                    break;
                case 'edit':
                    this.isEdit = true;
                    this.formData = cloneDeep(data);
                    this.bianMa1 = data.bianMa.substr(0, 6);
                    this.bianMa2 = data.bianMa.substr(6, 2);
                    this.bianMa3 = data.tianBaoGcq;
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
                    let v = await deleteItem({guid: data.guid});
                    if (v.code === 200) {
                        this.$message({
                            type: 'success',
                            message: v.message
                        });
                        this.fetchList({xianBianMa: this.xianBianMa});
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
        this.init();
        this.fetchList(
            Object.assign({xianBianMa: this.xianBianMa}, {page: 1, size: 10})
        );
    },
    watch: {
        xianBianMa: function (value) {
            this.fetchList({xianBianMa: value});
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
        <el-button type="primary" size="small" @click="addShenHeGuiZe">创建单位</el-button>
        <el-dialog
                :close-on-click-modal="false"
                title="规则定义"
                :visible.sync="addDialogVisible"
                width="770px"
        >
            <el-form ref="formRef" :model="formData" :rules="formDataRules" v-if="addDialogVisible" label-width="80px">
                <el-form-item label="工程区" prop="tianBaoGcq">
                    <el-select v-model="formData.tianBaoGcq">
                        <el-option
                                v-for="(item,key) in gongChengQuArr"
                                :key="key"
                                :value="item.bianMa"
                                :label="item.mingCheng"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="名称" prop="mingCheng">
                    <el-input v-model="formData.mingCheng"></el-input>
                </el-form-item>
                <el-form-item label="编码" prop="bianMa2">
                    <el-row>
                        <el-col :span="8">
                            <el-input disabled size="small" v-model="bianMa1"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-input size="small" v-model="bianMa2"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-input disabled size="small" v-model="bianMa3"></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button @click="addClose()">取 消</el-button>
        <el-button type="primary" @click="addOk()" v-text="isEdit?'修改':'确定'"></el-button>
      </span>
        </el-dialog>
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
