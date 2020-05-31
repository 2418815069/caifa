<script>
import { listPropsConfig, filterConfig } from './config';
import {
    getBanJieList,
    deleteBanJieItem,
    getBuYuShouLi,
    getBuYuXuKe
} from './api';
import { cloneDeep } from 'lodash';
import Storage from '@/common/storage';
import printHtml from '@/components/common/editor-print';
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
            },
            printValue: ''
        };
    },
    components: {
        printHtml
    },
    // 查询项变化
    updateForm(data) {
        this.filterData = data;
    },
    methods: {
    // 查询触发
        async handeleQuery(data) {
            let query = this.mapQuery(this.filterData);
            const list = await getBanJieList(
                Object.assign({}, { actionIds: 'ban_jie' }, query, data)
            );
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
            Object.keys(copyQueryParams).map(x => {
                if (String(copyQueryParams[x]) === 'null') {
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
        async handleAction({ action, data }) {
            switch (action) {
                case 'acceptance':
                    const flowstate = data.flowstate;
                    if (flowstate === '3' || flowstate === '12') {
                        // 不予受理
                        let v = await getBuYuShouLi({ guid: data.guid });
                        this.$refs.printLiuChengDanId.setDialogShow();
                        setTimeout(() => {
                            this.printValue = v;
                        }, 200);
                        this.$refs.printLiuChengDanId.setSaveTongZhiShu('api/v1/caifazheng/buyushoulitongzhishu/save', data.guid);
                        return;
                    }
                    if (flowstate === '8' || flowstate === '16') {
                        // 不予許可
                        let v = await getBuYuXuKe({ guid: data.guid });
                        this.$refs.printLiuChengDanId.setDialogShow();
                        setTimeout(() => {
                            this.printValue = v;
                        }, 200);
                        this.$refs.printLiuChengDanId.setSaveTongZhiShu('api/v1/caifazheng/buyuxuketongzhishu/save', data.guid);
                        return;
                    }
                    this.$router.push({
                        path: '/common/integrated-query-detail2/hefaxinxi',
                        query: {
                            guid: data.guid,
                            needDaYinBtn: true
                        }
                    });
                    break;
            }
        },
        // 分页触发
        updatePagerInfo(pageInfo) {
            this.handeleQuery({
                page: pageInfo.pageNo,
                pageSize: pageInfo.totalElements
            });
        },
        onDeleteItem(data) {
            this.$confirm(`确定要删除${data.shenbaohao}`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(async () => {
                    await deleteBanJieItem();

                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                })
                .catch(() => {
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
    <!-- 各种通知书打印组件 -->
  <print-html ref="printLiuChengDanId" v-model="printValue"></print-html>
  </div>
</template>

<style lang="stylus" scoped>
.container {
  margin: 20px 0;
  padding: 20px;
}
</style>
