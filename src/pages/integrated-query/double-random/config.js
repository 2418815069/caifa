
export const filterConfig = [
    {
        label: '单位',
        type: 'danWei',
        width: '72px',
        prop: 'danWei',
        bianXianShow: false,
        guiKouShow: false,
        needLabel: true
    },
    {
        label: '日期',
        width: '72px',
        type: 'dataPickter2',
        prop: 'dateTime',
        dateType: 'date',
        valueFormat: 'yyyy-MM-dd',
        allProps: ['beginDate', 'endDate'],
        placeholder: '请选择申报日期',
        span: 14
    }];

export const listPropsConfig = [{
    label: '序号',
    prop: 'xuhao',
    format: function () {
        return arguments[2].$index + 1;
    }
},
{
    label: '场地场所名称',
    prop: 'caiFaZh'
},
{
    label: '专项库大类',
    prop: 'linChang1'
},
{
    label: '专项小类名城',
    prop: 'bianXianMc'
}, {
    label: '监察部门',
    prop: 'qiYuanMc'
}, {
    label: '地区',
    prop: 'zuoYeHao'
}, {
    label: '区县',
    prop: 'linQuanZh'
}, {
    label: '乡镇街道',
    prop: 'gongZuoQu'
}, {
    label: '所在地',
    prop: 'linBan'
}, {
    label: '类别',
    prop: 'xiaoDiMing'
}, {
    label: '相关方',
    prop: 'caiFaMj'
}, {
    label: '证件号',
    prop: 'sbjBei'
}, {
    label: '联系人',
    prop: 'sbjXi'
}, {
    label: '联系电话',
    prop: 'sbjNan'
},
{
    label: '备注',
    prop: 'caiFaXj'
},
{
    label: '许可证编号',
    prop: 'xkzBh'
},
{
    label: '许可证名称',
    prop: 'xkzMc'
},
{
    label: '许可证批准日期',
    prop: 'xkzPisj'
},
{
    label: '许可证有效期至',
    prop: 'xkzYxsj'
},
{
    label: '许可发证机关',
    prop: 'qzjg'
}
];

