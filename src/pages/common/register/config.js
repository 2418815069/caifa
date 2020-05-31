import { quanxianmenu } from './api';

export const formConfig = [
    {
        label: '用户登陆名',
        prop: 'dengLuMc',
        type: 'input',
        span: 12,
        rules: [{
            required: true,
            message: '请输入用户登陆名'
        },
        { max: 20, message: '20字以内，可字母、数字、下划线', trigger: 'blur' }
        ]
    },
    {
        label: '密码',
        prop: 'dengLuMm',
        type: 'input',
        // iptType: 'password',
        span: 12,
        Attributes: {
            type: 'password',
            placeholder: '请输入密码'
        },
        rules: [{
            required: true,
            message: '请输入密码'
        }, {
            min: 6, max: 16, message: '6-16位字符', trigger: 'blur'
        }
        ]
    },
    {
        label: '确认密码',
        prop: 'dengLuMmAgain',
        Attributes: {
            type: 'password',
            placeholder: '请输入密码'
        },
        type: 'input',
        span: 12,
        rules: [{
            required: true,
            message: '请确认密码'
        }, {
            min: 6, max: 16, message: '6-16位字符', trigger: 'blur'
        }]
    },
    {
        label: '真实姓名',
        prop: 'zhenShiXm',
        type: 'input',
        span: 12,
        rules: [{
            required: true,
            message: '请输入真实姓名'
        }, {
            max: 10, message: '10字以内', trigger: 'blur'
        }]
    },
    {
        label: '用户部门',
        prop: 'yongHuDw',
        type: 'input',
        span: 12,
        rules: [{
            required: true,
            message: '请输入用户部门'
        }]
    },
    {
        label: '上岗证号',
        prop: 'shangGangZh',
        type: 'input',
        span: 12,
        rules: [{
            required: true,
            message: '请输入上岗证号'
        }]
    },
    {
        label: '分配角色',
        prop: 'jueSeBh',
        type: 'select',
        span: 12,
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
        label: '学历',
        prop: 'xueLi',
        type: 'select',
        span: 12,
        rules: [{
            required: true,
            message: '请选择学历'
        }],
        options: [
            {
                label: '博士',
                value: '博士'
            },
            {
                label: '硕士',
                value: '硕士'
            },
            {
                label: '本科',
                value: '本科'
            },
            {
                label: '专科',
                value: '专科'
            },
            {
                label: '中专',
                value: '中专'
            },
            {
                label: '高中',
                value: '高中'
            },
            {
                label: '初中',
                value: '初中'
            },
            {
                label: '小学',
                value: '小学'
            }
        ]
    },
    {
        label: '政治面貌',
        prop: 'zhengZhiMm',
        type: 'select',
        span: 12,
        rules: [{
            required: true,
            message: '请选择政治面貌'
        }],
        options: [
            {
                label: '党员',
                value: '党员'
            },
            {
                label: '团员',
                value: '团员'
            },
            {
                label: '群众',
                value: '群众'
            }
        ]
    },
    {
        label: '性别',
        prop: 'xingBie',
        type: 'radio',
        span: 12,
        rules: [{
            required: true,
            message: '请选择性别'
        }],
        options: [
            {
                label: '男',
                value: '男'
            },
            {
                label: '女',
                value: '女'
            }
        ]
    },
    {
        label: '电话',
        prop: 'dianHua',
        type: 'input',
        rules: [{
            required: true,
            message: '请输入电话'
        }, {
            pattern: /^1(3|4|5|6|7|8|9)\d{9}$/,
            message: '请输入正确电话格式'
        }],
        span: 12
    }, {
        label: '',
        prop: 'registerLink',
        type: 'registerLink',
        span: 24,
        rules: [{
            required: true,
            message: '请选择用户所在行政级别后，再选择所属区域'
        }
        ]
    }
];
