<!--
 * @Description: 公共input
 * @Version: 2.0
 * @Autor: xiongchuanyu
 * @Date: 2019-06-07 13:07:36
 * @LastEditors: xiongchuanyu
 * @LastEditTime: 2019-06-16 20:59:05
 -->
<template>
  <div class="main">
    <div style="display:inline-block;">
      <el-input size="small" v-model="input" :disabled="prop.disabled" v-bind="prop.Attributes || prop"></el-input>
    </div>
    <span style="color:red" v-if="rules">*</span>
    <span :style="prop.endStyle?prop.endStyle:'color:#606266;'" v-text="prop.endText"></span>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash';
export default {
    name: 'xInput',
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
            input: cloneDeep(this.value)
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
        this.setValue();
    },
    methods: {
        setValue() {
            if (this.prop && this.prop.value) {
                this.input = this.prop.value;
            }
        }
    },
    watch: {
        input: function (val) {
            this.$emit('input', val);
            this.$emit('change', val);
        },
        value: function (val) {
            this.input = val;
        }
    }
};
</script>
<style scoped>
</style>
