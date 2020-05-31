export const formConfig = [
    {
        label: '标题',
        prop: 'title',
        type: 'input',
        span: 24,
        rules: [
            {
                required: true,
                message: '请输入标题',
                trigger: 'blur'
            },
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ]
    },
    {
        label: '内容',
        prop: 'content',
        type: 'editor',
        span: 24,
        rules: [{
            required: true,
            message: '请输入内容'
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
        label: '标题',
        prop: 'title'
    },
    {
        label: '操作',
        prop: 'action',
        fixed: 'right',
        width: 150,
        formatActions() {
            return [
                {
                    label: '编辑',
                    action: 'edit'
                },
                {
                    label: '删除',
                    action: 'delete'
                }
            ];
        }
    }
];
