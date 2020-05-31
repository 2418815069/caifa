<template>
  <div>
    <el-form-item style="margin:0">
      <el-row :style="prop.itemStyle" :gutter="1">
        <el-col :span="12">
          <el-select style="width:192px" v-model="shuZhong.fuBm" placeholder="请选择" @change="changeShuZhong" :style="prop.inputStyle||{}">
            <el-option v-for="(v,k) in shuZhongFu" :key="k" :label="v.mingCheng" :value="v.bianMa"></el-option>
          </el-select>
        </el-col>
        <el-col :span="12">
          <el-row :style="prop.itemStyle" :gutter="1">
            <el-col :span="12">
          <el-select style="width:192px;margin-right:10px" v-model="shuZhong.ziBm"  placeholder="请选择" :style="prop.inputStyle||{}">
            <el-option :key="k" v-for="(v,k) in shuZhongZi" :label="v.mingCheng" :value="v.bianMa"></el-option>
          </el-select>
          </el-col>
          <el-col :span="12"> <span style="color:red" v-if="rules">*</span></el-col>
         </el-row>
        </el-col>
      </el-row>
    </el-form-item>
  </div>
</template>

<script>
import { getShuZhongFuList, getShuZhongZiList } from './api';
import { cloneDeep } from 'lodash';
export default {
    name: 'XshuZhong',
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
            shuZhong: {
                fuMc: '',
                fuBm: '',
                ziMc: '',
                ziBm: ''
            },
            shuZhongFu: [],
            shuZhongZi: [],
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
        newShuZhong: function () {
            return JSON.parse(JSON.stringify(this.shuZhong));
        }
    },
    watch: {
        newShuZhong: {
            async handler(value, oldValue) {
                if (JSON.stringify(value) === JSON.stringify(oldValue)) {
                    return;
                }
                if (!this.shuZhongFu.length || !this.shuZhongZi.length) {
                    await this.sleep(5000);
                }
                let fuArr = cloneDeep(this.shuZhongFu);
                let ziArr = cloneDeep(this.shuZhongZi);
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
                    ziMc: ziObj.mingCheng || this.shuZhong.ziMc,
                    ziBm: ziObj.bianMa || this.shuZhong.ziBm
                };
                this.$emit('input', obj);
                this.$emit('change', obj);
            },
            deep: true
        },
        value: {
            handler: async function (value) {
                if (JSON.stringify(value) === JSON.stringify(this.shuZhong)) {
                    return;
                }
                if (value.fuBm && value.ziBm) {
                    let v = await getShuZhongZiList({ fuBianMa: value.fuBm });
                    this.shuZhongZi = v;
                }
                this.shuZhong = value;
            },
            deep: true
        }
    },
    methods: {
    // init
        async init() {
            let v = await getShuZhongFuList();
            this.shuZhongFu = v;
        },
        // 树种一级变化
        async changeShuZhong(value) {
            if (String(value) === 'null') {
                this.shuZhong.ziBm = '';
            }
            let v = await getShuZhongZiList({ fuBianMa: value });
            this.shuZhongZi = v;
            let copyShuZhong = cloneDeep(this.shuZhong);
            copyShuZhong.ziBm = v[0].bianMa;
            this.shuZhong = copyShuZhong;
        },
        async sleep(timeout) {
            return new Promise((resole)=>{
                setTimeout(() => {
                    resole();
                }, timeout);
            });
        }
    },
    async mounted() {
    },
    async created() {
        this.init();
    }
};
</script>

<style scoped>
</style>
