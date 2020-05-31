<template>
  <div class="container">
    <div>
      <el-table :data="list" width="100%" border>
        <el-table-column align="center" label="树种">
          <template slot-scope="scope">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-select style="width:150px" v-model="scope.row.shuZhong[0]" @change="changeShuZhong">
                  <el-option
                    v-for="(v,k) in shuZhongFu"
                    :key="k"
                    :label="v.mingCheng"
                    :value="v.bianMa"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="12">
                <el-select style="width:150px" v-model="scope.row.shuZhong[1]">
                  <el-option
                    :key="k"
                    v-for="(v,k) in shuZhongZi"
                    :label="v.mingCheng"
                    :value="v.bianMa"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column align="center" label="积蓄(立方米)">
          <el-table-column prop="name" align="center" label="商品材" width="150">
            <template slot-scope="scope">
              <el-row>
                <el-col :span="24">
                  <el-input style="width:90%" v-model="scope.row.jiXu.shangPinCai" :disabled="isZhuCai"></el-input>
                  <span style="color:#F56C6C;width:5%;margin-left:3%" v-if="!isZhuCai">*</span>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="name" label="非商品材" width="150">
            <template slot-scope="scope">
              <el-row>
                <el-col :span="24">
                  <el-input style="width:90%" v-model="scope.row.jiXu.feiShangPinCai" :disabled="isZhuCai"></el-input>
                  <span style="color:#F56C6C;width:5%;margin-left:3%" v-if="!isZhuCai">*</span>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" width="100" label="株数">
          <template slot-scope="scope">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-input v-model="scope.row.zhuShu"></el-input>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column align="center" label="出材(立方米)">
          <el-table-column align="center" prop="name" label="商品材" width="150">
            <template slot-scope="scope">
              <el-row>
                <el-col :span="24">
                  <el-input style="width:90%" v-model="scope.row.chuCai.shangPinCai" :disabled="isZhuCai"></el-input>
                  <span style="color:#F56C6C;width:5%;margin-left:3%" v-if="!isZhuCai">*</span>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="name" label="非商品材" width="150">
            <template slot-scope="scope">
              <el-row>
                <el-col :span="24">
                  <el-input style="width:90%" v-model="scope.row.chuCai.feiShangPinCai" :disabled="isZhuCai"></el-input>
                  <span style="color:#F56C6C;width:5%;margin-left:3%" v-if="!isZhuCai">*</span>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="add(scope.$index, scope.row)">增加树种</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer" style="padding-top:100px" v-if="saveTableShow">
      <el-table :data="saveTableData" style="width:100%" border>
        <el-table-column align="center" prop="shuZhongZiMingCheng" label="树种"></el-table-column>
        <el-table-column align="center" prop="shangPinCaiJiXu" label="商品材蓄积(m³)"></el-table-column>
        <el-table-column align="center" prop="feiShangPinCaiJiXu" label="非商品材蓄积(m³)"></el-table-column>
        <el-table-column align="center" prop="zhuShu" label="株数" width="130"></el-table-column>
        <el-table-column align="center" prop="shangPinCaiChuCaiLiang" label="商品材出材量(m³)"></el-table-column>
        <el-table-column align="center" prop="feiShangPinCaiChuCaiLiang" label="非商品材出材量(m³)"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getShuZhongFuList, getShuZhongZiList } from './api';
