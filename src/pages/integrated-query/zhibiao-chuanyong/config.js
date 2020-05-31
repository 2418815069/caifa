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
        label: '串用类别',
        prop: 'leiBie',
        width: '70px',
        options: [{
            label: '天然林分项变更',
            value: '1'
        }, {
            label: '采伐类型分项变更',
            value: '2'
        }]
    },
    {
        type: 'select',
        label: '年份',
        width: '44px',
        prop: 'nianFen',
        options: getYearArr()
    },
    {
        width: '44px',
        label: '单位',
        type: 'danWei',
        prop: 'danWei'
    }];
