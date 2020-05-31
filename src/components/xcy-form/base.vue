<!--
 * @Description: 公共配置组件
 * @Version: 2.0
 * @Autor: xiongchuanyu
 * @Date: 2019-02-27 12:14:26
 * @LastEditors: LiteSun
 * @LastEditTime: 2019-07-26 20:48:05
 -->
<script>
import input from '@/components/common/input';
import select from '@/components/common/select';
import radio from '@/components/common/radio';
import dataPickter from '@/components/common/date-picker';
import dataPickter2 from '@/components/common/date-picker2';
import doubleInput from '@/components/common/double-input';
import html from '@/components/common/html';
import table from '@/components/common/table';
import danWei from '@/components/common/danwei';
import shiXiangMcZl from '@/components/common/shixiang-mc-zl';
import linMuQuanShu from '@/components/common/linmu-quanshu';
import linFenQqYuan from '@/components/common/linfen-qiyuan';
import caiFaLeiXingFangShi from '@/components/common/caifa-leixing-fangshi';
import shuJuLaiYuan from '@/components/common/shuju-laiyuan';
import linZhong from '@/components/common/linzhong';
import shuZhong from '@/components/common/shuZhong';
import lingZu from '@/components/common/lingZu';
import gengXinFangShi from '@/components/common/gengxin-fangshi';
import caiLiao from '@/components/common/caiLiao';
import yiBanTable from '@/components/common/yiban-shuzhong-table';
import wenHao from '@/components/common/wenHao';
import editor from '@/components/common/editor';
import zhuiJiaLeiBie from '@/components/common/zhui-jia-lei-bie';
import registerLink from '@/components/common/register-link';
import checkbox from '@/components/common/checkBox';
import upload from '@/components/common/upload';
import editorPrint from '@/components/common/editor-print';
const componentsTypeMap = {
    input,
    select,
    radio,
    dataPickter,
    dataPickter2,
    doubleInput,
    html,
    table,
    danWei,
    shiXiangMcZl,
    linMuQuanShu,
    linFenQqYuan,
    caiFaLeiXingFangShi,
    shuJuLaiYuan,
    linZhong,
    shuZhong,
    lingZu,
    gengXinFangShi,
    caiLiao,
    yiBanTable,
    wenHao,
    editor,
    zhuiJiaLeiBie,
    registerLink,
    checkbox,
    upload,
    editorPrint
};
export default {
    name: 'xcyFormBase',
    props: {
        data: {
            type: [Object, Array],
            default() {
                return {};
            }
        },
        prop: {
            type: [Object, Array],
            default() {
                return {};
            }
        }
    },
    methods: {
        valueChange(value) {
            this.data[this.prop.prop] = value;
            this.$emit('input', {
                ...this.data,
                [this.prop.prop]: value
            });
            this.$emit('change', {
                ...this.data,
                [this.prop.prop]: value
            });
        },
        dataChange(data) {
            Object.assign(this.data, {
                ...this.data,
                ...data
            });
            this.$emit('input', {
                ...this.data,
                ...data
            });
            this.$emit('change', {
                ...this.data,
                ...data
            });
        },
        propFormat(data) {
            if (Array.isArray(data)) {
                return data.reduce((total, item) => {
                    return total + '-' + item;
                }, '');
            }
            return data;
        },
        getBaseElem(createElement) {
            let components = componentsTypeMap[this.prop.type] || '';
            if (this.prop.components) {
                components = this.prop.components;
            }
            if (this.prop.type === 'text') {
                return createElement('span', {
                    domProps: {
                        innerHTML: this.prop.format
                            ? this.prop.format(this.data[this.prop.prop], this.data)
                            : this.data[this.prop.prop] || '--'
                    }
                });
            }
            return createElement(components, {
                props: {
                    data: this.data,
                    value: this.data[this.prop.prop],
                    prop: this.prop
                },
                on: {
                    input: this.valueChange,
                    change: this.valueChange,
                    dataInput: this.dataChange
                }
            });
        },
        getFormItem(createElement) {
            return createElement(
                'el-form-item',
                {
                    class: {
                        'is-required': this.prop.required,
                        'el-form-item-block': this.prop.elFormItemBlock,
                        'el-form-item-none': this.prop.elFormItemNone
                    },
                    ref: 'baseFormItem',
                    props: {
                        'label': this.prop.label ? this.prop.label + '：' : '',
                        'prop': this.propFormat(this.prop.prop),
                        'rules': this.prop.rules,
                        'key': this.prop.label,
                        'style': Object.assign({ padding: 0 }, this.prop.style),
                        'label-width': this.prop.width ? this.prop.width : '',
                        'label-style': this.prop.labelStyle ? this.prop.labelStyle : '',
                        'show-message': this.prop.showMessage
                    }
                },
                [
                    this.prop.labelMessage &&
          createElement('span', { slot: 'label' }, [
              createElement(
                  'span',
                  {},
                  this.prop.label ? this.prop.label + '：' : ''
              )
          ]),
                    this.getBaseElem(createElement)
                ]
            );
        }
    },
    render(createElement) {
        return createElement(
            'section',
            {
                class: {
                    'group-item': true
                },
                attrs: {
                    style: this.prop.style
                }
            },
            [this.getFormItem(createElement)]
        );
    }
};
</script>
<style>
.el-form-item.is-required.hidden-label .el-form-item__label:before {
  content: "";
}
.el-form-item.is-required.hidden-label .el-form-item__label label {
  padding: 0;
}
.el-form-item-block{
    width:100%
}
.el-form-item-block .el-form-item__content{
    width:100%
}
.el-form-item-none{
    display: none !important;
}
</style>
<style scoped>
.tips {
  font-size: 12px;
  margin: 0;
}
.group-wrap {
  display: block;
  padding-top: 15px;
  padding-bottom: 20px;
  border-top: 1px solid #e4e7ed;
}
.normal-image-view {
  margin-right: 15px;
}
</style>
