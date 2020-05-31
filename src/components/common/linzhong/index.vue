<template>
  <div>
    <el-form-item style="margin:0">
      <el-row :style="prop.itemStyle" :gutter="1">
        <el-col :span="12">
          <el-select style="width:192px"  v-model="linZhong.fuBm" placeholder="请选择" :style="prop.inputStyle||{}"  @change="changeLinZhong">
            <el-option v-for="(v,k) in linZhongFu" :key="k" :label="v.mingCheng" :value="v.bianMa"></el-option>
          </el-select>
        </el-col>
        <el-col :span="12">
          <el-row :style="prop.itemStyle" :gutter="1">
            <el-col :span="12">
          <el-select  style="width:192px" v-model="linZhong.ziBm" :style="prop.inputStyle||{}" placeholder="请选择">
            <el-option v-for="(v,k) in linZhongZi" :key="k" :label="v.mingCheng" :value="v.bianMa"></el-option>
          </el-select>
          </el-col>
          <el-col :span="12"><span style="color:red" v-if="rules">*</span></el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-form-item>
  </div>
</template>

<script>
import { getLinZhongList, getLinZhongZiList } from './api';
import { cloneDeep } from 'lodash';
export default {
    name: 'XlinZhong',
    props: {
        value: {
            type: Object,
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
            linZhong: {
                fuMc: '',
                fuBm: '',
                ziMc: '',
                ziBm: ''
            },
            linZhongFu: [],
            linZhongZi: [],
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
        newLinZhong: function () {
            return JSON.parse(JSON.stringify(this.linZhong));
        }
    },
    watch: {
        newLinZhong: {
            async handler(value, oldValue) {
                if (JSON.stringify(value) === JSON.stringify(oldValue)) { return; }
                if (!this.linZhongFu.length || !this.linZhongZi.length) {
                    await this.sleep(5000);
                }
                let fuArr = cloneDeep(this.linZhongFu);
                let ziArr = cloneDeep(this.linZhongZi);
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
                    ziMc: ziObj.mingCheng || this.linZhong.ziMc,
                    ziBm: ziObj.bianMa || this.linZhong.ziBm
                };
                this.$emit('input', obj);
                this.$emit('change', obj);
            },
            deep: true
        },
        value: {
            handler: async function (value) {
                if (JSON.stringify(value) === JSON.stringify(this.linZhong)) {
                    return;
                }
                if (value.fuBm && value.ziBm) {
                    this.isNewest = true;
                    let v = await getLinZhongZiList({ fuBianMa: value.fuBm });
                    this.linZhongZi = v;
                }
                this.linZhong = value;
            },
            deep: true
        }
    },
    methods: {
    // init
        async init() {
            let v = await getLinZhongList();
            this.linZhongFu = v;
        },
        //  林种一级变化
        async changeLinZhong(value) {
            if (String(value) === 'null') {
                this.linZhong.ziBm = '';
            }
            let v = await getLinZhongZiList({ fuBianMa: value });
            this.linZhongZi = v;
            let copyLinZhong = cloneDeep(this.linZhong);
            copyLinZhong.ziBm = v[0].bianMa;
            this.linZhong = copyLinZhong;
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
