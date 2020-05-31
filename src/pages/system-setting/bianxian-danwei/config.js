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

