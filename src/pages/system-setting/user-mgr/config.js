import {quanxianmenu} from './api';
import ThreeLinks from '@/pages/limit-management/components/tree-links';

export const filterConfig = [
    {
        span: 8,
        label: '用户账号',
        type: 'input',
        prop: 'dengLuMc',
        width: '72px',
        placeholder: '请输入用户账号'
    }, {
        span: 8,
        label: '用户姓名',
        type: 'input',
        width: '72px',
        prop: 'zhenShiXm',
        placeholder: '请输入用户姓名'
    },
    {
        span: 8,
        label: '手机号码',
        type: 'input',
        prop: 'dianHua',
        width: '72px',
        placeholder: '请输入手机号码'
    }, {
        span: 8,
        label: '用户状态',
        type: 'select',
        prop: 'isUse',
        width: '72px',
        options: [
            {
                label: '请选择',
                value: null
            },
            {
                label: '可用',
                value: 1
            },
            {
                label: '禁用',
                value: 0
            }
        ]
    }, {
        span: 16,
        label: '单位',
        width: '72px',
        components: ThreeLinks,
        level: 3,
        prop: 'xzCode'
    }, {
        span: 8,
        label: '用户类别',
        type: 'select',
        prop: 'yongHuLx',
        width: '72px',
        options: [
            {
                label: '请选择',
                value: null
            },
            {
                label: '省',
                value: '1'
            },
            {
                label: '市',
                value: '2'
            },
            {
                label: '县',
                value: '3'
            },
            {
                label: '乡镇',
                value: '4'
            }
        ]
    }, {
        span: 8,
        label: '用户角色',
        type: 'select',
        prop: 'jueSeBh',
        width: '72px',
        async fetchOption() {
            let res = await quanxianmenu({page: 1, size: 100000});
            return res.content.map(item => {
                return {
                    label: item.jiaoSeMc,
                    value: item.jiaoSeBh
                };
            });
        }
    }];

export const formConfig = [
    {
        label: '系统账号',
        prop: 'dengLuMc',
        type: 'input',
        span: 24,
        disabled: true
    },
    {
        label: '真实姓名',
        prop: 'zhenShiXm',
        type: 'input',
        span: 24,
        disabled: true
    },
    {
        label: '分配角色',
        prop: 'jueSeBh',
        type: 'select',
        span: 24,
        async fetchOption() {
            let res = await quanxianmenu({page: 1, size: 100000});
            return res.content.map(item => {
                return {
                    label: item.jiaoSeMc,
                    value: item.jiaoSeBh
                };
            });
        }
    },
    {
        label: '是否禁用',
        prop: 'isUse',
        type: 'radio',
        span: 24,
        options: [{
            value: '1',
            label: '可用'
        }, {
            value: '0',
            label: '禁用'
        }]
    }
];

export const listPropsConfig = [
    {
        label: '序号',
        prop: 'xuhao',
        format: function () {
            return arguments[2].$index + 1;
        }
    },
    {
        label: '真实姓名',
        prop: 'zhenShiXm'
    },
    {
        label: '用户账号',
        prop: 'dengLuMc'
    },
    {
        label: '工作单位',
        prop: 'yongHuDw'
    },
    {
        label: '注册单位',
        prop: 'xzCodeName'
    },
    {
        label: '电话',
        prop: 'dianHua'
    },
    {
        label: '角色',
        prop: 'jueSeMc'
    },
    {
        label: '注册时间',
        prop: 'zhuCeRq'
    },
    {
        label: '状态',
        prop: 'isUse',
        format: function (text) {
            switch (text) {
                case '0':
                    return '不可用';
                case '1':
                    return '可用';
                default:
                    return '';
            }
        }
    },
    {
        label: '操作',
        prop: 'action',
        fixed: 'right',
        width: 200,
        formatActions() {
            return [
                {
                    label: '设置',
                    action: 'edit'
                },
                {
                    label: '删除',
                    action: 'delete'
                },
                {
                    label: '初始化密码',
                    action: 'reset'
                }
            ];
        }
    }
];

export const exportConfig = [
    {
        type: 'checkbox',
        needLabel: true,
        prop: 'check',
        options: [
            {
                label: '真实姓名',
                prop: 'zhenShiXm'
            },
            {
                label: '用户账号',
                prop: 'dengLuMc'
            },
            {
                label: '工作单位',
                prop: 'yongHuDw'
            },
            {
                label: '注册单位',
                prop: 'zhuCeDw'
            },
            {
                label: '电话',
                prop: 'dianHua'
            },
            {
                label: '角色',
                prop: 'jueSeMc'
            },
            {
                label: '注册时间',
                prop: 'zhuCeRq'
            },
            {
                label: '状态',
                prop: 'isUse'
            }
        ]
    }
];
