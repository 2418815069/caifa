<script>
import Storage from '@/common/storage';
import { getRizhiList } from './api';
import { filterConfig, listPropsConfig } from './config';
import { cloneDeep } from 'lodash';
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
            listData: {
                list: [],
                total: 0
            },
            pagerInfo: {
                pageSize: 10,
                pageNo: 1,
                currentPage: 1
            },
            editFormData: {
            }
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
            let copyFilter = cloneDeep(this.filterData);
            if (copyFilter.dateTime && copyFilter.dateTime.length > 0) {
                copyFilter.startDate = copyFilter.dateTime[0];
                copyFilter.endDate = copyFilter.dateTime[1];
                delete copyFilter.dateTime;
            }
            let res = await getRizhiList(Object.assign({}, {
                page: this.pagerInfo.pageNo,
                size: this.pagerInfo.pageSize
            }, copyFilter));
            let list = res.data.content;
            this.listData.list = list;
            this.listData.total = res.data.totalElements;
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
    ></xcy-form-query>
    <xcy-list
      style="padding-top: 20px"
      :data="listData"
      :props="listPropsConfig"
      :pagerInfo="pagerInfo"
      :hasPager="true"
      @updatePagerInfo="updatePagerInfo"
    />
    </div>
</template>

<style lang="stylus" scoped>
  .container
    margin 20px 0
    padding 20px
    border 1px solid #e6e6e6
    overflow-y scroll
</style>
