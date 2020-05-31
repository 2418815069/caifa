<script>
import {getJiChuFu, addItem, editItem, deleteItem} from './api';
import {tabConfig, formConfig, listPropConfig} from './config';
import {cloneDeep} from 'lodash';

export default {
    data() {
        return {
            tabConfig,
            listPropConfig,
            formConfig,
            listData: {},
            formData: {},
            dialogVisible: false,
            isEdit: false,
            tabName: '01'
        };
    },
    components: {},
    mounted() {
        this.handeleQuery(this.tabName);
    },
    methods: {
        // 操作区回调
        handleAction({action, data}) {
            switch (action) {
                case 'edit':
                    this.onEditItem(data);
                    break;
                case 'delete':
                    this.onDeleteItem(data);
                    break;
                case 'addChild':
                    this.onAddChild(data);
                    break;
            }
        },
        async handeleQuery(value) {
            let data = await getJiChuFu(value);
            this.listData = data;
        },
        onEditItem(data) {
            this.formData = cloneDeep(data);
            this.isEdit = true;
            this.dialogVisible = true;
        },
        onDeleteItem(data) {
            this.$confirm('确定要删除当前项', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let result = await deleteItem({guid: data.guid});
                if (result.code === 200) {
                    this.$message.success(result.message);
                    this.handeleQuery(this.tabName);
                }
            });
        },
        onAddChild(data) {
            let copyFormConfig = cloneDeep(this.formConfig);
            copyFormConfig.map(x=>{
                let prop = x.prop;
                if (prop === 'fuBianMa') {
                    x.disabled = true;
                }
            });
            this.formConfig = copyFormConfig;
            this.formData = {fuBianMa: data.bianMa, leiBie: data.leiBie, isUse: '1'};
            this.isEdit = false;
            this.dialogVisible = true;
        },
        add() {
            this.formData = {};
            this.formData.leiBie = this.tabName;
            this.formData.fuBianMa = this.listData[0].fuBianMa;
            this.formData.isUse = '1';
            this.isEdit = false;
            this.dialogVisible = true;
        },
        submit() {
            this.$refs.form.validate(async valid => {
                if (valid) {
                    let result;
                    if (this.isEdit) {
                        result = await editItem(this.formData);
                    } else {
                        result = await addItem(this.formData);
                    }
                    if (result.code === 200) {
                        this.$message.success(result.message);
                        this.handeleQuery(this.tabName);
                        this.dialogVisible = false;
                    }
                }
            });
        },
        updateData(data) {
            this.formData = data;
        }
    },
    watch: {
        tabName: function (value) {
            this.handeleQuery(value);
        }
    }
};
</script>

<template>
    <div>
        <div>
            <el-tabs type="border-card" v-model="tabName">
                <el-tab-pane
                        v-for="item in tabConfig"
                        :name="item.name"
                        :key="item.name"
                        :label="item.label"
                >
                    <el-button type="primary" size="small" @click="add()">新 增</el-button>
                    <xcy-list
                            style="padding-top: 20px"
                            :data="listData"
                            :config="{rowKey:'guid'}"
                            :props="listPropConfig"
                            @action="handleAction"
                    />
                </el-tab-pane>
            </el-tabs>
            <el-dialog
                    :close-on-click-modal="false"
                    title="基础数据"
                    :visible.sync="dialogVisible"
                    width="380px">
                <xcy-form
                        :config="formConfig"
                        :data="formData"
                        ref="form"
                        @input="updateData"
                />
                <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible=false">取 消</el-button>
                        <el-button type="primary" @click="submit">确定</el-button>
                      </span>
            </el-dialog>
        </div>
    </div>
</template>

<style lang="stylus" scoped>
    .container {
        margin: 20px 0;
        padding: 20px;
    }
</style>
