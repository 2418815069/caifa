export const listPropsConfig = [{
    label: '序号',
    prop: 'xuhao',
    format: function () {
        return arguments[2].$index + 1;
    }
}, {
    label: '名称',
    prop: 'jiaoSeMc'
}, {
    label: '描述',
    prop: 'jiaoSeMs'
}, {
    label: '操作',
    prop: 'action',
    fixed: 'right',
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
