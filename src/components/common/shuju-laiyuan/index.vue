<template>
  <div class="main">
    <el-select style="width:192px" v-model="select" placeholder="请选择">
      <el-option value="null" label="请选择" v-if="prop.isAllShow!==false"></el-option>
      <el-option v-for="(item,k) in options" :key="k" :label="item.mingCheng" :value="item.bianMa"></el-option>
    </el-select>
  </div>
</template>

<script>
import { getShuJuLaiYuan } from './api';
export default {
    name: 'XshuJuLaiYuan',
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
    mounted() {
    },
    data() {
        return {
            select: this.value,
            options: []
        };
    },
    methods: {
        async init() {
            let v = await getShuJuLaiYuan();
            this.options = v;
        }
    },
    created() {
        this.init();
    },
    watch: {
        select: function (val) {
            this.$emit('input', val);
            this.$emit('change', val);
        },
        value: function (val) {
            this.select = val;
        }
    }
};
</script>
<style scoped>
</style>
