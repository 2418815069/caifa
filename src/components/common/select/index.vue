<!--
 * @Description: 公共select
 * @Version: 2.0
 * @Autor: xiongchuanyu
 * @Date: 2019-06-07 13:07:36
 * @LastEditors: xiongchuanyu
 * @LastEditTime: 2019-06-16 13:32:48
 -->
<template>
  <div class="main">
    <div style="display:inline-block;">
        <el-select :style="prop.style?prop.style:'width:192px'" :disabled="prop.disabled" v-model="select" placeholder="请选择">
          <el-option  v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
    </div>
    <span style="color:red" v-if="rules">*</span>
    <span :style="prop.endStyle?prop.endStyle:'color:#606266;'" v-text="prop.endText"></span>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash';
export default {
    name: 'xSelect',
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
    async mounted() {
        if (this.prop.fetchOption) {
            const options = await this.prop.fetchOption();
            this.options = options;
        }
        console.log(this.prop);
    },
    data() {
        return {
            select: cloneDeep(this.value),
            options: cloneDeep(this.prop.options) || []
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
    methods: {
    },
    watch: {
        'select': function (val) {
            if (this.prop.needLabel) {
                let obj;
                this.options.map(x=>{
                    if (val === x.value) {
                        obj = {
                            label: x.label,
                            value: val
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
        'value': function (val) {
            if (this.prop.needLabel) {
                this.select = val.value;
            } else if (val) {this.select = val;}
        },
        'prop.options': function (options) {
            options.map(x => {
                if (x.checked) {
                    this.select = x.value;
                }
            });
            this.options = options;
        }
    }
};
</script>
<style scoped>
</style>
