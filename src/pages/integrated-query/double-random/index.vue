<script>
import { filterConfig, listPropsConfig } from './config';
import { getSuiJi } from './api';
import { cloneDeep } from 'lodash';
import Storage from '@/common/storage';
import asiox from 'axios';
export default {
    data() {
        return {
            query: {},
            listPropsConfig,
            filterConfig: filterConfig,
            queryParams: {
                dateTime: [new Date().getFullYear() + '-01-01']
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
        await this.handeleQuery();
        this.getList();
    },
    methods: {
        async daoChu() {
            let query = this.mapQuery(this.queryParams);
            let urlStr = `${process.env.VUE_APP_BASE_API}/api/v1/shuangsuiji/export?`;
            Object.keys(query).map(x=>{
                urlStr += `${x}=${query[x]}&`;
            });
            asiox
                .get(urlStr, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization': Storage.get('jwt')
                    },
                    responseType: 'blob'
                })
                .then(res => {
                    const blob = new Blob([res.data], {
                        type: 'application/vnd.ms-excel'
                    });
                    const downloadElement = document.createElement('a');
                    const href = window.URL.createObjectURL(blob);
                    downloadElement.href = href;
                    downloadElement.download = 'rate.xls';
                    document.body.appendChild(downloadElement);
                    downloadElement.click();
                    document.body.removeChild(downloadElement); // 下载完成移除元素
                    window.URL.revokeObjectURL(href); // 释放掉blob对象
                });
        },
        async getList(parmas = {}) {
            const list = await getSuiJi(Object.assign({}, this.query, parmas));
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
                if (prop === 'danWei' && copyQueryParams[prop]) {
                    const valueLabel = copyQueryParams[prop].label;
                    if (valueLabel[0]) {
                        copyQueryParams.shi = copyQueryParams[prop].label[0];
                    }
                    if (valueLabel[1]) {
                        copyQueryParams.xian = copyQueryParams[prop].label[1];
                    }
                    delete copyQueryParams[prop];
                }
            });
            Object.keys(copyQueryParams).map(x=>{
                if (String(copyQueryParams[x]) === 'null' || !copyQueryParams[x]) {
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
    <xcy-form
      :config="filterConfig"
      :data="queryParams"
      @query="handeleQuery"
      @input="updateForm"
    ></xcy-form>
    <div style="text-align:right">
  <el-button type="primary" size="mini" @click="handeleQuery">查询</el-button>
  <el-button type="primary" size="mini"  @click="daoChu">导出</el-button>
    </div>
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
