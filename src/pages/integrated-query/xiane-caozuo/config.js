function getYearArr() {
    let date = new Date();
    let year = Number(date.getFullYear()) + 1 - 9;
    let arr = [];
    for (let i = 0; i < 10; i++) {
        arr.push({label: year + i, value: year + i});
    }
    return arr;
}
export const filterConfig = [
    {
        type: 'select',
        label: '操作类别',
        prop: 'leiBie',
        width: '72px',
        options: [{
            label: '下达',
            value: '1'
        }, {
            label: '追加',
            value: '2'
        }, {
            label: '收回',
            value: '3'
        }]
    }, {
        type: 'select',
        label: '年份',
        width: '44px',
        prop: 'nianFen',
        options: getYearArr()
    },
    {
        label: '追加来自于',
        type: 'select',
        width: '90px',
        prop: 'zhuiJiaLx',
        disabled: true,
        options: [
            {
                label: '请选择',
                value: 'null'
            },
            {
                label: '省预留',
                value: '1'
            },
            {
                label: '国家',
                value: '2'
            }
        ]
    }, {
        label: '追加类别',
        type: 'select',
        width: '72px',
        prop: 'zhuiJiaLb',
        disabled: true,
        options: []
    },
    {
        span: 16,
        width: '44px',
        label: '单位',
        type: 'danWei',
        prop: 'danWei'
    }];
