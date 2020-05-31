<!--
 * @Description: 公共radio
 * @Version: 2.0
 * @Autor: xiongchuanyu
 * @Date: 2019-06-07 13:07:36
 * @LastEditors: xiongchuanyu
 * @LastEditTime: 2019-06-10 00:25:23
 -->
<template>
  <div class="main">
    <el-radio-group v-model="radio">
      <el-radio
        v-for="(option, key) in options"
        :label="option.value"
        :disabled="option.disabled"
        :key="key"
      >{{option.label}}</el-radio>
    </el-radio-group>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash';
export default {
    name: 'xRadio',
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
        this.addChecked();
    },
    data() {
        return {
            radio: cloneDeep(this.value),
            options: cloneDeep(this.prop.options) || []
        };
    },
    computed: {
    },
    methods: {
        addChecked() {
            this.options.map(x => {
                if (x.checked) {
                    this.radio = x.value;
                }
            });
            if (this.prop.value) {
                this.radio = this.prop.value;
            }
        }
    },
    watch: {
        'radio': function (val) {
            this.$emit('input', val);
            this.$emit('change', val);
        },
        'value': function (val) {
            this.radio = val;
        },
        'prop.options': function (options) {
            this.options = options;
        }
    }
};
</script>
<style scoped>
</style>
