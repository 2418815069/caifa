export const addFormConfig = [
    {
        label: '名称',
        prop: 'cmc',
        type: 'input',
        span: 24,
        placeholder: '请输入名称',
        width: '140px',
        rules: [
            { required: true, message: '请输入规则名称', trigger: 'blur' },

            { pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/, message: '请输入50位以内正确格式', trigger: 'blur'}
        ]
    },
    {
        label: '简称',
        prop: 'jianCheng',
        type: 'input',
        endText: '（3个汉字或字符以内）',
        endStyle: {
            color: 'red'
        },
        span: 24,
        width: '140px',
        placeholder: '请输入规则名称',
        rules: [
            { required: true, message: '请输入规则名称', trigger: 'blur' },
            { pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]{0,3}$/, message: '请输入3位以内正确格式', trigger: 'blur'}
        ]
    },
    {
        label: '编码',
        prop: 'ccode',
        type: 'input',
        span: 24,
        width: '140px',
        endStyle: {
            color: 'red'
        },
        endText: '县编码为6位，现有编码后加两位即可',
        placeholder: '请输入规则名称',
        rules: [
            { required: true, message: '请输入规则名称', trigger: 'blur' },
            { pattern: /^[0-9]{6,6}$/, message: '请输入6位正确格式', trigger: 'blur'}
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
    prop: 'cmc'
}, {
    label: '简称',
    prop: 'jianCheng'
}, {
    label: '编码',
    prop: 'ccode'
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

