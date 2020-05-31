export const zhongZhiConfig = [
    {
        label: '是否已采伐',
        type: 'select',
        prop: 'isYiCaiFa',
        options: [
            {
                label: '是',
                value: '1'
            },
            {
                label: '否',
                value: '0'
            }
        ]
    },
    {
        label: '经办人',
        type: 'input',
        prop: 'jbr',
        placeholder: '请输入经办人',
        rules: [
            { required: true, message: '请输入经办人', trigger: 'blur' },
            { pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/, message: '请输入正确格式', trigger: 'blur'}
        ]

    },
    {
        label: '批准人',
        type: 'input',
        prop: 'pzr',
        placeholder: '请输入批准人',
        rules: [
            { required: true, message: '请输入批准人', trigger: 'blur' },
            { pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/, message: '请输入正确格式', trigger: 'blur'}
        ]
    },
    {
        label: '实际采伐面积',
        type: 'input',
        prop: 'sjcfmj',
        width: '110px',
        placeholder: '请输入实际采伐面积',
        rules: [
            { required: true, message: '请输入实际采伐面积', trigger: 'blur' },
            { pattern: /^\d+(\.\d+)?$/, message: '请输入正确格式', trigger: 'blur'}
        ]
    },
    {
        label: '原因',
        type: 'input',
        prop: 'yy',
        placeholder: '请输入原因',
        rules: [
            { required: true, message: '请输入原因', trigger: 'blur' },
            { pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/, message: '请输入正确格式', trigger: 'blur'}
        ]
    }
];
