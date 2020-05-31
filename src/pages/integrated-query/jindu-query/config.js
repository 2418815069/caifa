
function getTimeBy() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
}

export const filterConfig = [
    {
        span: 8,
        label: '申请类型',
        type: 'select',
        width: '72px',
        prop: 'isXiane',
        options: []
    }, {
        span: 16,
        width: '60px',
        label: '单位',
        type: 'danWei',
        prop: 'danWei'
    }, {
        label: '申报号',
        type: 'input',
        width: '72px',
        prop: 'projid',
        placeholder: '请输入申报号',
        span: 8
    }, {
        label: '申请单位',
        type: 'input',
        // width: '154px',
        prop: 'shenQinRen',
        width: '72px',
        placeholder: '请输入申请单位(个人)',
        span: 8
    },
    {
        label: '数据来源',
        type: 'shuJuLaiYuan',
        prop: 'systemType',
        width: '72px',
        span: 8
    },
    {
        label: '事项名称',
        type: 'shiXiangMcZl',
        width: '72px',
        allProps: ['timberType', 'shiXiangJbm'],
        prop: 'shiXiangMcZl',
        span: 13
    },
    {
        label: '采伐证号（或编号）',
        width: '142px',
        type: 'input',
        prop: 'caiFaZh',
        placeholder: '请输入采伐证号',
        span: 9
    },

    {
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
    prop: 'sjcfZhuShu'
}, {
    label: '申请时间',
    prop: 'shenQingSj'
}, {
    label: '申报人',
    prop: 'shenQingCzr'
}, {
    label: '申报机构',
    prop: 'shenQingJiGou'
}, {
    label: '事项名称',
    prop: 'timberTypeMc'
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
            case '6':
                return '浙里办APP';
            default:
                return '';
        }
    }
}, {
    label: '状态',
    prop: 'flowStateMc'
}, {
    label: '承诺时限',
    prop: 'commitmentDate',
    format: function (x, row) {
        if (row.flowstate === '1' || row.flowstate === '2' || row.flowstate === '4' || row.flowstate === '6' || row.flowstate === '7') {
            return row.commitmentDate;
        }
        return '';
    }
},
{
    label: '法定时限',
    prop: 'approveDate',
    format: function (x, row) {
        if (row.flowstate === '1' || row.flowstate === '2' || row.flowstate === '4' || row.flowstate === '6' || row.flowstate === '7') {
            return row.approveDate;
        }
        return '';
    }
},
{
    label: '时限状态',
    prop: 'dateStatus',
    returnHtml: function (row) {
        if (row.flowstate === '1' || row.flowstate === '2' || row.flowstate === '4' || row.flowstate === '6' || row.flowstate === '7') {
            let status = row.dateStatus;
            if (status === 0) {
                return '<div style="width: 30px;height: 30px;background:green;"></div>';
            }

            if (status === 1) {
                return '<div style="width: 30px;height: 30px;background:yellow;"></div>';
            }

            if (status === 2) {
                return '<div style="width: 30px;height: 30px;background:red;"></div>';
            }

            if (status === 3) {
                return '<div style="width: 30px;height: 30px;background:black;"></div>';
            }
        }
        return '<div></div>';
    }
},
{
    label: '已经办天数',
    prop: 'ybts',
    format: function (value, index) {
        let nowTime = new Date(getTimeBy()).getTime();
        let shenQingSjTime = new Date(index.shenQingSj.substring(0, 10)).getTime();
        let dayTime = 24 * 60 * 60 * 1000;
        if (nowTime - shenQingSjTime < dayTime) {
            return '0';
        }
        return (nowTime - shenQingSjTime) / dayTime;
    }
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
            }
        ];
    }
}];

