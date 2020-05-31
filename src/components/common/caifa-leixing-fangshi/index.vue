<template>
  <div>
    <!-- <el-form-item style="margin:0"> -->
      <el-row :style="prop.itemStyle" :gutter="1">
        <el-col :span="12">
          <el-select  :style="prop.inputStyle||{}" v-model="caiFa.fuBm" placeholder="请选择采伐类型" @change="changeLeiXing">
            <el-option label="请选择" value="null" v-if="prop.isAllShow!==false"></el-option>
            <el-option
              v-for="(v,key) in caiFaLeiXing"
              :key="key"
              :label="v.mingCheng"
              :value="v.bianMa"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="12">
          <el-row :style="prop.itemStyle" :gutter="1">
            <el-col :span="12">
          <el-select :style="prop.inputStyle||{}" v-model="caiFa.ziBm" style="margin-right:10px" placeholder="请选择采伐方式">
            <el-option
              v-for="(v,k) in caiFaFangShi"
              :key="k"
              :label="v.mingCheng"
              :value="v.bianMa"
            ></el-option>
          </el-select>
            </el-col>
            <el-col :span="12"> <span style="color:red" v-if="rules">*</span></el-col>
          </el-row>
        </el-col>
      </el-row>
    <!-- </el-form-item> -->
  </div>
</template>

<script>
import { getCaiFaLeiXingList, getCaiFangShiList } from './api';
import { cloneDeep } from 'lodash';
export default {
    name: 'index',
    props: {
        value: {
            type: [Object, Array],
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
            caiFa: {
                fuMc: '',
                fuBm: '',
                ziMc: '',
                ziBm: ''
            },
            // caiFa: [],
            caiFaLeiXing: [],
            caiFaFangShi: [],
            isNewest: false
        };
    },
    computed: {
        rules: function () {
            if (this.prop.rules instanceof Array && this.prop.rules.length && this.prop.rules[0].required === true) {
                return true;
            }
            return false;
        },
        newCaiFa: function () {
            return JSON.parse(JSON.stringify(this.caiFa));
        }
    },
    watch: {
        newCaiFa: {
            async handler(value, oldValue) {
                if (JSON.stringify(value) === JSON.stringify(oldValue)) { return; }
                if (value.fuBm === 'null') { return; }
                if (!this.caiFaLeiXing.length || !this.caiFaFangShi.length) {
                    await this.sleep(5000);
                }
                let fuArr = cloneDeep(this.caiFaLeiXing);
                let ziArr = cloneDeep(this.caiFaFangShi);
                let fuObj = {};
                let ziObj = {};
                if (value.fuBm && fuArr.length) {
                    fuObj = fuArr.find(x=>{
                        if (value.fuBm === x.bianMa) {return x.bianMa;} return '';
                    });
                }
                if (value.ziBm && ziArr.length) {
                    ziObj = ziArr.find(x=>{
                        if (value.ziBm === x.bianMa) {return x.bianMa;} return '';
                    });
                }
                let obj = {
                    fuMc: fuObj.mingCheng,
                    fuBm: fuObj.bianMa,
                    ziMc: ziObj.mingCheng || this.caiFa.ziMc,
                    ziBm: ziObj.bianMa || this.caiFa.ziBm
                };
                this.$emit('input', obj);
                this.$emit('change', obj);
            },
            deep: true
        },
        value: {
            handler: async function (value) {
                if (JSON.stringify(value) === JSON.stringify(this.caiFa)) {
                    return;
                }
                if (value.fuBm && value.ziBm) {
                    let v = await getCaiFangShiList({ fuBianMa: value.fuBm });
                    this.caiFaFangShi = v;
                }
                this.caiFa = value;
            },
            deep: true
        }
    },
    methods: {
    // init
        async init() {
            let v = await getCaiFaLeiXingList();
            this.caiFaLeiXing = v;
        },
        // 采伐类型变化 更新方式
        async changeLeiXing(value) {
            if (value === 'null') {this.caiFa.ziBm = ''; return; }
            let v = await getCaiFangShiList({ fuBianMa: value });
            this.caiFaFangShi = v;
            let copyCaiFa = cloneDeep(this.caiFa);
            copyCaiFa.ziBm = v[0].bianMa;
            this.caiFa = copyCaiFa;
        },
        async sleep(timeout) {
            return new Promise((resole)=>{
                setTimeout(() => {
                    resole();
                }, timeout);
            });
        }
    },
    async created() {
        this.init();
    }
};
</script>

<style scoped>
</style>
