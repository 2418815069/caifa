<template>
  <div class="main">
    <el-select
      v-if="level >= 1"
      style="width:130px;margin-right:10px"
      v-model="shi"
      @change="shiChange"
      placeholder="市"
      size="small"
    >
        <el-option
            v-for="(item,key) in shiOptions"
            :key="key"
            :label="item.xzName"
            :value="item.xzCode">
        </el-option>
    </el-select>
    <el-select
      v-if="level >= 2"
      style="width:130px;margin-right:10px"
      v-model="xian"
      @change="xianChange"
      placeholder="区/县"
      size="small"
    >
        <el-option
            v-for="(item,key) in xianOptions"
            :key="key"
               :label="item.xzName"
            :value="item.xzCode">
        </el-option>
    </el-select>
    <el-select
      v-if="level >= 3"
      style="width:130px;margin-right:10px"
      v-model="xiang"
      placeholder="乡镇"
      @change="xiangChange"
      size="small"
    >
        <el-option
            v-for="(item,key) in xiangOptions"
            :key="key"
               :label="item.xzName"
            :value="item.xzCode">
        </el-option>
    </el-select>
    <el-select
      v-if="level >= 4"
      style="width:130px;margin-right:10px"
      v-model="cun"
      placeholder="村"
      @change="cunChange"
      size="small"
    >
        <el-option
            v-for="(item,key) in cunOptions"
            :key="key"
               :label="item.xzName"
            :value="item.xzCode">
        </el-option>
    </el-select>
  </div>
</template>

<script>
import { getShiArr, getXianArr, getXiangArr, getCunArr, getcurrentXzCode } from './api';
import Storage from '@/common/storage';
export default {
    name: 'Xdanwei',
    props: {
        value: {
            type: [String, Object],
            default() {
                return '';
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
            level: this.prop.level || 5,
            xzCode: '0',
            shiOptions: [],
            xianOptions: [],
            xiangOptions: [],
            cunOptions: [],

            shi: '',
            xian: '',
            xiang: '',
            cun: ''
        };
    },
    mounted() {
    },
    async created() {
        // const userInfo = Storage.get('userInfo');
        // this.xzCode = userInfo.xzCode;
        // this.getShiOptions();
        // let v = await getcurrentXzCode();
        // console.log(66);
        // console.log(v);
        // 初始化
        this.initXingZheng();
    },
    computed: {
    },
    watch: {
    },
    methods: {
        // test
        async initXingZheng() {
            let xzq = await getcurrentXzCode();
            if (xzq.length === 1) {
                this.getShiOptions();
            } else if (xzq.length === 2) {
                this.shiOptions = [{xzCode: xzq[1].ccode, xzName: xzq[1].cmc}];
                this.shi = xzq[1].ccode;
                this.shiChange(this.shi);
            } else if (xzq.length === 3) {
                this.shiOptions = [{xzCode: xzq[1].ccode, xzName: xzq[1].cmc}];
                this.shi = xzq[1].ccode;
                this.xianOptions = [{xzCode: xzq[2].ccode, xzName: xzq[2].cmc}];
                this.xian = xzq[2].ccode;
                this.xianChange(this.xian);
            } else if (xzq.length === 4) {
                this.shiOptions = [{xzCode: xzq[1].ccode, xzName: xzq[1].cmc}];
                this.shi = xzq[1].ccode;
                this.xianOptions = [{xzCode: xzq[2].ccode, xzName: xzq[2].cmc}];
                this.xian = xzq[2].ccode;
                this.xiangOptions = [{xzCode: xzq[3].ccode, xzName: xzq[3].cmc}];
                this.xiang = xzq[3].ccode;
                this.xiangChange(this.xiang);
            }
        },
        async shiChange(val) {
            this.xian = '';
            this.xiang = '';
            this.cun = '';
            const options = await getXianArr({
                pcode: val
            }) || [];
            options.unshift({xzCode: '', xzName: '请选择'});
            this.xianOptions = options;

            this.$emit('change', {
                shi: val
            });
            this.$emit('input', {
                shi: val
            });
        },
        // 0 未读取 1已读取
        async xianChange(val) {
            this.xiang = '';
            this.cun = '';
            const options = await getXiangArr({
                pcode: val
            }) || [];
            options.unshift({xzCode: '', xzName: '请选择'});
            this.xiangOptions = options;
            console.log('6');
            console.log(this.xiangOptions);

            this.$emit('input', {
                shi: this.shi,
                xian: val
            });

            this.$emit('change', {
                shi: this.shi,
                xian: val
            });
        },

        async xiangChange(val) {
            this.cun = '';
            const options = await getCunArr({
                tcode: this.xian,
                pcode: val
            }) || [];
            // xzName xzCode
            options.unshift({xzCode: '', xzName: '请选择'});
            this.cunOptions = options;

            this.$emit('input', {
                shi: this.shi,
                xian: this.xian,
                xiang: val
            });

            this.$emit('change', {
                shi: this.shi,
                xian: this.xian,
                xiang: val
            });
        },

        async cunChange(val) {
            this.$emit('input', {
                shi: this.shi,
                xian: this.xian,
                xiang: this.xiang,
                cun: val
            });
            this.$emit('change', {
                shi: this.shi,
                xian: this.xian,
                xiang: this.xiang,
                cun: val
            });
        },


        // 获取市
        async getShiOptions() {
            const options = await getShiArr({
                pcode: '330000'
            }) || [];
            this.shiOptions = options;
        },

        // 获取绑定文字 ['浙江省','丽水市','缙云县','集体及','五云街道']
        async getLabelArr() {
            let labelArr = [];
            if (this.shi) {
                labelArr[0] = this.getLabelText(this.shiOptions, this.shi);
            }
            if (this.xian) {
                labelArr[1] = this.getLabelText(this.xianOptions, this.xian);
            }
            if (this.xiang) {
                labelArr[2] = this.getLabelText(this.xiangOptions, this.xiang);
            }
            if (this.cun) {
                labelArr[3] = this.getLabelText(this.cunOptions, this.cun);
            }
        },
        getLabelText(labelArr, value) {
            let labelStr = '';
            for (let index = 0; index < labelArr.length; index++) {
                const element = labelArr[index];
                if (element.cfrcode === value) {
                    labelStr = element.cmc;
                    break;
                }
            }
            return labelStr;
        }
    }
};
</script>

<style scoped>
</style>
