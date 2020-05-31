<template>
  <div class="main">
    <el-select
      style="width:130px;margin-right:10px"
      v-model="shi"
      placeholder="市"
      @change="changeShi"
      size="small"
      :disabled="this.xzCode.length>2||prop.allDisabled"
    >
      <el-option v-if="(this.xzCode.length===2&&prop.isAllShow!==false)" label="请选择" value="null"></el-option>
      <el-option v-for="(v,k) in shiData" :key="k" :label="v.cmc" :value="v.cfrcode"></el-option>
    </el-select>
    <el-select
      v-model="xian"
      v-if="prop.xianShow!==false"
      style="width:130px;margin-right:10px"
      placeholder="县"
      size="small"
      @change="changeXian"
      :disabled="this.xzCode.length>4||prop.allDisabled"
    >
      <el-option v-if="(shi.length > 0&&prop.isAllShow!==false)" label="请选择" value="null"></el-option>
      <el-option v-for="(v,k) in xianData" :key="k" :label="v.cmc" :value="v.cfrcode"></el-option>
    </el-select>
    <el-select
       v-if="(prop.shiXianShow!==true&&prop.bianXianShow!==false)"
      v-model="bianXian"
      placeholder="编限单位"
      size="small"
      style="width:130px;margin-right:10px"
      @change="changeBianXian"
      :disabled="this.xzCode.length>6||prop.allDisabled"
    >
      <el-option v-if="(xian.length > 0&&prop.isAllShow!==false)" label="请选择" value="null"></el-option>
      <el-option v-for="v in bianXianData" :key="v.cfrcode" :label="v.cmc" :value="v.cfrcode"></el-option>
    </el-select>
    <el-select
    v-if="(prop.shiXianShow!==true&&prop.guiKouShow!==false)"
      style="width:130px;margin-right:10px"
      v-model="guikou"
      placeholder="归口单位"
      size="small"
      :disabled="this.xzCode.length>10||prop.allDisabled"
    >
      <el-option v-if="(bianXian.length > 0&&prop.isAllShow!==false)" label="请选择" value="null"></el-option>
      <el-option
        v-for="item in guikouData"
        :key="item.cfrcode"
        :label="item.cmc"
        :value="item.cfrcode"
      ></el-option>
    </el-select>
     <span style="color:red" v-if="rules">*</span>
  </div>
</template>

