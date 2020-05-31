<script>
import { filterConfig, listPropsConfig } from './config';
import { getZhengBenList } from './api';
import Storage from '@/common/storage';
import { cloneDeep } from 'lodash';
export default {
    data() {
        return {
            query: {},
            listPropsConfig,
            filterConfig: filterConfig,
            queryParams: {
                danWei: Storage.get('userInfo').xzCode
            },
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
    components: {
    },
    async created() {
        this.handeleQuery();
    },
    methods: {
        // 查询触发
        async handeleQuery(queryParams) {
            let query = this.mapQuery(this.queryParams);
            const list = await getZhengBenList(Object.assign({}, query, queryParams));
            this.listData = {
                list: list.content,
                total: list.totalElements
            };
        },
        updateForm(data) {
            this.queryParams = data;
        },
        // 查询前条件映射
        mapQuery(queryParams) {
            let copyQueryParams = cloneDeep(queryParams);
            if (copyQueryParams.danWei === 'null') {
                copyQueryParams.danWei = Storage.get('userInfo').xzCode;
            }
            return copyQueryParams;
        },
        updatePagerInfo(pageInfo) {
            this.handeleQuery({
                page: pageInfo.pageNo,
                size: pageInfo.pageSize
            });
        }
    }
};
</script>

<template>
  <div>
    <xcy-form-query
      :config="filterConfig"
      :data="queryParams"
      @query="handeleQuery"
      @input="updateForm"
    ></xcy-form-query>
    <xcy-list
      style="padding-top: 20px"
      :data="listData"
      :props="listPropsConfig"
      :pagerInfo="pagerInfo"
      @updatePagerInfo="updatePagerInfo"
      :hasPager="true"
    />
  </div>
</template>

<style lang="stylus" scoped>
.container
  margin 20px 0
  padding 20px
</style>
