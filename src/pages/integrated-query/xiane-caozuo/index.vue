<script>
import {filterConfig } from './config';
import {getCaiFaXianEList, getZhuiJiaLeiBieList} from './api';
import Storage from '@/common/storage';
import { cloneDeep } from 'lodash';
export default {
    data() {
        return {
            filterConfig,
            tableData: [],
            query: {
                leiBie: '1',
                nianFen: new Date().getFullYear(),
                danWei: Storage.get('userInfo').xzCode,
                zhuiJiaLx: 'null',
                zhuiJiaLb: 'null'
            },
            totalElements: 0
        };
    },
    async created() {
        this.init();
        this.handeleQuery();
    },
    methods: {
        async init() {
            let copyFilterConfig = cloneDeep(this.filterConfig);
            let v = await getZhuiJiaLeiBieList();
            let arr = [];
            arr.push({label: '请选择', value: 'null'});
            v.map(x=>{
                let obj = {
                    label: x.mingCheng,
                    value: x.bianMa
                };
                arr.push(obj);
            });
            copyFilterConfig.map(x=>{
                let prop = x.prop;
                if (prop === 'zhuiJiaLb') {
                    x.options = arr;
                }
            });
            this.filterConfig = copyFilterConfig;
        },
        // 查询触发
        async handeleQuery(pager) {
            let query = this.mapQuery(this.query);
            let v = await getCaiFaXianEList(Object.assign(query, pager));
            this.totalElements = v.totalElements;
            this.tableData = v.content;
        },
        updateForm(data) {
            this.query = data;
        },
        // 查询前条件映射
        mapQuery(query) {
            let copyQuery = cloneDeep(query);
            Object.keys(copyQuery).map(x=>{
                if (copyQuery[x] === 'null') {
                    delete copyQuery[x];
                }
            });
            return copyQuery;
        },
        handleCurrentChange(page) {
            this.handeleQuery({page: page, size: 10});
        }
    },
    watch: {
        'query.leiBie': function (value) {
            let copyQuery = cloneDeep(this.query);
            let copyFilterConfig = cloneDeep(this.filterConfig);
            if (value === '1' || value === '3') {
                copyFilterConfig.map(x=>{
                    const prop = x.prop;
                    if (prop === 'zhuiJiaLx' || prop === 'zhuiJiaLb') {
                        x.disabled = true;
                        copyQuery[prop] = 'null';
                    }
                });
                this.filterConfig = copyFilterConfig;
                this.query = copyQuery;
            } else {
                copyFilterConfig.map(x=>{
                    const prop = x.prop;
                    if (prop === 'zhuiJiaLx' || prop === 'zhuiJiaLb') {
                        x.disabled = false;
                    }
                });
                this.filterConfig = copyFilterConfig;
            }
        }
    }
};
</script>

<template>
  <div>
      <xcy-form-query
      :config="filterConfig"
      :data="query"
      @query="handeleQuery"
      @input="updateForm"
    ></xcy-form-query>
  <el-table
    :data="tableData"
    max-height="600"
     class="xcy-list-table"
      id="xcy-table"
    style="width: 100%">
    <el-table-column align="center"  fixed label="序号">
        <template slot-scope="scope">
            <div v-text="scope.$index+1"></div>
        </template>
    </el-table-column>
    <el-table-column align="center"  prop="zhuiJiaLxmc" label="类型"/>
    <el-table-column align="center"  prop="bianXianMc" label="单位"/>
    <el-table-column align="center"  prop="quanShuMc" label="权属"/>
    <el-table-column align="center"  prop="qiYuanMc" label="起源"/>

    <el-table-column align="center"  label="商品林">
      <el-table-column align="center"  label="合计">
          <template slot-scope="scope">
              <div v-text="scope.row.splZf+scope.row.splFyf+scope.row.splDg+scope.row.splQtcf"></div>
          </template>
      </el-table-column>
      <el-table-column align="center"  prop="splZf" label="主伐" />
      <el-table-column align="center"  prop="splFyf" label="抚育采伐" />
      <el-table-column align="center"  prop="splDg" label="低产林改造" />
      <el-table-column align="center"  prop="splQtcf" label="其他采伐" />
    </el-table-column>

     <el-table-column align="center"  label="生态公益林">
      <el-table-column align="center"  label="合计" >
          <template slot-scope="scope">
              <div v-text="scope.row.gylGxcf+scope.row.gylFycf+scope.row.gylDg+scope.row.gylQtcf"></div>
          </template>
      </el-table-column>
      <el-table-column align="center"  prop="gylGxcf" label="更新采伐" />
      <el-table-column align="center"  prop="gylFycf" label="抚育采伐" />
      <el-table-column align="center"  prop="gylDg" label="低效林改造" />
      <el-table-column align="center"  prop="gylQtcf" label="其他采伐" />
    </el-table-column>

    <el-table-column align="center"  prop="maoZhu" label="毛竹" />
    <el-table-column align="center"  prop="wenHao" label="文号" />
    <el-table-column align="center"  prop="dengLuMc" label="操作用户" />
    <el-table-column align="center"  prop="zhenShiXm" label="操作人员" />
    <el-table-column align="center"  prop="caoZuoSj" label="操作时间" width="200"/>
  </el-table>
    <div>
        <el-pagination
        style="text-align: right;"
        layout="prev, pager, next"
        :total="totalElements"
        @current-change="handleCurrentChange"
        />
    </div>

  </div>
</template>

<style lang="stylus" scoped>
.container
  margin 20px 0
  padding 20px
</style>
