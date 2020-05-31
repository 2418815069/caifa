import guiZeTable from '../common/guize-table';
export const addFormConfig = [
    {
        label: '规则名称',
        prop: 'mingCheng',
        type: 'input',
        span: 12,
        placeholder: '请输入规则名称',
        rules: [
            { required: true, message: '请输入规则名称', trigger: 'blur' },
            { pattern: /^.{0,50}$/, message: '请输入50位以内正确格式', trigger: 'blur'}
        ]
    },
    {
        label: '是否可用',
        type: 'select',
        prop: 'isUse',
        span: 12,
        options: [
            {
                label: '可用',
                value: '1'
            },
            {
                label: '不可用',
                value: '0'
            }
        ]
    },
    {
        prop: 'condition',
        title: '第一步:设置逻辑条件',
        components: guiZeTable,
        span: 24,
        elFormItemBlock: true
    },
    {
        prop: 'result',
        title: '第二步:逻辑关系结果',
        components: guiZeTable,
        span: 24,
        elFormItemBlock: true
    },
    {
        label: '说明',
        prop: 'beiZhu',
        type: 'input'
    },
    {
        type: 'html',
        span: 24,
        render: () => {
            return '<div style="color:red">表达式为包含时,输入值用逗号隔开;如:1,2,3</div>';
        }
    }
];

export const listPropsConfig = [{
    label: '序号',
    prop: 'xuhao',
    format: function () {
        return arguments[2].$index + 1;
    }
}, {
    label: '验证规则',
    prop: 'mingCheng'
}, {
    label: '说明',
    prop: 'beiZhu'
}, {
    label: '是否可用',
    prop: 'isUse',
    format: function (text) {
        switch (text) {
            case '1':
                return '可用';
            case '0':
                return '禁用';
            default:
                return '';
        }
    }
}, {
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

