export const listPropsConfig = [{
    label: '序号',
    prop: 'xuhao',
    width: 120,
    format: function () {
        return arguments[2].$index + 1;
    }
}, {
    label: '标题',
    prop: 'title'
},
{
    label: '操作',
    formatActions() {
        return [
            {
                label: '查看',
                action: 'view'
            }
        ];
    }
}
];
