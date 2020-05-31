import danWeiComm from '@/components/common/danwei';

function buildYears() {
    let date = new Date();
    let year = Number(date.getFullYear()) - 4;
    let arr = [];
    for (let i = 0; i < 11; i++) {
        arr.push({ label: year + i, value: year + i });
    }
    return arr;
}
export const filterConfig = [
    {
        label: '年份',
        type: 'select',
        prop: 'nianFen',
        span: 8,
        width: '46px',
        options: [
            ...buildYears()
        ]
    }, {
        span: 16,
        width: '46px',
        label: '单位',
        components: danWeiComm,
        prop: 'bianXianBm',
        guiKouShow: false
    }];

export const listPropsConfig = [
    {
        label: '单位',
        prop: 'bianXianMc'
    },
    {
        label: '权属',
        prop: 'quanShuMc'
    },
    {
        label: '起源',
        prop: 'qiYuanMc'
    },
    {
        label: '商品林主伐',
        prop: 'splZf'
    },
    {
        label: '商品林抚育采伐',
        prop: 'splFyf'
    },
    {
        label: '商品林低产林改造',
        prop: 'splDg'
    },
    {
        label: '商品林其他采伐',
        prop: 'splQtcf'
    },
    {
        label: '生态公益林更新主伐',
        prop: 'gylGxcf'
    },
    {
        label: '生态公益林抚育采伐',
        prop: 'gylFycf'
    },
    {
        label: '生态公益林低产林改造',
        prop: 'gylDg'
    },
    {
        label: '生态公益林其他采伐',
        prop: 'gylQtcf'
    },
    {
        label: '毛竹',
        prop: 'maoZhu'
    }
];
