export const formConfig = [
    {
        label: '真实姓名',
        prop: 'zhenShiXm',
        type: 'input',
        span: 12,
        placeholder: '请输入真实姓名',
        rules: [
            { required: true, message: '请输入真实姓名', trigger: 'blur' },
            { pattern: /^.{0,10}$/, message: '10个字以内', trigger: 'blur'}
        ]
    },
    {
        label: '用户登陆名',
        prop: 'dengLuMc',
        type: 'input',
        span: 12,
        placeholder: '请输入用户登陆名',
        disabled: true,
        rules: [
            { required: true, message: '请输入用户登陆名', trigger: 'blur' },
            { pattern: /^.{0,20}$/, message: '20个字以内', trigger: 'blur'}
        ]
    },
    {
        label: '密码',
        prop: 'dengLuMm',
        type: 'input',
        span: 12,
        placeholder: '请输入密码',
        rules: [
            { pattern: /^.{6,16}$/, message: '6-16位字符之间', trigger: 'blur'}
        ]
    },
    {
        label: '确认密码',
        prop: 'dengLuMmAgain',
        type: 'input',
        span: 12,
        placeholder: '请确认密码',
        rules: [
            { pattern: /^.{6,16}$/, message: '6-16位字符之间', trigger: 'blur'}
        ]
    },
    {
        label: '工作单位',
        prop: 'yongHuDw',
        type: 'input',
        span: 12,
        placeholder: '请输入工作单位',
        rules: [
            { required: true, message: '请输入工作单位', trigger: 'blur' }
        ]
    },
    {
        label: '所属区域',
        type: 'html',
        prop: 'xzCodeName',
        span: 12,
        render: (text) => {
            return text;
        }
    },
    {
        label: '上岗证号',
        prop: 'shangGangZh',
        type: 'input',
        span: 12,
        placeholder: '请输入上岗证号',
        rules: [
            { required: true, message: '请输入上岗证号', trigger: 'blur' }
        ]
    },
    {
        label: '学历',
        type: 'select',
        prop: 'xueLi',
        span: 12,
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
        type: 'select',
        prop: 'zhengZhiMm',
        span: 12,
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
        type: 'radio',
        prop: 'xingBie',
        span: 12,
        options: [{
            label: '男',
            value: '男'
        }, {
            label: '女',
            value: '女'
        }]
    },
    {
        label: '电话',
        prop: 'dianHua',
        type: 'input',
        span: 12,
        placeholder: '请输入电话',
        rules: [
            { required: true, message: '请输入电话', trigger: 'blur' },
            {
                pattern: /^1(3|4|5|6|7|8|9)\d{9}$/,
                message: '请输入正确电话格式'
            }
        ]
    }
];

