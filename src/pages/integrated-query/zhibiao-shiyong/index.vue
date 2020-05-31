<script>
import { filterConfig, listPropsConfig, chartsOptions } from './config';
import { getCaiFaXianEList } from './api';
import Storage from '@/common/storage';
import { cloneDeep } from 'lodash';
import echarts from 'echarts';
import { exportExcel } from '@/common/daochu';
export default {
    data() {
        return {
            filterConfig,
            listPropsConfig,
            tableMaxHeight: self.innerHeight - 320,
            // 限额使用
            tableData: [],
            xianEShiYongTableShow: true,
            query: {
                isUse: '1',
                nianFen: new Date().getFullYear(),
                danWeiCode: Storage.get('userInfo').xzCode
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
            if (String(query.isUse) === '1') {
                this.xianEShiYongTableShow = true;
                this.tableData = v;
            } else {
                this.xianEShiYongTableShow = false;
                this.xianEtableData = v;
            }
        },
        updateForm(data) {
            this.query = data;
        },
        daoChuClick() {
            exportExcel('xcy-table');
        },
        // 合并单元格
        arraySpanMethod({ row, columnIndex }) {
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
            return false;
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
            let num = 0;
            arr.map(item => {
                num = num + item[type];
            });
            return num;
        },
        // 渲染图标
        renderCharts(type = 'bar') {
            if (!this.analysisCharts) {
                this.analysisCharts = echarts.init(this.$refs.analysisCharts);
            }
            let tableData = [];
            if (String(this.query.isUse) === '1') {
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
                options.dataset.source = options.dataset.source.map(source => {
                    if (source.product === '公益林抚育采伐') {
                        source['总量'] = this.tableDataAdd(tableData, 'zgylFycf');
                        source['剩余'] = this.tableDataAdd(tableData, 'sgylFycf');
                    }
                    if (source.product === '公益林更新采伐') {
                        source['总量'] = this.tableDataAdd(tableData, 'zgylGxcf');
                        source['剩余'] = this.tableDataAdd(tableData, 'sgylGxcf');
                    }
                    if (source.product === '公益林其他采伐') {
                        source['总量'] = this.tableDataAdd(tableData, 'zgylQtcf');
                        source['剩余'] = this.tableDataAdd(tableData, 'sgylQtcf');
                    }
                    if (source.product === '商品林主伐') {
                        source['总量'] = this.tableDataAdd(tableData, 'zsplZf');
                        source['剩余'] = this.tableDataAdd(tableData, 'ssplZf');
                    }
                    if (source.product === '商品林抚育采伐') {
                        source['总量'] = this.tableDataAdd(tableData, 'zgylFycf');
                        source['剩余'] = this.tableDataAdd(tableData, 'ssplFycf');
                    }
                    if (source.product === '商品林其他采伐') {
                        source['总量'] = this.tableDataAdd(tableData, 'zsplQtcf');
                        source['剩余'] = this.tableDataAdd(tableData, 'ssplQtcf');
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
    <xcy-form-query :config="filterConfig" :data="query" @query="handeleQuery" @input="updateForm">
      <el-button slot="front-btn" size="mini" type="primary" @click="analysisVisible=true">分析图</el-button>
      <el-button slot="front-btn" size="mini" type="primary" @click="daoChuClick">导出</el-button>
    </xcy-form-query>
    <!-- 限额使用查询 -->
    <el-table
      id="xcy-table"
      v-if="xianEShiYongTableShow===true"
      :data="tableData"
      :max-height="tableMaxHeight"
      :span-method="arraySpanMethod"
      style="width: 100%"
    >
      <el-table-column align="center" fixed label="单位">
        <template slot-scope="scope">
          <div
            style="text-align:center"
            v-if="scope.row.qiYuanMc.indexOf('合计')!==-1"
          >{{scope.row.xzCodeName}}合计</div>
          <div v-if="scope.row.qiYuanMc.indexOf('合计')===-1">{{scope.row.xzCodeName}}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed prop="quanShuMc" label="权属" />
      <el-table-column align="center" fixed prop="qiYuanMc" label="起源" />

      <el-table-column align="center" label="总计">
        <el-table-column align="center" label="总量">
          <template slot-scope="scope">
            <div>{{scope.row.zHj}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="使用" class-name="shi-yong-color">
          <template slot-scope="scope">
            <div>{{scope.row.zHj-scope.row.sHj}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="sHj" label="剩余" class-name="sheng-yu-color" />
        <el-table-column align="center" prop="zsyl" label="使用率%" class-name="shi-yong-lv-color" />
      </el-table-column>

      <el-table-column align="center" label="商品林">
        <el-table-column align="center" label="合计">
          <el-table-column align="center" prop="zsplHj" label="总量" />
          <el-table-column align="center" label="使用" class-name="shi-yong-color">
            <template slot-scope="scope">
              <div>{{(Number(scope.row.zsplHj)-Number(scope.row.ssplHj)).toFixed(0)}}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="ssplHj" label="剩余" class-name="sheng-yu-color" />
          <el-table-column
            align="center"
            prop="splHejiSyl"
            label="使用率%"
            class-name="shi-yong-lv-color"
          />
        </el-table-column>
        <el-table-column align="center" label="主伐">
          <el-table-column align="center" prop="zsplZf" label="总量" />
          <el-table-column align="center" label="使用" class-name="shi-yong-color">
            <template slot-scope="scope">
              <div>{{(Number(scope.row.zsplZf)-Number(scope.row.ssplZf)).toFixed(0)}}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="ssplZf" label="剩余" class-name="sheng-yu-color" />
          <el-table-column
            align="center"
            prop="splZfSyl"
            label="使用率%"
            class-name="shi-yong-lv-color"
          />
        </el-table-column>
        <el-table-column align="center" label="抚育采伐">
          <el-table-column align="center" prop="zsplFyf" label="总量" />
          <el-table-column align="center" label="使用" class-name="shi-yong-color">
            <template slot-scope="scope">
              <div>{{(Number(scope.row.zsplFyf)-Number(scope.row.ssplFycf)).toFixed(0)}}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="ssplFycf" label="剩余" class-name="sheng-yu-color" />
          <el-table-column
            align="center"
            prop="splFycfSyl"
            label="使用率%"
            class-name="shi-yong-lv-color"
          />
        </el-table-column>
        <el-table-column align="center" label="低产林改造">
          <el-table-column align="center" prop="zsplDg" label="总量" />
          <el-table-column align="center" label="使用" class-name="shi-yong-color">
            <template slot-scope="scope">
              <div>{{(Number(scope.row.zsplDg)-Number(scope.row.ssplDg)).toFixed(0)}}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="ssplDg" label="剩余" class-name="sheng-yu-color" />
          <el-table-column
            align="center"
            prop="splDgSyl"
            label="使用率%"
            class-name="shi-yong-lv-color"
          />
        </el-table-column>
        <el-table-column align="center" label="其他采伐">
          <el-table-column align="center" prop="zsplQtcf" label="总量" />
          <el-table-column align="center" label="使用" class-name="shi-yong-color">
            <template slot-scope="scope">
              <div>{{(Number(scope.row.zsplQtcf)-Number(scope.row.ssplQtcf)).toFixed(0)}}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="ssplQtcf" label="剩余" class-name="sheng-yu-color" />
          <el-table-column
            align="center"
            prop="splQtcfSyl"
            label="使用率%"
            class-name="shi-yong-lv-color"
          />
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="生态公益">
        <el-table-column align="center" label="合计">
          <el-table-column align="center" prop="zgylHj" label="总量" />
          <el-table-column align="center" label="使用" class-name="shi-yong-color">
            <template slot-scope="scope">
              <div>{{(Number(scope.row.zgylHj)-Number(scope.row.zgylHj)).toFixed(0)}}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="zgylHj" label="剩余" class-name="sheng-yu-color" />
          <el-table-column
            align="center"
            prop="gylHejiSyl"
            label="使用率%"
            class-name="shi-yong-lv-color"
          />
        </el-table-column>
        <el-table-column align="center" label="更新采伐">
          <el-table-column align="center" prop="zgylGxcf" label="总量" />
          <el-table-column align="center" label="使用" class-name="shi-yong-color">
            <template slot-scope="scope">
              <div>{{(Number(scope.row.zgylGxcf)-Number(scope.row.sgylGxcf)).toFixed(0)}}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="sgylGxcf" label="剩余" class-name="sheng-yu-color" />
          <el-table-column
            align="center"
            prop="gylGxcfSyl"
            label="使用率%"
            class-name="shi-yong-lv-color"
          />
        </el-table-column>
        <el-table-column align="center" label="抚育采伐">
          <el-table-column align="center" prop="zgylFycf" label="总量" />
          <el-table-column align="center" label="使用" class-name="shi-yong-color">
            <template slot-scope="scope">
              <div>{{(Number(scope.row.zgylFycf)-Number(scope.row.sgylFycf)).toFixed(0)}}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="sgylFycf" label="剩余" class-name="sheng-yu-color" />
          <el-table-column
            align="center"
            prop="gylFycfSyl"
            label="使用率%"
            class-name="shi-yong-lv-color"
          />
        </el-table-column>
        <el-table-column align="center" label="低产林改造">
          <el-table-column align="center" prop="zgylDg" label="总量" />
          <el-table-column align="center" label="使用" class-name="shi-yong-color">
            <template slot-scope="scope">
              <div>{{(Number(scope.row.zgylDg)-Number(scope.row.sgylDgcf)).toFixed(0)}}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="sgylDgcf" label="剩余" class-name="sheng-yu-color" />
          <el-table-column
            align="center"
            prop="gylDgcfSyl"
            label="使用率%"
            class-name="shi-yong-lv-color"
          />
        </el-table-column>
        <el-table-column align="center" label="其他采伐">
          <el-table-column align="center" prop="zgylQtcf" label="总量" />
          <el-table-column align="center" label="使用" class-name="shi-yong-color">
            <template slot-scope="scope">
              <div>{{(Number(scope.row.zgylQtcf)-Number(scope.row.sgylQtcf)).toFixed(0)}}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="sgylQtcf" label="剩余" class-name="sheng-yu-color" />
          <el-table-column
            align="center"
            prop="gylQtcfSyl"
            label="使用率%"
            class-name="shi-yong-lv-color"
          />
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="毛竹">
        <el-table-column align="center" prop="zMaoZhu" label="总量" />
        <el-table-column align="center" label="使用" class-name="shi-yong-color">
          <template slot-scope="scope">
            <div>{{(Number(scope.row.zMaoZhu)-Number(scope.row.sMaoZhu)).toFixed(0)}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="sMaoZhu" label="剩余" class-name="sheng-yu-color" />
      </el-table-column>
    </el-table>

    <!-- 指标查询 -->
    <div>
      <el-table
        id="xcy-table"
        v-if="xianEShiYongTableShow===false"
        :data="xianEtableData"
        :max-height="tableMaxHeight"
        :span-method="arraySpanMethod"
        style="width: 100%"
      >
        <el-table-column align="center" fixed label="单位">
          <template slot-scope="scope">
            <div
              style="text-align:center"
              v-if="scope.row.qiYuanMc.indexOf('合计')!==-1"
            >{{scope.row.xzCodeName}}合计</div>
            <div v-if="scope.row.qiYuanMc.indexOf('合计')===-1">{{scope.row.xzCodeName}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" fixed prop="quanShuMc" label="权属" />
        <el-table-column align="center" fixed prop="qiYuanMc" label="起源" />
        <el-table-column align="center" prop="zHj" label="总计" />

        <el-table-column align="center" label="商品林">
          <el-table-column align="center" prop="zsplHj" label="合计" />
          <el-table-column align="center" prop="zsplZf" label="主伐" />
          <el-table-column align="center" prop="zsplFyf" label="抚育采伐" />
          <el-table-column align="center" prop="zsplDg" label="低产林改造" />
          <el-table-column align="center" prop="zsplQtcf" label="其他采伐" />
        </el-table-column>

        <el-table-column align="center" label="生态公益">
          <el-table-column align="center" prop="zgylHj" label="合计" />
          <el-table-column align="center" prop="zgylGxcf" label="更新采伐" />
          <el-table-column align="center" prop="zgylFycf" label="抚育采伐" />
          <el-table-column align="center" prop="zgylDg" label="低产林改造" />
          <el-table-column align="center" prop="zgylQtcf" label="其他采伐" />
        </el-table-column>
        <el-table-column align="center" prop="zMaoZhu" label="毛竹" />
      </el-table>
    </div>
    <el-dialog title="分析图" :visible.sync="analysisVisible" width="80%">
      <div class="analysisCharts" ref="analysisCharts"></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="analysisVisible=false">关闭</el-button>
        <el-button type="primary" @click="renderCharts('bar')">柱状图</el-button>
        <el-button type="primary" @click="renderCharts('pie')">饼图</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style lang="stylus" scoped>
.container {
  margin: 20px 0;
  padding: 20px;
}
</style>

<style lang="css">
.shi-yong-color {
  color: #4b7b65;
}
.sheng-yu-color {
  color: #d38b1c;
}
.shi-yong-lv-color {
  color: #0075c9;
}
.analysisCharts {
  height: 500px;
}
</style>
