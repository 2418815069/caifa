<template>
  <div>
    <!-- <el-form-item style="margin:0;padding:0"> -->
      <el-row :style="prop.itemStyle?prop.itemStyle:{}">
        <el-col :span="12">
          <el-select v-model="shiXiang[0]" placeholder="请选择" @change="changeMc">
            <el-option label="请选择" value="null" v-if="prop.isAllShow!==false"></el-option>
            <el-option v-for="(v, k) in shiXiangMc" :key="k" :label="v.mingCheng" :value="v.bianMa"></el-option>
          </el-select>
        </el-col>
        <el-col :span="12">
          <!-- <label>
            <span style="color:#606266">事项子项:</span>
          </label> -->
          <el-select v-model="shiXiang[1]" style="margin-right:10px" placeholder="请选择">
            <el-option label="请选择" value="null"></el-option>
            <el-option v-for="(v, k) in shiXiangZx" :key="k" :label="v.mingCheng" :value="v.bianMa"></el-option>
          </el-select>
        </el-col>
      </el-row>
    <!-- </el-form-item> -->
  </div>
</template>

<script>
import { getShiXiangMcList, getShiXiangZxList } from './api';
export default {
    name: 'index',
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
            shiXiang: [],
            shiXiangMc: [],
            shiXiangZx: []
        };
    },
    watch: {
        shiXiang: function (value) {
            this.$emit('input', value);
            this.$emit('change', value);
        },
        value: function (val, oldValue) {
            if (JSON.stringify(val) === JSON.stringify(oldValue)) { return; }
            this.shiXiang = val;
        }
    },
    methods: {
    // init
        async init() {
            let v = await getShiXiangMcList();
            this.shiXiangMc = v;
        },
        // 名称变化
        async changeMc(value) {
            if (String(value) === 'null') {
                this.shiXiang[1] = '';
            }
            let v = await getShiXiangZxList({ fuBianMa: value });
            this.shiXiangZx = v;
        }
    },
    async created() {
        this.init();
    }
};
</script>

<style scoped>
</style>