<script>
import { getUserDanWeiByXzCode, getXingZhengDanWeiList, getGuikouList, getBianXianList } from './api';
import Storage from '@/common/storage';
import { cloneDeep } from 'lodash';
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
            xzCode: '0',
            shiData: [],
            xianData: [],
            bianXianData: [],
            guikouData: [],
            shi: '',
            xian: '',
            bianXian: '',
            guikou: '',
            // 存在prop.needLabel 时候返回
            needObj: {
                label: [],
                value: ''
            }
        };
    },
    mounted() {
        this.$nextTick(async ()=>{
            setTimeout(async () => {
                const value = this.value.value ? this.value.value : this.value;
                await this.init(value);
                if (value.length === 10) {
                    const shi = value.slice(0, 4);
                    const xian = value.slice(0, 6);
                    const bianXian = value.slice(0, 10);
                    await this.changeShi(shi);
                    await this.changeXian(xian);
                    this.shi = shi;
                    this.xian = xian;
                    this.bianXian = bianXian;
                } else if (value.length === 12) {
                    const shi = value.slice(0, 4);
                    const xian = value.slice(0, 6);
                    const bianXian = value.slice(0, 10);
                    const guikou = value.slice(0, 12);
                    await this.changeShi(shi);
                    await this.changeXian(xian);
                    if (this.prop.guiKouShow !== false) {
                        await this.changeBianXian(bianXian);
                    }
                    this.shi = shi;
                    this.xian = xian;
                    this.bianXian = bianXian;
                    if (this.guikouData.length && this.prop.guiKouShow !== false) {
                        this.guikou = guikou;
                    }
                }
            }, 500);
        });
    },
    computed: {
        listenChange: function () {
            const { shi, xian, bianXian, guikou } = this;
            return { shi, xian, bianXian, guikou };
        },
        rules: function () {
            if (this.prop.rules instanceof Array && this.prop.rules.length && this.prop.rules[0].required === true) {
                return true;
            }
            return false;
        }
    },
    watch: {
        listenChange: function (data, oldData) {
            if (JSON.stringify(data) === JSON.stringify(oldData)) {
                return;
            }
            let valueKeys = ['shi', 'xian', 'bianXian', 'guikou'];
            valueKeys.map(key => {
                const value = data[key];
                if (value && value !== 'null') {
                    if (this.prop.needLabel) {
                        if (value) {
                            const shiValue = value.substring(0, 4);
                            const xianValue = value.substring(0, 6);
                            const bianXianValue = value.substring(0, 10);
                            const guiKouValue = value.substring(0, 12);
                            this.shiData.map(x=>{
                                if (shiValue === x.cfrcode) {
                                    this.needObj.value = x.cfrcode;
                                    this.needObj.label[0] = x.cmc;
                                }
                            });
                            this.xianData.map(x=>{
                                if (xianValue === x.cfrcode) {
                                    this.needObj.value = x.cfrcode;
                                    this.needObj.label[1] = x.cmc;
                                }
                            });


                            this.bianXianData.map(x=>{
                                if (bianXianValue === x.cfrcode) {
                                    this.needObj.value = x.cfrcode;
                                    this.needObj.label[2] = x.cmc;
                                }
                            });
                            this.guikouData.map(x=>{
                                if (guiKouValue === x.cfrcode) {
                                    this.needObj.value = x.cfrcode;
                                    this.needObj.label[3] = x.cmc;
                                }
                            });
                            if (this.shi === 'null') {
                                this.$emit('input', {value: this.xzCode, label: []});
                                this.$emit('change', {value: this.xzCode, label: []});
                            } else {
                                this.$emit('input', this.needObj);
                                this.$emit('change', this.needObj);
                            }
                            return;
                        }
                    }
                    this.$emit('input', value);
                    this.$emit('change', value);

                } else if (value === 'null') {
                    if (this.prop.needLabel) {
                        if (this.shi === 'null') {
                            this.$emit('input', {value: this.xzCode, label: []});
                            this.$emit('change', {value: this.xzCode, label: []});
                        } else if (this.xian === 'null') {
                            let copyObj = cloneDeep(this.needObj);
                            copyObj.label = copyObj.label.slice(0, 1);
                            this.$emit('input', copyObj);
                            this.$emit('change', copyObj);
                        } else if (this.bianXian === 'null') {
                            let copyObj = cloneDeep(this.needObj);
                            copyObj.label = copyObj.label.slice(0, 2);
                            this.$emit('input', copyObj);
                            this.$emit('change', copyObj);
                        } else if (this.guikou === 'null') {
                            let copyObj = cloneDeep(this.needObj);
                            copyObj.label = copyObj.label.slice(0, 3);
                            this.$emit('input', copyObj);
                            this.$emit('change', copyObj);
                        } else {
                            this.$emit('input', this.needObj);
                            this.$emit('change', this.needObj);
                        }
                    } else if (this.shi === 'null') {
                        this.$emit('input', this.xzCode);
                        this.$emit('change', this.xzCode);
                    }
                }
            });
        }
    },
    methods: {
        async init(xzCode) {
            const userInfo = Storage.get('userInfo');
            this.xzCode = userInfo.xzCode;
            const userDanWeiDataList = await getUserDanWeiByXzCode({yongHuXzcode: xzCode ? xzCode : this.xzCode});
            const userDanWeiData = userDanWeiDataList;
            if (userDanWeiData.fu) {
                let value = ['shi', 'xian', 'bianXian', 'guikou'];
                let valueData = ['shiData', 'xianData', 'bianXianData', 'guikouData'];
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
            this.xian = '';
            this.bianXian = '';
            this.guikou = '';
            if (this.prop.isAllShow) {
                this.xian = 'null';
                this.bianXian = 'null';
                if (this.prop.guiKouShow !== false) {
                    this.guikou = 'null';
                }
            }
            let v = [];
            if (value !== 'null') {
                v = await getXingZhengDanWeiList({ cParentcode: value });
            }
            this.xianData = v;
            this.bianXianData = [];
            this.guikouData = [];
        },
        async changeXian(value) {
            this.bianXian = '';
            this.guikou = '';
            if (this.prop.isAllShow) {
                this.bianXian = 'null';
                if (this.prop.guiKouShow !== false) {
                    this.guikou = 'null';
                }
            }
            let v = [];
            if (value !== 'null') {
                v = await getBianXianList({ xianBianMa: value });
            }
            this.bianXianData = v;
            this.guikouData = [];
        },
        async changeBianXian(value) {
            this.guikou = '';
            if (this.prop.isAllShow !== false) {
                if (this.prop.guiKouShow !== false && !this.value) {
                    this.guikou = 'null';
                }
            }
            let v = [];
            if (value !== 'null' && this.prop.guiKouShow !== false) {
                v = await getGuikouList({ bianXianDw: value });
            }
            this.guikouData = v;
        }
    },
    async created() {
        if (!this.value) {
            this.init();
        }
    }
};
</script>

<style scoped>
</style>
