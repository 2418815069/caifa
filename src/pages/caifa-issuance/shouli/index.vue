<script>
import { listPropsConfig, filterConfig } from './config';
import { getShouLiList, deleteShouLiItem } from './api';
import { cloneDeep } from 'lodash';
import Storage from '@/common/storage';
export default {
    data() {
        return {
            listPropsConfig,
            filterConfig,
            filterData: {
                danWei: Storage.get('userInfo').xzCode,
                isXiane: 'null',
                shiXiangMcZl: [],
                dateTime: []
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
    // 查询项变化
    updateForm(data) {
        this.filterData = data;
    },
    methods: {
        // 查询触发
        async handeleQuery(params) {
            let query = this.mapQuery(this.filterData);
            const list = await getShouLiList(Object.assign({actionIds: 'shou_li,bu_yu_shou_li,bu_qi_bu_zheng'}, query, params));
            this.listData = {
                list: list.content,
                total: list.totalElements
            };
        },
        // 查询前条件映射
        mapQuery(queryParams) {
            let copyQueryParams = cloneDeep(queryParams);
            this.filterConfig.map(fil => {
                const prop = fil.prop;
                if (prop === 'shiXiangMcZl') {
                    fil.allProps.map((x, index) => {
                        copyQueryParams[x] = copyQueryParams[prop][index];
                    });
                    delete copyQueryParams[prop];
                }
                if (prop === 'dateTime') {
                    fil.allProps.map((x, index) => {
                        copyQueryParams[x] = copyQueryParams[prop][index];
                    });
                    delete copyQueryParams[prop];
                }
            });
            Object.keys(copyQueryParams).map(x=>{
                if (!copyQueryParams[x] || String(copyQueryParams[x]) === 'null') {
                    delete copyQueryParams[x];
                }
            });
            return copyQueryParams;
        },

        // 查询项变化
        updateForm(data) {
            this.filterData = data;
        },
        // 操作区回调
        handleAction({ action, data }) {
            switch (action) {
                case 'view':
                    this.$router.push({ path: '/common/integrated-query-detail2/hefaxinxi', query: {
                        guid: data.guid
                    } });
                    break;
                case 'acceptance':
                    this.$router.push({path: '/common/integrated-query-detail', query: {
                        guid: data.guid,
                        isShouLi: true,
                        shouli: true
                    }});
                    break;
                case 'edit':
                    let guid = data.guid;
                    if (!guid) {
                        alert('数据错误');
                    }
                    let paths = '';
                    if (data.timberType === '1' || !this.$root.isZheJiang) {
                        paths = 'yiban';
                    }
                    if (data.timberType === '2') {
                        paths = 'zhengui';
                    }
                    if (data.timberType === '3') {
                        paths = 'yanhai';
                    }
                    this.$router.push({
                        path: paths,
                        query: {
                            guid: guid
                        }
                    });
                    break;
                case 'delete':
                    this.onDeleteItem(data);
                    break;
            }
        },
        // 分页触发
        updatePagerInfo(pageInfo) {
            this.handeleQuery(
                {
                    page: pageInfo.pageNo,
                    pageSize: pageInfo.pageSize
                }
            );
        },
        onDeleteItem(data) {
            this.$confirm('确定要删除当前采伐证', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let v = await deleteShouLiItem({guid: data.guid});
                if (v.code === 200) {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.handeleQuery();
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }

    },
    created() {
        this.handeleQuery();
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
    <xcy-list
      style="padding-top: 20px"
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

</style>
