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
            { pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/, message: '请输入正确标题', trigger: 'blur'}
        ]
    },
    // {
    //     label: '滚动',
    //     prop: 'isDisplay',
    //     type: 'radio',
    //     span: 24,
    //     options: [{
    //         label: '是(主页上滚动)',
    //         value: '0'
    //     }, {
    //         label: '否(主页上不滚动,可以在详细里面查看)',
    //         value: '1'
    //     }],
    //     rules: [
    //         {
    //             required: true,
    //             message: '请选择'
    //         }
    //     ]
    // },
    {
        label: '内容',
        prop: 'content',
        type: 'editor',
        span: 24,
        rules: [{
            required: true,
            message: '请输入内容'
        },
        { pattern: /^(?=.*\S).+$/, message: '请输入正确内容', trigger: 'blur'}
        ]
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
        label: '公告时间',
        prop: 'displayDate'
    },
    {
        label: '操作',
        prop: 'action',
        fixed: 'right',
        width: 150,
        formatActions() {
            return [
                {
                    label: '查看',
                    action: 'view'
                },
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
