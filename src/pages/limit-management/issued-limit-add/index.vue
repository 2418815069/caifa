<script>
import { filterConfig, listPropsConfig } from './config';
import { getQueryList, postXiaDa } from './api';
import Storage from '@/common/storage';
export default {
    data() {
        const userInfo = Storage.get('userInfo') || {};
        const provinceData = Storage.get('provinceData');
        return {
            listConfig: {
                hasSelection: true
            },
            filterConfig,
            filterData: {
                nianFen: new Date().getFullYear(),
                bianXianBm: userInfo.xzCode || provinceData.provinceCode
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
            let params = Object.assign({},
                {
                    page: this.pagerInfo.pageNo,
                    size: this.pagerInfo.pageSize
                },
                this.filterData,
            );
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
                // 下达后从新查询
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
            <div style="text-align:left">
                <el-button :disabled="selectedArr.length===0" size="small" type="primary" @click="onXiaDa">下达追加限额</el-button>
                </div>
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
