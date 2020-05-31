<script>
import { quanxianmenu, updateQuanxian, creatQuanxian, deleteQuanxian } from './api';
import { listPropsConfig } from './config';
import Form from './components/form';
import Storage from '@/common/storage';
import { cloneDeep } from 'lodash';
export default {
    data() {
        return {
            listPropsConfig,
            listData: {
                list: [
                ],
                total: 3
            },
            pagerInfo: {
                pageSize: 10,
                pageNo: 1,
                currentPage: 1
            },
            addVisible: false,
            editVisible: false,
            EditData: {},
            userInfo: {}
        };
    },
    components: {
        Form
    },
    async created() {
        const userInfo = Storage.get('userInfo') || {};
        this.userInfo = userInfo;
        this.getMenus();
    },
    methods: {
        // 操作区回调
        handleAction({ action, data }) {
            let copyData = cloneDeep(data);
            switch (action) {
                case 'edit':
                    this.editVisible = true;
                    this.EditData = copyData;
                    break;
                case 'delete':
                    this.handleDelete(data);
                    break;
            }
        },
        async getMenus(data = {}) {
            let copyListData = cloneDeep(this.listData);
            const list = await quanxianmenu(Object.assign({
                jiaoSeBh: this.userInfo.jueSeBh,
                page: this.pagerInfo.pageNo,
                size: this.pagerInfo.pageSize
            }, data));
            copyListData.list = list.content;
            copyListData.total = list.totalElements;
            this.listData = copyListData;
        },
        // 分页触发
        updatePagerInfo(pageInfo = {}) {
            this.pagerInfo = pageInfo;
            this.getMenus();
        },
        handleCreateRole() {
            this.addVisible = true;
        },
        async handleCreate(formdata) {
            await creatQuanxian({
                jiaoSeBh: formdata.jiaoSeBh,
                jiaoSeMc: `${formdata.level}${formdata.jiaoSeMc}`,
                jiaoSeMs: formdata.jiaoSeMs,
                bms: formdata.menu.map(item => item.id)
            });
            this.handleClear();
            this.getMenus();
        },
        async handleEdit(formdata) {
            await updateQuanxian({
                jiaoSeBh: formdata.jiaoSeBh,
                jiaoSeMc: `${formdata.level}${formdata.jiaoSeMc}`,
                jiaoSeMs: formdata.jiaoSeMs,
                bms: formdata.menu.map(item => item.id)
            });
            this.handleClear();
            this.getMenus();
        },
        async handleDelete(formdata) {
            this.$confirm('确定要删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await deleteQuanxian(formdata);
                this.handleClear();
                this.getMenus();
            });
        },
        handleClear() {
            this.addVisible = false;
            this.editVisible = false;
        }
    }
};
</script>

<template>
    <div>
      <el-button
        type="primary"
        @click="handleCreateRole"
      >创建角色</el-button>
      <xcy-list
        style="padding-top: 20px"
        :data="listData"
        :props="listPropsConfig"
        :pagerInfo="pagerInfo"
        @action="handleAction"
        @updatePagerInfo="updatePagerInfo"
        :hasPager="true"
      />
      <!-- 新建角色 -->
      <el-dialog  :close-on-click-modal="false" width="80%" title="创建角色" :visible.sync="addVisible">
        <Form
          v-if="addVisible"
          @create="handleCreate"
          @clear='handleClear'
        />
      </el-dialog>
      <!-- 修改角色 -->
      <el-dialog  :close-on-click-modal="false" width="80%" title="修改角色" :visible.sync="editVisible">
        <Form
          v-if="editVisible"
          :isEdit= true
          :record='EditData'
          @edit="handleEdit"
          @clear='handleClear'
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
