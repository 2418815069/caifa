<template>
  <div class="main">
       <div style="display: inline-block;">
    <el-date-picker
      v-model="datePickter2[0]"
      :type="prop.dateType?prop.dateType:'daterange'"
      value-format="yyyy-MM-dd"
      :default-time="'[00:00:00]'"
      placeholder="起始日期"
      class="mr10"
    ></el-date-picker>
    <el-date-picker
      v-model="datePickter2[1]"
      :type="prop.dateType?prop.dateType:'daterange'"
      value-format="yyyy-MM-dd"
      placeholder="结束日期"
    ></el-date-picker>
       </div>
     <span style="color:red" v-if="rules">*</span>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash';
export default {
    name: 'xDatePicker2',
    props: {
        value: {
            type: Array,
            default() {
                return [];
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
            datePickter2: cloneDeep(this.value) || []
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
    watch: {
        datePickter2: function (val) {
            this.$emit('input', val);
            this.$emit('change', val);
        },
        value: function (val) {
            // 如果数据完全相同就不用更新数据流，避免死循环
            if (JSON.stringify(this.datePickter2) === JSON.stringify(val)) { return; }
            this.datePickter2 = val;
        }
    }
};
</script>
<style scoped>
.mr10 {
    margin-right: 10px
}
</style>
