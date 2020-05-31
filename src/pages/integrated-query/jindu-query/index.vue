<script>
import { filterConfig, listPropsConfig } from './config';
import { caifazheng, getShenQingLeiXing } from './api';
import { cloneDeep } from 'lodash';
import {getprovinceConfig } from '@/common/util';
export default {
    data() {
        return {
            query: {},
            listPropsConfig,
            filterConfig: filterConfig,
            queryParams: {
                dateTime: [],
                shiXiangMcZl: []
            },
            listData: {
                list: [],
                total: 0
            },
            pagerInfo: {
                pageSize: 10,
                pageNo: 1,
                currentPage: 1
            },
            shenQingLeiXingArr: []
        };
    },
    components: {
    },
    async created() {
        await this.init();
        this.getList();
    },
    methods: {
        async init() {
            let copyFilterConfig = cloneDeep(this.filterConfig);
            copyFilterConfig.map(async x=>{
                const prop = x.prop ? x.prop : '';
                if (prop && prop === 'isXiane') {
                    x.options = await this.getXianeArr();
                }
            });
            this.filterConfig = copyFilterConfig;
        },
        async getXianeArr() {
            if (this.$root.isZheJiang) {
                return [
                    {
                        label: '请选择',
                        value: 'null'
                    },
                    {
                        label: '占限额计划',
                        value: '1'
                    },
                    {
                        label: '仅占限额',
                        value: '2'
                    },
                    {
                        label: '不占限额',
                        value: '3'
                    },
                    {
                        label: '专项追加限额',
                        value: '4'
                    }
                ];
            }
            const shenQingLeiXingArr = await getShenQingLeiXing();
            let arr = [];
            shenQingLeiXingArr.map(x=>{
                arr.push({label: x.mingCheng, value: x.bianMa});
            });
            return arr;
        },
        // 操作区回调
        handleAction({ action, data }) {
            switch (action) {
                case 'view':
                    this.$router.push({ path: '/common/integrated-query-detail2/hefaxinxi', query: {
                        guid: data.guid
                    } });
                    break;
            }
        },
        async getList(parmas = {}) {
            const list = await caifazheng(Object.assign({}, this.query, parmas));
            this.listData = {
                list: list.content,
                total: list.totalElements
            };
        },
        // 查询触发
        handeleQuery() {
            let query = this.mapQuery(this.queryParams);
            this.getList(query);
        },
        updateForm(data) {
            this.queryParams = data;
        },
        // 查询前条件映射
        mapQuery(queryParams) {
            let copyQueryParams = cloneDeep(queryParams);
            filterConfig.map(fil => {
                const prop = fil.prop;
                if (prop === 'dateTime') {
                    fil.allProps.map((x, index) => {
                        copyQueryParams[x] = copyQueryParams[prop][index];
                    });
                    delete copyQueryParams[prop];
                }
                if (prop === 'shiXiangMcZl') {
                    fil.allProps.map((x, index) => {
                        copyQueryParams[x] = copyQueryParams[prop][index];
                    });
                    delete copyQueryParams[prop];
                }
            });
            Object.keys(copyQueryParams).map(x=>{
                if (String(copyQueryParams[x]) === 'null') {
                    delete copyQueryParams[x];
                }
            });
            return copyQueryParams;
        },
        updatePagerInfo(pageInfo) {
            let query = this.mapQuery(this.queryParams);
            this.getList(Object.assign(query, {page: pageInfo.pageNo, size: pageInfo.pageSize}));
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
      @action="handleAction"
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
