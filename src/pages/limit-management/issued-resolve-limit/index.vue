<script>
import { filterConfig, listPropsConfig } from './config';
import { getQueryList, postXiaDa } from './api';
import Storage from '@/common/storage';
export default {
    data() {
        const userInfo = Storage.get('userInfo') || {};
        return {
            listConfig: {
                hasSelection: true
            },
            filterConfig,
            filterData: {
                nianFen: new Date().getFullYear(),
                bianXianBm: userInfo.xzCode
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
            selectedArr: [],
            allArr: []
        };
    },
    mounted() {

    },
    created() {
        this.handeleQuery();
    },
    methods: {
    // 查询触发
        handeleQuery() {
            this.pagerInfo = {
                pageSize: 10,
                pageNo: 1,
                currentPage: 1
            };
            this.fetchList();
        },
        async fetchList() {
            let params = {
                nianFen: this.filterData.nianFen,
                bianXianBm: this.filterData.bianXianBm.substr(0, 10),
                page: this.pagerInfo.pageNo,
                size: this.pagerInfo.pageSize
            };
            if (this.filterData.bianXianBm.length === 12) {
                Object.assign(params, {guiKouBm: this.filterData.bianXianBm});
            }
            const res = await getQueryList(params);
            this.listData.list = res.content;
            this.listData.total = res.totalElements;
        },
        // 查询项变化
        updateForm(data) {
            this.filterData = data;
        },
        // 分页触发
        updatePagerInfo(pageInfo) {
            this.pagerInfo = pageInfo;
            this.fetchList();
        },
        // 多选触发
        onSelected(arr) {
            this.selectedArr = arr.map(item=>item.guid);
        },
        // 选择下达
        async onXiaDa() {
            const res = await postXiaDa(this.selectedArr);
            if (res.success) {
                this.$notify({
                    title: '成功',
                    type: 'success',
                    message: res.message
                });
                // 下达成功从新查询已经分解的限额
                this.fetchList();
            }

        }

    }
};
</script>

<template>
    <div>
        <xcy-form-query
            :config="filterConfig"
            :data="filterData"
            @query="handeleQuery"
            @input="updateForm"
        ></xcy-form-query>
                <el-button :disabled="selectedArr.length===0" size="small" type="primary" @click="onXiaDa">选择下达</el-button>
        <div class="table-title">单位: 立方米、株</div>
        <xcy-list
            :data="listData"
            :props="listPropsConfig"
            :pagerInfo="pagerInfo"
            :hasPager="true"
            :config="listConfig"
            @updatePagerInfo="updatePagerInfo"
            @selectionChange='onSelected'
        />
    </div>
</template>

<style lang="stylus" scoped>
.container {
    margin: 20px 0;
    padding: 20px;
    border: 1px solid #e6e6e6;
    overflow-y: scroll;
}

.table-title {
  text-align: right;
  margin-bottom: 4px;
  font-size: 12px;
}
</style>
