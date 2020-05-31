<script>
import { filterConfig, listPropsConfig, daoChuConfig } from './config';
import { caifazheng } from './api';
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
                qianFaTime: [],
                yinShuaH: {},
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
            // 导出
            daoChuConfig,
            daoChuFormData: {
                check: []
            },
            dialogVisible: false,
            allChecked: false,
            daoChuDisabled: false
        };
    },
    components: {
    },
    async created() {
        this.getList();
    },
    methods: {
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
        async handleOk() {
            let daoRuList = [];
            this.daoChuConfig[0].options.map(x=>{
                this.daoChuFormData.check.map(y=>{
                    if (y === x.label) {
                        daoRuList.push({ title: x.label, field: x.prop});
                    }
                });
            });
            let query = this.mapQuery(this.queryParams);
            let urlStr = `${process.env.VUE_APP_BASE_API}/api/v1/caifazheng/excel?`;
            let str = 'zhuangTaiLeiBie=2';
            let arr = ['danWei', 'isXiane', 'linQuanDm', 'qiYuanDm', 'systemType', 'qianFaRen', 'caiFaZh', 'projid', 'shenQinRen', 'caiFaLxdm', 'caiFaFsdm', 'timberType', 'shiXiangJbm', 'yinShuaHq', 'yinShuaHz', 'qianFaSjq', 'qianFaSjz', 'xiaoDiMing'];
            arr.map((x, index)=>{
                if (query[arr[index]]) {
                    str += `&${arr[index]}=${query[arr[index]]}`;
                }
            });
            this.daoChuDisabled = true;
            asiox.post(urlStr + str, JSON.stringify(daoRuList), {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': Storage.get('jwt')
                },
                responseType: 'blob'
            }).then(res=>{
                const blob = new Blob([res.data], { type: 'application/vnd.ms-excel'});
                const downloadElement = document.createElement('a');
                const href = window.URL.createObjectURL(blob);
                downloadElement.href = href;
                downloadElement.download = 'rate.xls';
                document.body.appendChild(downloadElement);
                downloadElement.click();
                document.body.removeChild(downloadElement); // 下载完成移除元素
                window.URL.revokeObjectURL(href); // 释放掉blob对象
                this.daoChuDisabled = false;
            }).catch(err=>{
                this.daoChuDisabled = false;
            });
        },
        // 导出台账
        daoChuTaiZhangClick() {
            this.dialogVisible = true;
        },
        handleDaoChuUpdate(data) {
            this.daoChuFormData = data;
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
                if (prop === 'qianFaTime') {
                    fil.allProps.map((x, index) => {
                        copyQueryParams[x] = copyQueryParams[prop][index];
                    });
                    delete copyQueryParams[prop];
                }
                if (prop === 'yinShuaH') {
                    let map = {
                        0: 'from',
                        1: 'to'
                    };
                    fil.allProps.map((x, index) => {
                        copyQueryParams[x] = copyQueryParams[prop][map[index]];
                    });
                    delete copyQueryParams[prop];
                }
                if (prop === 'caiFaLeiXingFangShi') {
                    if (copyQueryParams[prop]) {
                        let arr = ['fuBm', 'ziBm'];
                        fil.allProps.map((x, index) => {
                            copyQueryParams[x] = copyQueryParams[prop][arr[index]];
                        });
                        delete copyQueryParams[prop];
                    }
                }
                if (prop === 'shiXiangMcZl') {
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
        updatePagerInfo(pageInfo) {
            this.getList({
                page: pageInfo.pageNo,
                size: pageInfo.pageSize
            });
        }
    },
    watch: {
        allChecked: function (value) {
            if (value) {
                let arr = [];
                this.daoChuConfig[0].options.map(x=>{
                    arr.push(x.label);
                });
                this.daoChuFormData.check = arr;
            } else {
                this.daoChuFormData.check = [];
            }
        }
    }
};
</script>

<template>
  <div>
    <xcy-form
      :config="filterConfig"
      :data="queryParams"
      @input="updateForm"
    ></xcy-form>
    <div class="footer" style="text-align:right">
        <el-button size="mini" type="primary" @click="handeleQuery">查询</el-button>
        <el-button size="mini" type="primary" @click="daoChuTaiZhangClick">导出台账</el-button>
    </div>
    <xcy-list
      style="padding-top: 20px"
      :data="listData"
      :props="listPropsConfig"
      :pagerInfo="pagerInfo"
      @action="handleAction"
      @updatePagerInfo="updatePagerInfo"
      :hasPager="true"
    />
     <el-dialog
      :close-on-click-modal="false"
      class="not-print"
      :visible.sync="dialogVisible"
      width="50%">
    <el-checkbox v-model="allChecked">全选</el-checkbox>
      <xcy-form
      v-if="dialogVisible"
          ref="dialogForm"
          :config="daoChuConfig"
          :data="daoChuFormData"
          @input="handleDaoChuUpdate"
      />
      <span slot="footer" class="dialog-footer">
          <el-button :disabled="daoChuDisabled" type="primary" @click="handleOk()">确 定</el-button>
      </span>
      </el-dialog>
  </div>
</template>

<style lang="stylus" scoped>
.container
  margin 20px 0
  padding 20px
.footer
    position relative
</style>
