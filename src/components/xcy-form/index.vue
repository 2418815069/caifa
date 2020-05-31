<!--
 * @Description: 公共配置框架
 * @Version: 2.0
 * @Autor: xiongchuanyu
 * @Date: 2019-06-07 11:56:14
 * @LastEditors: xiongchuanyu
 * @LastEditTime: 2019-06-16 12:08:52
 -->
<template>
  <el-form
    class="xcy-form-container"
    :model="internalData"
    ref="validateForm"
    :labelWidth="labelWidth"
    :labelPosition="labelPosition"
    :size="size"
    :inline="true"
    :validate-on-rule-change="false"
    :disabled="disabled"
    :hide-required-asterisk="true"
    :rules="rules"
  >
    <div class="group" v-for="(conf, index) in configFormat" :key="index">
      <div class="content">
        <el-row v-for="(row, index) in conf.list" :key="index" :gutter="gutter" class="from-row">
          <el-col v-for="(item, key) in row" :key="key" :span="item.span" class="col" :style="item.colWidth?'width:'+item.colWidth:!item.span?'width:auto':''">
            <form-base
              :prop="item"
              :data="internalData"
              @input="valueChange"
              ref="baseValidateForm"
            ></form-base>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-form>
</template>

<script>

import { gridFormat } from '@/common/util';
import { pick, isEmpty, cloneDeep } from 'lodash';
import formBase from './base';

function noop() { }
export default {
    name: 'xcyForm',
    provide() {
        return {
            rootValidateField: this.validateField,
            disabled: this.disabled,
            rootForm: this
        };
    },
    props: {
        config: {
            type: [Array, Object],
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
        labelWidth: {
            type: String,
            default: '100px'
        },
        labelPosition: {
            type: String,
            default: 'left'
        },
        size: {
            type: String,
            default: 'small'
        },
        isChange: {
            type: [Boolean, String, Number],
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        onChange: {
            type: Function,
            default: noop
        },
        gutter: {
            type: Number,
            default: 30
        }
    },
    data() {
        return {
            internalData: cloneDeep(this.data),
            childFormList: []

        };
    },
    methods: {
    // 通过promise来确定是否全部通过
        validate(callBack) {
            this.$refs.validateForm.validate(callBack);
        },
        validateField(prop) {
            this.$refs.validateForm.validateField(prop);
        },
        resetFields() {
            this.$emit('resetFields');
            this.$refs.validateForm.resetFields();
        },
        clearValidate() {
            this.$emit('clearValidate');
            this.$refs.validateForm.clearValidate();
        },
        reset(data) {
            if (data) {
                this.internalData = cloneDeep(data);
            } else {
                this.internalData = cloneDeep({});
            }
        },
        valueChange(value) {
            this.$emit('input', cloneDeep(value));
            this.$emit('change', cloneDeep(value));
        }
    },
    components: {
        formBase
    },
    computed: {
        rules() {
            const results = this.config.reduce((result, cur) => {
                const rule = pick(cur, ['required', 'message', 'trigger']);
                if ('rules' in cur) {
                    result[cur.prop] = [...cur.rules];
                    if (rule) {
                        result[cur.prop].unshift(rule);
                    }
                } else if (!isEmpty(rule)) {
                    result[cur.prop] = [rule];
                }
                return result;
            }, {});
            return results;
        },
        configFormat() {
            const configs = this.$setFormProps(this.$root.provinceCode, this.config);
            if (!configs || !configs.length || !configs[0].list) {
                let copyConfigs = cloneDeep(gridFormat(configs));
                // 透传props  ??? 影响了全局disabled
                // copyConfigs[0] = copyConfigs[0].map(item => {
                //     item.disabled = this.disabled;
                //     return item;
                // });
                return [{
                    title: '',
                    list: copyConfigs
                }];
            }
            return configs.map(item => {
                return {
                    ...item,
                    list: gridFormat(item.list)
                };
            });

        }
    },
    created() {
        this.$on('setChildForm', (childForm) => {
            this.childFormList.push(childForm);
        });
    },
    mounted() {
    },
    watch: {
        data: {
            immediate: true,
            deep: true,
            handler: function (newValue) {
                this.internalData = cloneDeep(newValue);
            }
        }
    }
};
</script>

<style scoped>
.group {
  /* padding: 20px 0; */
  margin-bottom: -18px;
}
.content {
  margin-left: 15px;
}
</style>
