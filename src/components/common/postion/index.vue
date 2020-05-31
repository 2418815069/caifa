<template>
  <div>
    <el-form-item label="行政单位">
      <el-row :gutter="1">
        <el-col :span="8">
          <el-select v-model="sheng" placeholder="省级地区" @change="changeSheng" disabled>
            <el-option v-for="(v, k) in shengData" :key="k" :label="v" :value="k"></el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-select v-model="shi" placeholder="市级地区" @change="changeShi" :disabled="this.disableCode.length >= 6">
            <el-option v-if="sheng.length > 0" label="请选择" value='null'></el-option>
            <el-option v-for="(v, k) in shiData" :key="k" :label="v" :value="k"></el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-select v-model="xian" placeholder="县级地区" @change="changeXian" :disabled="this.disableCode.length >= 8">
            <el-option v-if="shi.length > 0" label="请选择" value='null'></el-option>
            <el-option v-for="(v, k) in xianData" :key="k" :label="v" :value="k"></el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-select v-model="zheng" placeholder="办证点" @change="changeZheng">
            <el-option v-if="xian.length > 0" label="请选择" value='null'></el-option>
            <el-option v-for="item in zhengData" :key="item.xz_code" :label="item.ban_zheng_dmc" :value="item.xz_code"></el-option>
          </el-select>
        </el-col>
      </el-row>
    </el-form-item>
  </div>
</template>

<script>
import {getXzCode, getBanZhengDian} from '@/api';
import Storage from '@/common/storage';
const all = 'null';
export default {
    name: 'index',
    data() {
        return {
            disableCode: '',
            xzCode: {},
            shengData: [],
            shiData: [],
            xianData: [],
            zhengData: [],
            sheng: '',
            shi: '',
            xian: '',
            zheng: null
        };
    },
    computed: {
        userInfo() {
            return Storage.get('userInfo');
        }
    },
    watch: {
        sheng(newValue) {
            this.$emit('childBySheng', newValue);
        },
        shi(newValue) {
            this.$emit('childByShi', newValue);
        },
        xian(newValue) {
            this.$emit('childByXian', newValue);
        },
        zheng(newValue) {
            this.$emit('childByZheng', newValue);
        }
    },
    methods: {
        async renderXZCode() {
            let res = await getXzCode();
            this.xzCode = res;
            this.shengData = this.xzCode[1];
            // 根据 xzCode 禁用选择
            this.filterDisable();
        },
        async renderBanZhengDian(code) {
            let res = await getBanZhengDian(code);
            this.zhengData = res;
            this.zheng = '';
        },
        filterDisable() {
            let xzCode = this.userInfo.xz_code;
            let sheng = xzCode.slice(0, 2);
            let shi = xzCode.slice(0, 4);
            let xian = xzCode.slice(0, 6);
            this.changeSheng(sheng);
            this.changeShi(shi);
            this.changeXian(xian);
            this.disableCode = xzCode;
        },
        changeSheng(value) {
            // 赋值
            this.sheng = value;
            // 准备下一级数据
            this.shiData = this.xzCode[value];
            // 清空下一级
            this.changeShi('');
        },
        changeShi(value) {
            // 赋值
            this.shi = value;
            if (value === all) {
                this.xianData = {};
                this.changeXian(all);
            } else {
                // 准备下一级数据
                this.xianData = this.xzCode[value];
                // 清空下一级
                this.changeXian('');
            }
        },
        changeXian(value) {
            // 赋值
            this.xian = value;
            if (value === all) {
                // 清空办证点数据源
                this.zhengData = [];
                this.zheng = all;
            } else {
                // 清空办证点数据源
                this.zhengData = [];
                // 清空办证点数据
                this.zheng = null;
                if (this.xian.length > 0) {
                    this.renderBanZhengDian(value);
                }
            }
        }
    },
    async created() {
        this.renderXZCode();
    }
};
</script>

<style scoped>

</style>
