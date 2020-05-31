<script>
import { filterConfig, listPropsConfig, chartsOptions} from './config';
import { getCaiFaXianEList } from './api';
import Storage from '@/common/storage';
import { cloneDeep } from 'lodash';
import {exportExcel} from '@/common/daochu';
import echarts from 'echarts';
export default {
    data() {
        return {
            filterConfig,
            listPropsConfig,
            // 限额使用
            tableData: [],
            tableMaxHeight: self.innerHeight - 320,
            xianEShiYongTableShow: true,
            query: {
                isUse: 'true',
                zhuiJiaLx: '0',
                nianFen: new Date().getFullYear()
            },
            // 限额
            xianEtableData: [],
            // 分析图弹窗
            analysisVisible: false,
            analysisCharts: null
        };
    },
    async created() {
        this.handeleQuery();
    },
    methods: {
    // 查询触发
        async handeleQuery() {
            let query = this.mapQuery(this.query);
            let v = await getCaiFaXianEList(query);
            if (String(query.isUse) === 'true') {
                this.xianEShiYongTableShow = true;
                this.tableData = v;
            } else {
                this.xianEShiYongTableShow = false;
                this.xianEtableData = v;
            }
        },
        daoChuClick() {
            exportExcel('xcy-table');
        },
        updateForm(data) {
            this.query = data;
        },
        // 合并单元格
        arraySpanMethod({ row, column, rowIndex, columnIndex }) {
            if (row.qiYuanMc && row.qiYuanMc.indexOf('合计') !== -1) {
                if (columnIndex === 0) {
                    return [1, 3];
                    // 合并多少要写到多少索引
                } else if (columnIndex === 1) {
                    return [0, 0];
                } else if (columnIndex === 2) {
                    return [0, 0];
                }
            }
        },

        // 查询前条件映射
        mapQuery(query) {
            let copyFilterConfig = cloneDeep(this.filterConfig);
            let copyQuery = cloneDeep(query);
            copyFilterConfig.map(filter => {
                const prop = filter.prop;
                if (prop === 'danWei') {
                    if (copyQuery[prop]) {
                        copyQuery.bianXianBm = copyQuery[prop];
                        delete copyQuery[prop];
                    } else {
                        copyQuery.bianXianBm = Storage.get('userInfo').xzCode;
                    }
                }
                if (prop === 'isUse') {
                    copyQuery[prop] = copyQuery[prop];
                }
            });
            return copyQuery;
        },
        tableDataAdd(arr, type) {
            return arr[0][type];
        },
        // echarts
        renderCharts(type = 'bar') {


            if (!this.analysisCharts) {
                this.analysisCharts = echarts.init(this.$refs.analysisCharts);
            }
            let tableData = [];
            if (this.xianEShiYongTableShow) {
                tableData = this.tableData;
            } else {
                tableData = this.xianEtableData;
            }
            if (tableData && tableData.length > 0) {
                let options = cloneDeep(chartsOptions);
                options.series = options.series.map(item => {
                    item.type = type;
                    return item;
                });

                if (type === 'pie') {
                    options.dataset.source.splice(0, 1);
                }
                options.dataset.source = options.dataset.source.map(source => {
                    if (source.product === '总量' && type === 'bar') {
                        source['总量'] = this.tableDataAdd(tableData, 'zongHeJi');
                        source['剩余'] = this.tableDataAdd(tableData, 'zongShengYu');
                    }
                    if (source.product === '商品林主伐') {
                        source['总量'] = this.tableDataAdd(tableData, 'zsplZf');
                        source['剩余'] = this.tableDataAdd(tableData, 'ssplZf');
                    }
                    if (source.product === '商品林抚育采伐') {
                        source['总量'] = this.tableDataAdd(tableData, 'zsplFyf');
                        source['剩余'] = this.tableDataAdd(tableData, 'ssplFycf');
                    }
                    if (source.product === '商品林低产林改造') {
                        source['总量'] = this.tableDataAdd(tableData, 'zsplDg');
                        source['剩余'] = this.tableDataAdd(tableData, 'ssplDg');
                    }
                    if (source.product === '商品林其他采伐') {
                        source['总量'] = this.tableDataAdd(tableData, 'zsplQtcf');
                        source['剩余'] = this.tableDataAdd(tableData, 'ssplQtcf');
                    }
                    if (source.product === '公益林更新采伐') {
                        source['总量'] = this.tableDataAdd(tableData, 'zgylGxcf');
                        source['剩余'] = this.tableDataAdd(tableData, 'sgylGxcf');
                    }
                    if (source.product === '公益林抚育采伐') {
                        source['总量'] = this.tableDataAdd(tableData, 'zgylFycf');
                        source['剩余'] = this.tableDataAdd(tableData, 'sgylFycf');
                    }
                    if (source.product === '公益林低产林改造') {
                        source['总量'] = this.tableDataAdd(tableData, 'zgylDg');
                        source['剩余'] = this.tableDataAdd(tableData, 'sgylDgcf');
                    }
                    if (source.product === '公益林其他采伐') {
                        source['总量'] = this.tableDataAdd(tableData, 'zgylQtcf');
                        source['剩余'] = this.tableDataAdd(tableData, 'sgylQtcf');
                    }
                    if (source.product === '公益林毛竹') {
                        source['总量'] = this.tableDataAdd(tableData, 'zMaoZhu');
                        source['剩余'] = this.tableDataAdd(tableData, 'sMaoZhu');
                    }
                    return source;
                });
                this.analysisCharts.setOption(options);
            } else {
                this.analysisCharts.clear();
            }
        }
    },
    watch: {
        analysisVisible(value) {
            if (value) {
                // 确保dom加载完毕
                this.$nextTick(() => {
                    this.renderCharts();
                });
            }
        }
    }
};
</script>

