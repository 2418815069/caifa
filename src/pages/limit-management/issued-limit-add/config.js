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
        width: '46px',
        span: 16,
        options: [
            ...buildYears()
        ]
    }, {
        label: '追加来自于',
        span: 8,
        prop: 'zhuiJiaLx',
        type: 'select',
        width: '86px',
        options: [{
            label: '省预留',
            value: '1'
        },
        {
            label: '国家',
            value: '2'
        }
        ]
    }, {
        span: 16,
        label: '单位',
        width: '46px',
        guiKouShow: false,
        components: danWeiComm,
        prop: 'bianXianBm'
    }];

export const listPropsConfig = [
    {
        label: '单位',
        prop: 'bianXianMc'
    },
    {
        label: '类型',
        prop: 'zhuiJiaLxmc'
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
        label: '商品林',
        option: [{
            label: '合计',
            prop: 'splHj'
        },
        {
            label: '主伐',
            prop: 'splZf'
        },
        {
            label: '抚育采伐',
            prop: 'splFyf'
        },
        {
            label: '低产林改造',
            prop: 'splDg'
        },
        {
            label: '其他采伐',
            prop: 'splQtcf'
        }
        ]
    },
    {
        label: '生态公益林',
        option: [{
            label: '合计',
            prop: 'gylHj'
        },
        {
            label: '更新采伐',
            prop: 'gylGxcf'
        },
        {
            label: '抚育采伐',
            prop: 'gylFycf'
        },
        {
            label: '地产林改造',
            prop: 'gylDg'
        },
        {
            label: '其他采伐',
            prop: 'gylQtcf'
        }
        ]
    },
    {
        label: '毛竹',
        prop: 'maoZhu'
    }
];
