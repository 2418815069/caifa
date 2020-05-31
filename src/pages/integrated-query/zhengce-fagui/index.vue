<script>
import { listPropsConfig } from './config';
import { getZhengCeFaGuiList } from './api';
export default {
    data() {
        return {
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
            dialogVisible: false,
            dialogTitle: '',
            dialogHtml: ''
        };
    },
    components: {},
    async created() {
        this.getList();
    },
    methods: {
        async getList(query = {}) {
            const list = await getZhengCeFaGuiList(query);
            this.listData = {
                list: list.content,
                total: list.totalElements
            };
        },
        updatePagerInfo(pageInfo) {
            this.getList({
                page: pageInfo.pageNo,
                size: pageInfo.pageSize
            });
        },
        actionList({ action, data }) {
            if (action === 'view') {
                this.dialogVisible = true;
                this.dialogTitle = data.title;
                this.dialogHtml = data.content;
            }
        }
    }
};
</script>

<template>
  <div>
    <xcy-list
      style="padding-top: 20px"
      :data="listData"
      :props="listPropsConfig"
      :pagerInfo="pagerInfo"
      @updatePagerInfo="updatePagerInfo"
      :hasPager="true"
      @action="actionList"
    />
    <!-- 详情 -->
    <el-dialog  :close-on-click-modal="false" title="法规法办" :visible.sync="dialogVisible" width="50%">
        <h2 v-text="dialogTitle" style="border-bottom: 1px solid #c2d2e1;"></h2>
        <div v-html="dialogHtml" style="border-bottom: 1px solid #c2d2e1;"></div>
    </el-dialog>
  </div>
</template>

<style lang="stylus" scoped>
.container {
  margin: 20px 0;
  padding: 20px;
}
</style>