<template>
  <div>
    <xcy-form :config="filterConfig" :data="query"  @input="updateForm"></xcy-form>
       <div style="text-align:right;position: relative;">
      <el-button size="mini" type="primary"  @click="handeleQuery">查询</el-button>
         <el-button slot="front-btn" size="mini" type="primary" @click="analysisVisible=true">分析图</el-button>
      <el-button size="mini" type="primary"  @click="daoChuClick">导出</el-button>
    </div>
    <!-- 限额使用查询 -->
    <el-table
      v-if="xianEShiYongTableShow===true"
      :data="tableData"
      :max-height="tableMaxHeight"
      :span-method="arraySpanMethod"
      style="width: 100%"
    >
      <el-table-column  fixed label="单位" align="center">
        <template slot-scope="scope">
          <div style="text-align:center" v-if="scope.row.qiYuanMc.indexOf('合计')!==-1">{{scope.row.xzCodeName}}合计</div>
          <div v-if="scope.row.qiYuanMc.indexOf('合计')===-1">{{scope.row.xzCodeName}}</div>
        </template>
      </el-table-column>
      <el-table-column fixed prop="quanShuMc" label="权属" align="center" />
      <el-table-column fixed prop="qiYuanMc" label="起源" align="center" />

      <el-table-column label="总计" align="center">
        <el-table-column label="总量" align="center">
          <template slot-scope="scope">
          <div>{{(scope.row.zsplHeji+scope.row.zgylHeji+scope.row.zMaoZhu).toFixed(2)}}</div>
          </template>
        </el-table-column>
        <el-table-column label="使用" class-name="shi-yong-color" align="center">
          <template slot-scope="scope">
            <div>{{(scope.row.zsplHeji+scope.row.zgylHeji+scope.row.zMaoZhu-scope.row.zongShengYu).toFixed(2)}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="zongShengYu" label="剩余" class-name="sheng-yu-color" align="center" />
        <el-table-column prop="zongSyl" label="使用率%" class-name="shi-yong-lv-color" align="center"/>
      </el-table-column>

      <el-table-column label="商品林" align="center">
        <el-table-column label="合计" align="center">
          <el-table-column prop="zsplHeji" label="总量"  align="center"/>
          <el-table-column label="使用" class-name="shi-yong-color" align="center">
            <template slot-scope="scope">
              <div>{{(Number(scope.row.zsplHeji)-Number(scope.row.ssplHeji)).toFixed(2)}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="ssplHeji" label="剩余" class-name="sheng-yu-color" align="center"/>
          <el-table-column prop="splHejiSyl" label="使用率%"  class-name="shi-yong-lv-color" align="center"/>
        </el-table-column>
        <el-table-column label="主伐" align="center">
          <el-table-column prop="zsplZf" label="总量" align="center"/>
          <el-table-column label="使用" class-name="shi-yong-color" align="center">
            <template slot-scope="scope">
              <div>{{(Number(scope.row.zsplZf)-Number(scope.row.ssplZf)).toFixed(2)}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="ssplZf" label="剩余" class-name="sheng-yu-color" align="center"/>
          <el-table-column prop="splZfSyl" label="使用率%" class-name="shi-yong-lv-color" align="center"/>
        </el-table-column>
        <el-table-column label="抚育采伐" align="center">
          <el-table-column prop="zsplFyf" label="总量" align="center"/>
          <el-table-column label="使用" class-name="shi-yong-color" align="center">
            <template slot-scope="scope">
              <div>{{(Number(scope.row.zsplFyf)-Number(scope.row.ssplFycf)).toFixed(2)}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="ssplFycf" label="剩余" class-name="sheng-yu-color" align="center"/>
          <el-table-column prop="splFycfSyl" label="使用率%" class-name="shi-yong-lv-color" align="center"/>
        </el-table-column>
        <el-table-column label="低产林改造" align="center">
          <el-table-column prop="zsplDg" label="总量" align="center"/>
          <el-table-column label="使用" class-name="shi-yong-color" align="center">
            <template slot-scope="scope">
              <div>{{(Number(scope.row.zsplDg)-Number(scope.row.ssplDg)).toFixed(2)}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="ssplDg" label="剩余" class-name="sheng-yu-color" align="center"/>
          <el-table-column prop="splDgSyl" label="使用率%" class-name="shi-yong-lv-color" align="center"/>
        </el-table-column>
        <el-table-column label="其他采伐" align="center">
          <el-table-column prop="zsplQtcf" label="总量" align="center"/>
          <el-table-column label="使用" class-name="shi-yong-color" align="center">
            <template slot-scope="scope">
              <div>{{(Number(scope.row.zsplQtcf)-Number(scope.row.ssplQtcf)).toFixed(2)}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="ssplQtcf" label="剩余" class-name="sheng-yu-color" align="center"/>
          <el-table-column prop="splQtcfSyl" label="使用率%" class-name="shi-yong-lv-color" align="center"/>
        </el-table-column>
      </el-table-column>
      <el-table-column label="生态公益" align="center">
        <el-table-column label="合计" align="center">
          <el-table-column prop="zgylHeji" label="总量" align="center"/>
          <el-table-column label="使用" class-name="shi-yong-color" align="center">
            <template slot-scope="scope">
              <div>{{(Number(scope.row.zgylHeji)-Number(scope.row.sgylHeji)).toFixed(2)}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="sgylHeji" label="剩余" class-name="sheng-yu-color" align="center"/>
          <el-table-column prop="gylHejiSyl" label="使用率%" class-name="shi-yong-lv-color" align="center"/>
        </el-table-column>
        <el-table-column label="更新采伐" align="center">
          <el-table-column prop="zgylGxcf" label="总量" align="center"/>
          <el-table-column label="使用" class-name="shi-yong-color" align="center">
            <template slot-scope="scope">
              <div>{{(Number(scope.row.zgylGxcf)-Number(scope.row.sgylGxcf)).toFixed(2)}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="sgylGxcf" label="剩余" class-name="sheng-yu-color" align="center"/>
          <el-table-column prop="gylGxcfSyl" label="使用率%" class-name="shi-yong-lv-color" align="center"/>
        </el-table-column>
        <el-table-column label="抚育采伐" align="center">
          <el-table-column prop="zgylFycf" label="总量" align="center"/>
          <el-table-column label="使用" class-name="shi-yong-color" align="center">
            <template slot-scope="scope">
              <div>{{(Number(scope.row.zgylFycf)-Number(scope.row.sgylFycf)).toFixed(2)}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="sgylFycf" label="剩余" class-name="sheng-yu-color" align="center"/>
          <el-table-column prop="gylFycfSyl" label="使用率%" class-name="shi-yong-lv-color" align="center"/>
        </el-table-column>
        <el-table-column label="低产林改造" align="center">
          <el-table-column prop="zgylDg" label="总量"  align="center"/>
          <el-table-column label="使用" class-name="shi-yong-color" align="center">
            <template slot-scope="scope">
              <div>{{(Number(scope.row.zgylDg)-Number(scope.row.sgylDgcf)).toFixed(2)}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="sgylDgcf" label="剩余" class-name="sheng-yu-color" align="center"/>
          <el-table-column prop="gylDgcfSyl" label="使用率%" class-name="shi-yong-lv-color" align="center"/>
        </el-table-column>
        <el-table-column label="其他采伐" align="center">
          <el-table-column prop="zgylQtcf" label="总量" align="center"/>
          <el-table-column label="使用" class-name="shi-yong-color" align="center">
            <template slot-scope="scope">
              <div>{{(Number(scope.row.zgylQtcf)-Number(scope.row.sgylQtcf)).toFixed(2)}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="sgylQtcf" label="剩余" class-name="sheng-yu-color" align="center"/>
          <el-table-column prop="gylQtcfSyl" label="使用率%" class-name="shi-yong-lv-color" align="center"/>
        </el-table-column>
      </el-table-column>
      <el-table-column label="毛竹" align="center">
        <el-table-column prop="zMaoZhu" label="总量" align="center"/>
        <el-table-column label="使用" class-name="shi-yong-color" align="center">
          <template slot-scope="scope">
            <div>{{(Number(scope.row.zMaoZhu)-Number(scope.row.sMaoZhu)).toFixed(0)}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="sMaoZhu" label="剩余" class-name="sheng-yu-color" align="center"/>
      </el-table-column>
    </el-table>

  <!-- 限额查询 -->
  <div>
    <el-table
      v-if="xianEShiYongTableShow===false"
      :data="xianEtableData"
      :span-method="arraySpanMethod"
      :max-height="tableMaxHeight"
      style="width: 100%"
    >
      <el-table-column fixed label="单位">
        <template slot-scope="scope">
          <div style="text-align:center"  v-if="scope.row.qiYuanMc.indexOf('合计')!==-1">{{scope.row.xzCodeName}}合计</div>
          <div v-if="scope.row.qiYuanMc.indexOf('合计')===-1">{{scope.row.xzCodeName}}</div>
        </template>
      </el-table-column>
      <el-table-column fixed prop="quanShuMc" label="权属"/>
      <el-table-column fixed prop="qiYuanMc" label="起源"/>
      <el-table-column prop="zongHeJi" label="总计">
        <template slot-scope="scope">
          <div>{{scope.row.zsplHeji+scope.row.zgylHeji}}</div>
        </template>
      </el-table-column>

      <el-table-column label="商品林">
        <el-table-column prop="zsplHeji" label="合计" />
        <el-table-column prop="zsplZf" label="主伐" />
        <el-table-column prop="zsplFyf" label="抚育采伐" />
        <el-table-column prop="zsplDg" label="低产林改造" />
        <el-table-column prop="zsplQtcf" label="其他采伐" />
      </el-table-column>

      <el-table-column label="生态公益">
        <el-table-column prop="zgylHeji" label="合计" />
        <el-table-column prop="zgylGxcf" label="更新采伐" />
        <el-table-column prop="zgylFycf" label="抚育采伐" />
        <el-table-column prop="zgylDg" label="低产林改造" />
        <el-table-column prop="zgylQtcf" label="其他采伐" />
      </el-table-column>
      <el-table-column prop="zMaoZhu" label="毛竹" />
    </el-table>

    <el-dialog title="分析图" :visible.sync="analysisVisible" width="80%">
      <div class="analysisCharts" ref="analysisCharts"></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="analysisVisible=false">关闭</el-button>
        <el-button type="primary" @click="renderCharts('bar')">柱状图</el-button>
        <el-button type="primary" @click="renderCharts('pie')">饼图</el-button>
      </span>
    </el-dialog>
  </div>
  </div>
</template>

<style lang="stylus" scoped>
.container {
  margin: 20px 0;
  padding: 20px;
  height:400px;
}
</style>

<style lang="css">
.shi-yong-color{
color: #4B7B65
}
.sheng-yu-color{
color: #D38B1C
}
.shi-yong-lv-color{
color: #0075C9
}

.analysisCharts {
  height: 500px;
}
</style>
