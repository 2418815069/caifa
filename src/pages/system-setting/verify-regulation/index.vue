<script>
import { listPropsConfig, addFormConfig} from './config';
import { getList, addYanZheng, deleteItem, editItem} from './api';
import {cloneDeep} from 'lodash';
export default {
    data() {
        return {
            // 新增相关
            addDialogVisible: false,
            addFormData: {},
            addFormConfig,
            listPropsConfig,
            listData: {
                list: [],
                total: 0
            },
            pagerInfo: {
                pageSize: 10,
                pageNo: 1,
                currentPage: 1
            }
        };
    },
    methods: {
        // 打开新增弹窗
        addShenHeGuiZe() {
            this.addDialogVisible = true;
            this.addFormData = {};
        },
        addFormUpdate(data) {
            this.addFormData = data;
        },
        async addOk() {
            let v;
            if (this.addFormData.guid) {
                v = await editItem(this.addFormData);
            } else {
                v = await addYanZheng(this.addFormData);
            }
            if (v.code === 200) {
                this.$message({
                    type: 'success',
                    message: v.message
                });
                this.addDialogVisible = false;
                this.fetchList();
            }
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
        handleAction({ action, data }) {
            switch (action) {
                case 'delete':
                    this.onDeleteItem(data);
                    break;
                case 'edit':
                    this.addFormData = cloneDeep(data);
                    this.addDialogVisible = true;
                    break;
            }
        },
        // 分页触发
        updatePagerInfo(pageInfo) {
            this.fetchList({
                page: pageInfo.pageNo,
                pageSize: pageInfo.totalElements
            });
        },
        onDeleteItem(data) {
            this.$confirm(`确定要删除${data.mingCheng}`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let v = await deleteItem({ guid: data.guid });
                if (v.code === 200) {
                    this.$message({
                        type: 'success',
                        message: v.message
                    });
                    this.addDialogVisible = false;
                    this.fetchList();
                }
            });
        }
    },
    async created() {
        this.fetchList();
    }
};
</script>

<template>
  <div>
    <el-button class="action" type="primary" size="small" @click="addShenHeGuiZe">新增审核规则</el-button>
     <el-dialog
      :close-on-click-modal="false"
      title="规则定义"
      :visible.sync="addDialogVisible"
      width="70%">
      <xcy-form
            v-if="addDialogVisible"
          ref="addDialogForm"
          :config="addFormConfig"
          :data="addFormData"
          @input="addFormUpdate"
      />
      <span slot="footer" class="dialog-footer">
          <el-button @click="addClose()">取 消</el-button>
          <el-button  type="primary" @click="addOk()">确 定</el-button>
      </span>
      </el-dialog>
    <xcy-list
      :data="listData"
      :props="listPropsConfig"
      :pagerInfo="pagerInfo"
      @action="handleAction"
      :hasPager="true"
      @updatePagerInfo="updatePagerInfo"
    />
  </div>
</template>

<style lang="stylus" scoped>
.container {
  margin: 20px 0;
  padding: 20px;
}
.action {
    margin-bottom 20px
}
</style>
