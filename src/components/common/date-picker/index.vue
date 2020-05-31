<!--
 * @Description: 公共date-picker
 * @Version: 2.0
 * @Autor: xiongchuanyu
 * @Date: 2019-06-07 13:07:36
 * @LastEditors: xiongchuanyu
 * @LastEditTime: 2019-07-20 18:45:13
 -->
<template>
  <div class="main">
      <div style="display: inline-block;">
    <el-date-picker
      v-model="value1"
      :style="prop.style?prop.style:'width:192px'"
      valueFormat="yyyy-MM-dd"
      type="date"
      placeholder="选择日期"
    ></el-date-picker>
    </div>
    <span style="color:red" v-if="rules">*</span>
  </div>
</template>

<script>
export default {
    name: 'xDatePicker',
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
    mounted() {
    },
    data() {
        return {
            value1: this.value
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
        value1: function (val) {
            this.$emit('input', val);
            this.$emit('change', val);
        },
        value: function (val, oldValue) {
            if (JSON.stringify(val) === JSON.stringify(oldValue)) { return; }
            this.value1 = val;
        }
    }
};
</script>
<style scoped>
</style>
