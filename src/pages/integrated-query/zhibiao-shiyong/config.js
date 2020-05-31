function buildYears() {
    let date = new Date();
    let year = Number(date.getFullYear()) - 4;
    let arr = [];
    for (let i = 0; i < 6; i++) {
        arr.push({ label: year + i, value: year + i });
    }
    return arr;
}
export const filterConfig = [
    {
        label: '指标类型',
        type: 'select',
        prop: 'isUse',
        width: '72px',
        options: [
            {
                label: '指标使用',
                value: '1'
            },
            {
                label: '指标查询',
                value: '0'
            }
        ]
    },
    {
        label: '年份',
        type: 'select',
        prop: 'nianFen',
        width: '50px',
        span: 8,
        options: [
            ...buildYears()
        ]
    },
    {
        span: 16,
        label: '单位',
        type: 'danWei',
        prop: 'danWeiCode',
        width: '72px'
    }];


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
            default:
                return '';
        }
    }
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
            default:
                return '';
        }
    }
}, {
    label: '状态',
    prop: 'zhuangTai',
    format: function (text) {
        switch (text) {
            case '0':
                return '已申请';
            case '1':
                return '待发放';
            case '2':
                return '打印文书';
            case '4':
                return '已签发';
            case '5':
                return '作废';
            case '6':
                return '终止';
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
                label: '受理',
                action: 'acceptance'
            },
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

export const chartsOptions = {
    legend: {},
    tooltip: {},
    dataset: {
        dimensions: ['product', '总量', '剩余'],
        source: [
            {product: '公益林抚育采伐', 总量: 0, 剩余: 0 },
            {product: '公益林更新采伐', 总量: 0, 剩余: 0},
            {product: '公益林其他采伐', 总量: 0, 剩余: 0},
            {product: '商品林主伐', 总量: 0, 剩余: 0},
            {product: '商品林抚育采伐', 总量: 0, 剩余: 0},
            {product: '商品林其他采伐', 总量: 0, 剩余: 0}
        ]
    },
    xAxis: {type: 'category'},
    yAxis: {},
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [
        {type: 'pie'},
        {type: 'pie'}
    ]
};
