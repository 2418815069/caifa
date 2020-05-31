export const formConfig = [
    {
        label: '编码',
        prop: 'bianMa',
        type: 'input',
        span: 24,
        rules: [
            {required: true, message: '不能为空', trigger: 'blur'},
            {pattern: /^[0-9]+$/, message: '必须是数字', trigger: 'blur'}
        ]
    },
    {
        label: '父编码',
        prop: 'fuBianMa',
        disabled: true,
        type: 'input',
        span: 24,
        rules: [
            {required: true, message: '不能为空', trigger: 'blur'},
            {pattern: /^[0-9]+$/, message: '必须是数字', trigger: 'blur'}
        ]
    },
    {
        label: '名称',
        prop: 'mingCheng',
        type: 'input',
        span: 24,
        rules: [
            {required: true, message: '不能为空', trigger: 'blur'},
            {pattern: /^\w+$/, message: '必须是数字', trigger: 'blur'}
        ]
    },
    {
        label: '是否可用',
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

export const tabConfig = [
    {
        label: '林木权属',
        name: '01'
    },
    {
        label: '林分起源',
        name: '02'
    },
    {
        label: '森林分类',
        name: '03'
    },
    {
        label: '采伐类型',
        name: '04'
    },
    {
        label: '更新方式',
        name: '06'
    },
    {
        label: '龄组',
        name: '07'
    },
    {
        label: '天保工程区',
        name: '08'
    },
    {
        label: '树种',
        name: '09'
    },
    {
        label: '申请类型',
        name: '11'
    },
    {
        label: '限额追加类别',
        name: '10'
    }
];

export const listPropConfig = [
    {
        label: '编码',
        prop: 'bianMa'
    },
    {
        label: '父编码',
        prop: 'fuBianMa'
    },
    {
        label: '名称',
        prop: 'mingCheng'
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
        width: 150,
        formatActions(row) {
            let actions = [
                {
                    label: '修改',
                    action: 'edit'
                },
                {
                    label: '删除',
                    action: 'delete'
                }
            ];
            if ((row.leiBie === '03' || row.leiBie === '04' || row.leiBie === '09') && row.fuBianMa === '0') {
                actions.push( {
                    label: '增加子项',
                    action: 'addChild'
                });
            }
            return actions;
        }
    }
];
