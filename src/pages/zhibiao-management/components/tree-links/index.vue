<template>
  <div class="main">
    <el-select
      style="width:130px;margin-right:10px"
      v-model="shi"
      placeholder="市"
      @change="changeShi"
      :disabled="this.xzCode.length>2"
    >
      <el-option v-if="this.xzCode.length===2" label="请选择" value="null"></el-option>
      <el-option v-for="(v,k) in shiData" :key="k" :label="v.cmc" :value="v.cfrcode"></el-option>
    </el-select>
    <el-select
      v-model="xian"
      style="width:130px;margin-right:10px"
      placeholder="县"
      @change="changeXian"
      :disabled="this.xzCode.length>4"
    >
      <el-option v-if="shi.length > 0" label="请选择" value="null"></el-option>
      <el-option v-for="(v,k) in xianData" :key="k" :label="v.cmc" :value="v.cfrcode"></el-option>
    </el-select>
    <el-select
      v-if="level >= 3"
      v-model="bianXian"
      placeholder="编限单位"
      style="width:130px;margin-right:10px"
      :disabled="this.xzCode.length>6"
    >
      <el-option v-if="xian.length > 0" label="请选择" value="null"></el-option>
      <el-option v-for="v in bianXianData" :key="v.cfrcode" :label="v.cmc" :value="v.cfrcode"></el-option>
    </el-select>
  </div>
</template>

<script>
import { getUserDanWeiByXzCode, getXingZhengDanWeiList, getBianXianList } from './api';
import Storage from '@/common/storage';
const provinceData = Storage.get('provinceData');
const userInfo = Storage.get('userInfo');
export default {
    name: 'Xdanwei',
    props: {
        value: {
            type: [String, Number],
            default: ''
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
        let shi = '';
        let xian = '';
        let bianXian = '';
        if (this.value) {
            if (this.value.length === 4) {
                shi = this.value.slice(0, 4);
            }
            if (this.value.length === 6) {
                xian = this.value.slice(0, 6);
            }
            if (this.value.length === 10) {
                bianXian = this.value.slice(0, 10);
            }
        }
        return {
            xzCode: userInfo.xzCode || provinceData.provinceCode,
            shiData: [],
            xianData: [],
            bianXianData: [],
            shi,
            xian,
            bianXian,
            level: this.prop.level || 3
        };
    },
    computed: {
        listenChange: function () {
            const { shi, xian, bianXian } = this;
            return { shi, xian, bianXian };
        }
    },
    watch: {
        listenChange: function (value) {
            let valueKeys = ['shi', 'xian', 'bianXian'];
            for (let index = 0; index <= valueKeys.length - 1; index++) {
                let key = valueKeys[index];
                if (index === 0 && value[key] === 'null') {
                    this.$emit('input', userInfo.xzCode || provinceData.provinceCode);
                    this.$emit('change', userInfo.xzCode || provinceData.provinceCode,);
                    return;
                }
                if (index === 1 && value[key] === 'null') {
                    this.$emit('input', value.shi);
                    this.$emit('change', value.shi);
                    return;
                }
                if (index === 2 && value[key] === 'null') {
                    this.$emit('input', value.xian);
                    this.$emit('change', value.xian);
                    return;
                }
                if (value[key] && value[key] !== 'null') {
                    this.$emit('input', value[key]);
                    this.$emit('change', value[key]);
                }
            }
        }
    },
    methods: {
        async init() {
            this.xzCode = Storage.get('userInfo').xzCode;
            const userDanWeiDataList = await getUserDanWeiByXzCode();
            const userDanWeiData = userDanWeiDataList;
            if (userDanWeiData.fu) {
                let value = ['shi', 'xian', 'bianXian'];
                let valueData = ['shiData', 'xianData', 'bianXianData'];
                value.map((item, index) => {
                    if (userDanWeiData.fu[item]) {
                        this[item] = userDanWeiData.fu[item].cfrcode;
                        this[valueData[index]] = [userDanWeiData.fu[item]];
                    }
                });
            }
            if (this.xzCode.length === 2) {
                this.shiData = userDanWeiData.zi;
            }
            if (this.xzCode.length === 4) {
                this.xianData = userDanWeiData.zi;
            }
            if (this.xzCode.length === 6) {
                this.bianXianData = userDanWeiData.zi;
            }
        },
        async changeShi(value) {
            this.xian = 'null';
            let v = [];
            if (value !== 'null') {
                v = await getXingZhengDanWeiList({ cParentcode: value });
            }
            this.xianData = v;
            this.changeXian();
        },
        async changeXian(value) {
            this.bianXian = 'null';
            let v = [];
            if (value !== 'null') {
                v = await getBianXianList({ xianBianMa: value });
            }
            this.bianXianData = v;
        }
    },
    async created() {
        this.init();
    },
    mounted() {
        this.$nextTick(async () => {
            if (this.value.length > 2) {
                const shi = this.value.slice(0, 4);
                const xian = this.value.slice(0, 6);
                await this.changeShi(shi);
                await this.changeXian(xian);
                this.shi = shi;
                this.xian = xian;
            }
        });
    }
};
</script>

<style scoped>
</style>
