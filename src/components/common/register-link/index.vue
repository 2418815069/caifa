<!--
 * @Description: 组册页面的联动选择器
 -->
<template>
  <div class="main">
      <div>
            <div class="controlName">
                {{prop.controlName||'用户所在行政级别:'}}
            </div>
            <el-select v-model="registerLink.yongHuLx" placeholder="请选择">
                <el-option
                v-for="item in yongHuLxOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
      </div>
      <div class="select-c">
            <div class="controlName">
                {{prop.runName||'所属区域:'}}
            </div>
            <el-select v-if="+registerLink.yongHuLx > 1" class="register-select" v-model="registerLink.shi" placeholder="请选择市">
                <el-option
                v-for="item in shiOptions"
                :key="item.cfrcode"
                :label="item.cmc"
                :value="item.cfrcode">
                </el-option>
            </el-select>
            <el-select v-if="+registerLink.yongHuLx > 2" class="register-select" v-model="registerLink.xian" placeholder="请选择县">
                <el-option
                v-for="item in xianOptions"
                :key="item.cfrcode"
                :label="item.cmc"
                :value="item.cfrcode">
                </el-option>
            </el-select>
            <el-select v-if="+registerLink.yongHuLx > 3" class="register-select" v-model="registerLink.bianxian" placeholder="请选择编限">
                <el-option
                v-for="item in bianxianOptions"
                :key="item.cfrcode"
                :label="item.cmc"
                :value="item.cfrcode">
                </el-option>
            </el-select>
            <el-select v-if="+registerLink.yongHuLx > 3" class="register-select" v-model="registerLink.xiang" placeholder="请选择乡镇">
                <el-option
                v-for="item in xiangOptions"
                :key="item.cfrcode"
                :label="item.cmc"
                :value="item.cfrcode">
                </el-option>
            </el-select>
      </div>
  </div>
</template>

<script>
import { getXingZhengDanWeiList, getBianXianList, getGuikouList } from './api';
import { cloneDeep } from 'lodash';
import {
    getprovinceConfig
} from '@/common/util';
export default {
    name: 'register-link',
    props: {
        value: {
            type: [Object],
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
    async mounted() {
        const provinceData = await getprovinceConfig();
        const options = await getXingZhengDanWeiList({ cParentcode: provinceData.provinceCode });
        this.shiOptions = options;
    },
    data() {
        return {
            yongHuLxOptions: [{
                label: '省',
                value: '1'
            }, {
                label: '市',
                value: '2'
            }, {
                label: '县',
                value: '3'
            }, {
                label: '乡镇',
                value: '4'
            }],
            registerLink: cloneDeep(this.value),
            shiOptions: [],
            xianOptions: [],
            bianxianOptions: [],
            xiangOptions: []
        };
    },
    computed: {
        rules: function () {
            if (this.prop.rules instanceof Array && this.prop.rules.length && this.prop.rules[0].required === true) {
                return true;
            }
            return false;
        }
    },
    async created() {
    },
    methods: {
    },
    watch: {
        'registerLink.yongHuLx': function (val) {
            this.registerLink = {
                yongHuLx: val
            };
        },
        'registerLink.shi': async function (val) {
            const options = await getXingZhengDanWeiList({ cParentcode: val });
            this.xianOptions = options;
            this.registerLink = {
                yongHuLx: this.registerLink.yongHuLx,
                shi: val
            };
        },
        'registerLink.xian': async function (val) {
            const options = await getBianXianList({ xianBianMa: val });
            this.bianxianOptions = options;
            this.registerLink = {
                yongHuLx: this.registerLink.yongHuLx,
                shi: this.registerLink.shi,
                xian: val
            };
        },
        'registerLink.bianxian': async function (val) {
            const options = await getGuikouList({ bianXianDw: val });
            this.xiangOptions = options;
            this.registerLink = {
                yongHuLx: this.registerLink.yongHuLx,
                shi: this.registerLink.shi,
                xian: this.registerLink.xian,
                bianxian: val
            };
        },
        'registerLink': function (val) {
            this.$emit('input', val);
            this.$emit('change', val);
        },
        'value': function (val, oldValue) {
            if (JSON.stringify(val) === JSON.stringify(oldValue)) { return; }
            this.registerLink = val;
        }
    }
};
</script>
<style scoped>
.controlName {
    padding: 10px 0;
    padding-right: 30px;
    display: inline-block;
    color: #606266
}
.register-select {
    display: inline-block;
    padding-bottom: 8px;
    margin-right: 8px
}
.select-c {
    width: 700px;
}
</style>
