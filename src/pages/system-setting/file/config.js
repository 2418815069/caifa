import ThreeLinks from '@/pages/limit-management/components/tree-links';

export const filterConfig = [
    {
        span: 8,
        label: '文号',
        type: 'input',
        prop: 'title'
    }, {
        span: 16,
        label: '单位',
        components: ThreeLinks,
        level: 2,
        prop: 'danWei'
    }
];

export const formConfig = [
    {
        span: 16,
        label: '文件级别',
        components: ThreeLinks,
        level: 2,
        prop: 'code',
        rules: [{
            required: true,
            message: '请输入文件级别',
            trigger: 'blur'
        }]
    },
    {
        span: 24,
        label: '文号',
        type: 'input',
        prop: 'title',
        rules: [{
            required: true,
            message: '请输入文号',
            trigger: 'blur'
        }]
    },
    {
        label: '描述',
        type: 'input',
        prop: 'content',
        span: 24,
        Attributes: {
            type: 'textarea',
            maxlength: '100',
            placeholder: '请输入描述',
            style: {
                width: '400px'
            },
            autosize: { minRows: 6, maxRows: 10 }
        },
        rules: [{
            required: true,
            message: '请输入描述',
            trigger: 'blur'
        }]
    }, {
        label: '附件',
        type: 'upload',
        prop: 'fileUrl',
        endText: '只使用第一个文件'
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
        label: '文号',
        prop: 'title'
    },
    {
        label: '描述',
        prop: 'content'
    },
    {
        label: '附件',
        prop: 'fileName'
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
