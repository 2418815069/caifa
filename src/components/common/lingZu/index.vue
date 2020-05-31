<template>
  <div class="main">
    <el-select :style="prop.style?prop.style:'width:192px'" v-model="select" placeholder="请选择">
      <el-option v-for="(item,k) in options" :key="k" :label="item.mingCheng" :value="item.bianMa"></el-option>
    </el-select>
  </div>
</template>

<script>
import { getLingZu } from './api';
export default {
    name: 'XLingZu',
    props: {
        value: {
            type: [String, Number, Object],
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
            let v = await getLingZu();
            this.options = v;
        }
    },
    created() {
        this.init();
    },
    watch: {
        select: async function (val) {
            if (this.prop.needLabel) {
                let obj;
                if (!this.options.length) {
                    await this.init();
                }
                this.options.map(x=>{
                    if (val === x.bianMa) {
                        obj = {
                            label: x.mingCheng,
                            value: x.bianMa
                        };
                    }
                });
                this.$emit('input', obj);
                this.$emit('change', obj);
                return;
            }
            this.$emit('input', val);
            this.$emit('change', val);
        },
        value: function (val) {
            if (!val.value) { return; }
            if (this.prop.needLabel) {
                this.select = String(val.value);
            } else {
                this.select = val;
            }
        }
    }
};
</script>
<style scoped>
</style>
