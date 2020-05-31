export const getUuid = ()=>{
    function s4() {
        return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};


// 继承相关
export const jiChengFormConfig = [
    {
        span: 8,
        label: '申请类型',
        type: 'select',
        prop: 'isXiane',
        options: [
            {
                label: '请选择',
                value: 'null'
            },
            {
                label: '占限额计划',
                value: '1'
            },
            {
                label: '仅占限额',
                value: '2'
            },
            {
                label: '不占限额',
                value: '3'
            },
            {
                label: '专项追加限额',
                value: '4'
            }
        ]
    }, {
        span: 16,
        width: '60px',
        label: '单位',
        type: 'danWei',
        prop: 'danWei'
    }, {
        label: '申请人',
        type: 'input',
        placeholder: '请输入签发人',
        prop: 'shenQinRen',
        span: 8
    },
    {
        label: '申报日期',
        type: 'dataPickter2',
        prop: 'dateTime',
        dateType: 'date',
        valueFormat: 'yyyy-MM-dd',
        allProps: ['shenQingSjq', 'shenQingSjz'],
        placeholder: '请选择申报日期',
        span: 14
    }];

export const jiChengListProps = [{
    label: '序号',
    prop: 'xuhao',
    format: function () {
        return arguments[2].$index + 1;
    }
}, {
    label: '申请编号',
    prop: 'caiFaZh'
}, {
    label: '申请人',
    prop: 'shenQinRen'
}, {
    label: '采伐蓄积',
    prop: 'caiFaXj'
}, {
    label: '采伐株数',
    prop: 'sjcfZhuShu'
}, {
    label: '申请日期',
    prop: 'shenQingSj'
}, {
    label: '申请机构',
    prop: 'shenQingJiGou'
}, {
    label: '申报人',
    prop: 'shenQingCzr'
}, {
    label: '当前状态',
    prop: 'flowStateMc'
}, {
    label: '操作',
    prop: 'action',
    fixed: 'right',
    width: 150,
    formatActions() {
        return [
            {
                label: '继承',
                action: 'jiCheng'
            }
        ];
    }
}];
