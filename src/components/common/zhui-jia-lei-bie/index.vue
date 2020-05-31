<template>
  <div class="main">
    <el-select style="width:192px" v-model="select" placeholder="请选择">
      <el-option v-for="(item,k) in options" :key="k" :label="item.mingCheng" :value="item.bianMa"></el-option>
    </el-select>
    <span style="color:red" v-if="rules">*</span>
  </div>
</template>

<script>
import { getleibie } from './api';
export default {
    name: 'XLeiBie',
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
            let v = await getleibie();
            this.options = v;
        },
        async sleep(timeout) {
            return new Promise((resole)=>{
                setTimeout(() => {
                    resole();
                }, timeout);
            });
        }
    },
    computed: {
        rules: function () {
            if (this.prop.rules instanceof Array && this.prop.rules.length && this.prop.rules[0].required === true) {
                return true;
            }
            return false;
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
        value: function (val, oldValue) {
            if (JSON.stringify(val) === JSON.stringify(oldValue)) { return; }
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
