<template>
  <div class="main">
    <div style="display:inline-block;">
        <el-select style="width:192px" size="small" v-model="select" placeholder="请选择">
        <el-option value="null" label="请选择" v-if="prop.isAllShow!==false"></el-option>
        <el-option v-for="(item,k) in options" :key="k" :label="item.title" :value="item.title"></el-option>
        </el-select>
    </div>
    <span style="color:red" v-if="rules">*</span>
  </div>
</template>

<script>
import Storage from '@/common/storage';
import { getWenjianList } from './api';
export default {
    name: 'XqiYuan',
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
    computed: {
        rules: function () {
            if (this.prop.rules instanceof Array && this.prop.rules.length && this.prop.rules[0].required === true) {
                return true;
            }
            return false;
        }
    },
    data() {
        return {
            select: this.value,
            options: []
        };
    },
    methods: {
        async init() {
            let xzCode = Storage.get('userInfo').xzCode;
            let v = await getWenjianList({danWei: xzCode});
            this.options = v.content;
        },
        async sleep(timeout) {
            return new Promise((resole)=>{
                setTimeout(() => {
                    resole();
                }, timeout);
            });
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
            if (this.prop.needLabel) {
                this.select = val.value;
            } else {
                this.select = val;
            }
        }
    }
};
</script>
<style scoped>
</style>
