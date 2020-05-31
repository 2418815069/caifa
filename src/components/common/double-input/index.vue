<!--
 * @Description: 公共input
 * @Version: 2.0
 * @Autor: xiongchuanyu
 * @Date: 2019-06-07 13:07:36
 * @LastEditors: xiongchuanyu
 * @LastEditTime: 2019-07-07 17:25:50
 -->

<template>
  <div class="main">
    <div>
      从
      <el-input class="inline-block with70" :value="doubleIpt.from" @input="valueChange($event,'from')"></el-input>
      至
      <el-input class="inline-block with70" :value="doubleIpt.to" @input="valueChange($event,'to')"></el-input>
    </div>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash';
export default {
    name: 'xDoubleInput',
    props: {
        value: {
            type: [Object],
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
    mounted() {
    },
    data() {
        return {
            doubleIpt: cloneDeep(this.value)
        };
    },
    computed: {
    },
    methods: {
        valueChange(val, type) {
            let copyDoubleIpt = cloneDeep(this.doubleIpt);
            copyDoubleIpt[type] = val;
            this.$emit('input', copyDoubleIpt);
            this.$emit('change', copyDoubleIpt);
        }
    },
    watch: {
        value: function (val) {
            this.doubleIpt = val;
        }
    }
};
</script>
<style lang="stylus" scoped>
  .inline-block
    display: inline-block;
  .with70
    width 70px
</style>
