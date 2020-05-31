<script>
import { filterConfig, listPropsConfig, mianJiListPropsConfig } from './config';
import { caifazheng } from './api';
import { cloneDeep } from 'lodash';
import Storage from '@/common/storage';
import echarts from 'echarts';
import {exportExcel} from '@/common/daochu';
const times = new Date().getFullYear() + '-01-01';
let listIndex = [];
export default {
    data() {
        return {
            query: {},
            listPropsConfig,
            filterConfig: filterConfig,
            mianJiListPropsConfig,
            queryParams: {
                xzCode: Storage.get('userInfo').xzCode,
                contentOption: 'xuji',
                qianFaTime: [times, this.$getTime()],
                sxOption: '1'
            },
            listData: [],
            listShow: true,
            echartsDialogShow: false,
            echartsDialogPieShow: false,
            echartListData: [],
            listConfig: {
                // 合并单元格
                arraySpanMethod({ row, column, rowIndex, columnIndex }) {
                    if (row.qi_yuan_mc && row.qi_yuan_mc.indexOf('合计') !== -1) {
                        if (columnIndex === 0) {
                            return [1, 3];
                            // 合并多少要写到多少索引
                        } else if (columnIndex === 1) {
                            return [0, 0];
                        } else if (columnIndex === 2) {
                            return [0, 0];
                        }
                    }
                }
                // arraySpanMethod({ row, column, rowIndex, columnIndex }) {
                //     console.log(listIndex);
                //     if (columnIndex === 0) {
                //         if (row.qi_yuan_mc && row.qi_yuan_mc.indexOf('合计') !== -1) {
                //             console.log(rowIndex);
                //         }
                //         if (rowIndex % 2 === 0) {
                //             return {
                //                 rowspan: 2,
                //                 colspan: 1
                //             };
                //         }
                //         return {
                //             rowspan: 0,
                //             colspan: 0
                //         };
                //     }
                // }
            }

        };
    },
    components: {},
    async created() {
        this.init();
        this.getList();
    },
    methods: {
        init() {
            const jueSeMc = Storage.get('userInfo').jueSeMc;
            const isXianYongHu = jueSeMc.includes('县');
            const isShiYongHu = jueSeMc.includes('市');
            let copyFilterConfig = cloneDeep(this.filterConfig);
            copyFilterConfig.map((fil, index) => {
                const prop = fil.prop;
                if (prop === 'sxOption') {
                    if (isXianYongHu || isShiYongHu) {
                        copyFilterConfig[index].disabled = true;
                    }
                }
            });
            this.filterConfig = copyFilterConfig;
            if (isXianYongHu || isShiYongHu) {
                let copyQueryParams = cloneDeep(this.queryParams);
                copyQueryParams.sxOption = '0';
                this.queryParams = copyQueryParams;
            }
        },
        daoChuClick() {
            exportExcel('xcy-table');
        },
        setData(data, name, name2) {
            let arr = [];
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                let obj = {
                    value: name2 ? (Number(element[name]) + Number(element[name2])).toFixed(2) : element[name]
                };
                arr.push(obj);
            }
            return arr;
        },
        setPieData(data, label, ...args) {
            let arr = [];
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                let o = 0;
                args.map((x, index)=>{
                    o += element[args[index]];
                });
                let obj = {
                    value: o,
                    name: element[label]
                };
                arr.push(obj);
            }
            return arr;
        },
        // 设置 echarts 图表
        setEchartsBar() {
            this.echartsDialogShow = true;
            console.log('init');
            console.log(this.echartListData);
            console.log(this.setData(this.echartListData, 'splzf', 'splzfcc'));
            setTimeout(() => {
                const myChart = echarts.init(document.getElementById('echartsId'));
                // 基于准备好的dom，初始化echarts实例
                let option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: [
                            '商品林主伐',
                            '商品林抚育采伐',
                            '商品林低产林改造',
                            '商品林其他采伐',
                            '公益林更新采伐',
                            '公益林抚育采伐',
                            '公益林低产林改造',
                            '公益林其他采伐',
                            '毛竹'
                        ]
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: this.setData(this.echartListData, 'c_mc')
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '商品林主伐',
                            type: 'bar',
                            data: this.setData(this.echartListData, 'splzf', 'splzfcc')
                        },
                        {
                            name: '商品林抚育采伐',
                            type: 'bar',
                            data: this.setData(this.echartListData, 'splfy', 'splfycc')
                        },
                        {
                            name: '商品林低产林改造',
                            type: 'bar',
                            data: this.setData(this.echartListData, 'splqtdg', 'splqtdgcc')
                        },
                        {
                            name: '商品林其他采伐',
                            type: 'bar',
                            data: this.setData(this.echartListData, 'splqt', 'splqtcc')
                        },
                        {
                            name: '公益林更新采伐',
                            type: 'bar',
                            data: this.setData(this.echartListData, 'gylgx', 'gylgxcc')
                        },
                        {
                            name: '公益林抚育采伐',
                            type: 'bar',
                            data: this.setData(this.echartListData, 'gylfy', 'gylfycc')
                        },
                        {
                            name: '公益林低产林改造',
                            type: 'bar',
                            data: this.setData(this.echartListData, 'gylqtdg', 'gylqtdgcc')
                        },
                        {
                            name: '公益林其他采伐',
                            type: 'bar',
                            data: this.setData(this.echartListData, 'gylqt', 'gylqtcc')
                        },
                        {
                            name: '毛竹',
                            type: 'bar',
                            data: this.setData(this.echartListData, 'zhucai')
                        }
                    ]
                };
                myChart.setOption(option);
            }, 500);
        },
        setEchartsPie() {
            this.echartsDialogPieShow = true;

            setTimeout(() => {
                const myChart1 = echarts.init(document.getElementById('echartsPie1'));
                const myChart2 = echarts.init(document.getElementById('echartsPie2'));
                // 基于准备好的dom，初始化echarts实例

                const option1 = {
                    title: {
                        text: '发证份数',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: this.setPieData(this.echartListData, 'c_mc', 'test')
                    },
                    series: [
                        {
                            name: '发证份数',
                            type: 'pie',
                            radius: '55%',
                            center: ['60%', '60%'],
                            data: this.setPieData(this.echartListData, 'c_mc', 'fenshu'),
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                const option2 = {
                    title: {
                        text: '发证蓄积',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: this.setPieData(this.echartListData, 'c_mc', 'test')
                    },
                    series: [
                        {
                            name: '总蓄积',
                            type: 'pie',
                            radius: '55%',
                            center: ['60%', '60%'],
                            data: this.setPieData(this.echartListData, 'c_mc', 'splzl', 'gylzl'),
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };

                myChart1.setOption(option1);
                myChart2.setOption(option2);
            }, 500);
        },
        async getList(parmas = {}) {
            let query = this.mapQuery(this.queryParams);
            const list = await caifazheng(Object.assign({}, query, parmas));

            // let listIndexArr = [];

            // list.map((x, index)=>{
            //     if (x.qi_yuan_mc && x.qi_yuan_mc.indexOf('合计') !== -1) {
            //         listIndexArr.push(index);
            //     }
            // });

            // listIndex = listIndexArr;

            this.listData = list;
            // 设置echarts数据
            let copyEchartListDate = this.listData.filter(x=>{
                if (this.listData[0] && this.listData[0].qi_yuan_mc !== '合计') {
                    return x;
                }
                if (x.qi_yuan_mc === '合计') {return x;}
            });
            console.log(query);
            // 归口单位没有返回最大一级合计
            if (query && query.xzCode && query.xzCode.length === 12) {
                this.echartListData = copyEchartListDate;
                return;
            }
            this.echartListData = copyEchartListDate.splice(1, copyEchartListDate.length);
        },
        handleDaoChuUpdate(data) {
            this.daoChuFormData = data;
        },
        // 查询触发
        handeleQuery() {
            let query = this.mapQuery(this.queryParams);
            this.getList(query);
            if (this.queryParams.contentOption === 'mianji') {
                this.listPropsConfig = cloneDeep(mianJiListPropsConfig);
                this.listShow = false;
                setTimeout(() => {
                    this.listShow = true;
                }, 1000);
            } else {
                this.listPropsConfig = cloneDeep(listPropsConfig);
                this.listShow = false;
                setTimeout(() => {
                    this.listShow = true;
                }, 1000);

            }

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
            });
            return copyQueryParams;
        }
    },
    watch: {}
};
</script>

<template>
  <div>
    <xcy-form :config="filterConfig" :data="queryParams" @input="updateForm"></xcy-form>
    <div style="text-align:right">
      <el-button size="mini" type="primary" style="position: relative;" @click="handeleQuery">查询</el-button>
      <el-button size="mini" type="primary" style="position: relative;" @click="daoChuClick">导出</el-button>
      <el-button size="mini" type="primary" style="position: relative;" @click="setEchartsBar">生成直方图</el-button>
      <el-button size="mini" type="primary" style="position: relative;" @click="setEchartsPie">生成饼图</el-button>
    </div>
    <div class="table-title">单位: 立方米、株</div>
    <xcy-list   :config="listConfig" :data="listData" :props="listPropsConfig" v-if="listShow" />
    <el-dialog :close-on-click-modal="false" :visible.sync="echartsDialogShow" :fullscreen="true">
      <div v-if="echartsDialogShow" id="echartsId" style="width:85%;height:400px;margin:0 auto"></div>
    </el-dialog>

    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="echartsDialogPieShow"
      :fullscreen="true"
    >
      <el-row>
        <el-col :span="12">
          <div v-if="echartsDialogPieShow" id="echartsPie1" style="width:100%;height:400px;"></div>
        </el-col>
        <el-col :span="12">
          <div v-if="echartsDialogPieShow" id="echartsPie2" style="width:100%;height:400px;"></div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<style lang="stylus" scoped>
.container {
  margin: 20px 0;
  padding: 20px;
}

.table-title {
  text-align: right;
  margin-bottom: 4px;
  font-size: 12px;
  padding-top: 20px;
}
</style>
