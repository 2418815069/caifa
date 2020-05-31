export const addFormConfig = [
    {
        label: '名称',
        prop: 'mingCheng',
        type: 'input',
        span: 24,
        placeholder: '请输入名称',
        width: '140px',
        rules: [
            { required: true, message: '请输入规则名称', trigger: 'blur' },
            { pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]{0,50}$/, message: '请输入名称', trigger: 'blur'}
        ]
    },
    {
        label: '简称',
        prop: 'jianCheng',
        type: 'input',
        rules: [
            { required: true, message: '请输入简称', trigger: 'blur' },
            { pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]{0,50}$/, message: '请输入正确简称', trigger: 'blur'}
        ],
        span: 24
    },
    {
        label: '编码',
        prop: 'bianMa',
        type: 'input',
        span: 24,
        width: '140px',
        endStyle: {
            color: 'red'
        },
        endText: '归口单位为12位，现有编码后加两位即可',
        placeholder: '请输入规则名称',
        rules: [
            { required: true, message: '请输入规则名称', trigger: 'blur' },
            { pattern: /^[0-9]{12,12}$/, message: '请输入12位正确格式', trigger: 'blur'}
        ]
    }
];

export const listPropsConfig = [{
    label: '序号',
    prop: 'xuhao',
    format: function () {
        return arguments[2].$index + 1;
    }
}, {
    label: '名称',
    prop: 'mingCheng'
}, {
    label: '简称',
    prop: 'jianCheng'
}, {
    label: '编码',
    prop: 'bianMa'
},
{
    label: '操作',
    prop: 'action',
    fixed: 'right',
    width: 150,
    formatActions() {
        return [

            {
                label: '修改',
                action: 'edit'
            },
            {
                label: '删除',
                action: 'delete'
            }

        ];
    }
}];