export default {
    name: 'XyiBanShuZhongTable',
    props: {
        value: {
            type: [Array, Object],
            default() {
                return {};
            }
        },
        data: {
            type: Object,
            default() {
                return {};
            }
        },
        prop: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data() {
        return {
            list: [{
                shuZhong: [],
                zhuShu: 0,
                jiXu: {
                    shangPinCai: 0,
                    feiShangPinCai: 0
                },
                chuCai: {
                    shangPinCai: 0,
                    feiShangPinCai: 0
                }
            }],
            shuZhongFu: [],
            shuZhongZi: [],
            saveTableShow: false,
            // 已保存树种
            saveTableData: [],
            rules: {}
        };
    },
    created() {
        this.init();
    },
    methods: {
        async init() {
            let v = await getShuZhongFuList({isZhuCai: 0});
            this.shuZhongFu = v;
            this.list[0].shuZhong[0] = v[0].bianMa;
            this.changeShuZhong(v[0].bianMa);
        },
        // 树种一级变化
        async changeShuZhong(value) {
            let v = await getShuZhongZiList({ fuBianMa: value });
            this.shuZhongZi = v;
            this.list[0].shuZhong[1] = v[0].bianMa;
        },
        add() {
            let isTure = true;
            let chuCaiNum = 0;
            let jiXuNum = 0;
            let msg = '';
            if (!this.isZhuCai) {
                for (const x in this.list[0].jiXu) {
                    if (this.list[0].jiXu[x] === '') {
                        isTure = false;
                        break;
                    }
                    jiXuNum += Number(this.list[0].jiXu[x]);
                }
                for (const x in this.list[0].chuCai) {
                    if (this.list[0].chuCai[x] === '') {
                        isTure = false;
                        break;
                    }
                    chuCaiNum += Number(this.list[0].chuCai[x]);
                }
                // let reg = new RegExp('/^(([1-9][0-9]*)|(([0]\.\d{2}|[1-9][0-9]*\.\d{2})))$/');
                // if (reg.test(this.list[0].zhuShu)) {
                //     msg = '请输入正确格式株数';
                // }
                // if (reg.test(this.list[0].jiXu.shangPinCai)) {
                //     msg = '请输入正确格式积蓄商品材';
                // }
                // if (reg.test(this.list[0].jiXu.feiShangPinCai)) {
                //     msg = '请输入正确格式积蓄非商品材';
                // }
                // if (reg.test(this.list[0].chuCai.shangPinCai)) {
                //     msg = '请输入正确格式出材商品材';
                // }
                // if (reg.test(this.list[0].chuCai.feiShangPinCai)) {
                //     msg = '请输入正确格式出材非商品材';
                // }

                if ( chuCaiNum > jiXuNum) {
                    isTure = false;
                    msg = '商品材非商品材出材总量不能大于蓄积总量！';
                }
            }

            if (!isTure) {
                this.$notify({
                    title: '添加失败',
                    type: 'error',
                    message: msg ? msg : '商品材或非常品材不能为空'
                });
                return;
            }
            let shuZhongZiMingCheng = '';
            let shuZhongFuMingCheng = '';
            this.shuZhongZi.map(x => {
                if (x.bianMa === this.list[0].shuZhong[1]) {
                    shuZhongZiMingCheng = x.mingCheng;
                }
            });
            this.shuZhongFu.map(x => {
                if (x.bianMa === this.list[0].shuZhong[0]) {
                    shuZhongFuMingCheng = x.mingCheng;
                }
            });
            let obj = {
                shuZhongFuDm: this.list[0].shuZhong[0],
                shuZhongFuMingCheng: shuZhongFuMingCheng,
                shuZhongZiDm: this.list[0].shuZhong[1],
                shuZhongZiMingCheng: shuZhongZiMingCheng,
                shangPinCaiJiXu: this.list[0].jiXu.shangPinCai,
                feiShangPinCaiJiXu: this.list[0].jiXu.feiShangPinCai,
                zhuShu: this.list[0].zhuShu,
                shangPinCaiChuCaiLiang: this.list[0].chuCai.shangPinCai,
                feiShangPinCaiChuCaiLiang: this.list[0].chuCai.feiShangPinCai
            };
            this.saveTableData.push(obj);
            this.saveTableShow = true;
            // 还原数据
            this.list = [{
                shuZhong: [],
                zhuShu: 0,
                jiXu: {
                    shangPinCai: 0,
                    feiShangPinCai: 0
                },
                chuCai: {
                    shangPinCai: 0,
                    feiShangPinCai: 0
                }
            }];
            // 树种还原
            this.init();
        },
        handleDelete(index) {
            this.saveTableData.splice(index, 1);
            if (this.saveTableData.length === 0) {
                this.saveTableShow = false;
            }
        }
    },
    computed: {
        isZhuCai: function () {
            if (this.prop.isZhuCai) {return true;}
            return false;
        }
    },
    watch: {
        saveTableData: {
            handler(value) {
                this.$emit('input', value);
                this.$emit('change', value);
            },
            deep: true
        },
        value: async function (value) {
            if (JSON.stringify(value) === JSON.stringify(this.saveTableData)) {return;}
            this.saveTableData = value;
            this.saveTableShow = true;
            this.list = [{
                shuZhong: [],
                zhuShu: 0,
                jiXu: {
                    shangPinCai: 0,
                    feiShangPinCai: 0
                },
                chuCai: {
                    shangPinCai: 0,
                    feiShangPinCai: 0
                }
            }];
        },
        isZhuCai: function (value) {
            if (value === true) {
                getShuZhongFuList({isZhuCai: 1}).then(v=>{
                    this.shuZhongFu = v;
                    this.list[0].shuZhong[0] = v[0].bianMa;
                    this.changeShuZhong(v[0].bianMa);
                });
            } else {
                getShuZhongFuList({isZhuCai: 0}).then(v=>{
                    this.shuZhongFu = v;
                    this.list[0].shuZhong[0] = v[0].bianMa;
                    this.changeShuZhong(v[0].bianMa);
                });
            }
        }
    }
};
</script>
<style scoped lang='stylus'>
.container
  width 100%
</style>
