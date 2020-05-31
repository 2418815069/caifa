export const listPropsConfig = [{
    label: '序号',
    prop: 'xuhao',
    format: function () {
        return arguments[2].$index + 1;
    }
}, {
    label: '申报号',
    prop: 'projid'
}, {
    label: '申请编号',
    prop: 'caiFaZh'
},
{
    label: '申请人',
    prop: 'shenQinRen'
}, {
    label: '小班',
    prop: 'xiaoBan'
}, {
    label: '采伐蓄积',
    prop: 'caiFaXj'
}, {
    label: '采伐株数',
    prop: 'caiFaZs'
}, {
    label: '申请日期',
    prop: 'shenQingSj'
}, {
    label: '申请机构',
    prop: 'shenQingJiGou'
}, {
    label: '事项名称',
    prop: 'timberType',
    format: function (text) {
        switch (text) {
            case '1':
                return '一般林木';
            case '2':
                return '珍贵树木';
            case '3':
                return '沿海保护林带';
            default :
                return '';
        }
    }
}, {
    label: '当前状态',
    prop: 'flowStateMc'
}, {
    label: '数据来源',
    prop: 'systemType',
    format: function (text) {
        switch (text) {
            case '1':
                return '在线申报';
            case '2':
                return '一窗平台';
            case '3':
                return '自建系统';
            case '4':
                return '投资平台';
            case '5':
                return '手机申请';
            default :
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
                label: '查看',
                action: 'view'
            },
            {
                label: '决定',
                action: 'verify'
            }
        ];
    }
}];


export const filterConfig = [
    {
        label: '申请类型',
        type: 'select',
        prop: 'isXiane',
        span: 8,
        width: '72px',
        options: [
            {
                label: '请选择',
                value: 'null'
            },
            {
                label: '不占限额计划',
                value: '3'
            },
            {
                label: '占限额计划',
                value: '2'
            }
        ]
    }, {
        span: 16,
        width: '46px',
        label: '单位',
        type: 'danWei',
        prop: 'danWei'
    }, {
        label: '事项名称',
        width: '72px',
        type: 'shiXiangMcZl',
        prop: 'shiXiangMcZl',
        allProps: ['timber_type', 'shiXiangJbm'],
        span: 16
    }, {
        span: 8,
        label: '申请人',
        type: 'input',
        width: '72px',
        prop: 'shenQinRen',
        placeholder: '请输入申请人'
    }, {
        label: '申报日期',
        width: '72px',
        type: 'dataPickter2',
        prop: 'dateTime',
        dateType: 'date',
        valueFormat: 'yyyy-MM-dd',
        allProps: ['shenQingSjq', 'shenQingSjz'],
        placeholder: '请选择申报日期',
        span: 14
    }];
