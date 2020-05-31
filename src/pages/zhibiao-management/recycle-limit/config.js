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
        span: 8,
        options: [
            ...buildYears()
        ]
    }, {
        span: 16,
        label: '单位',
        width: '46px',
        guiKouShow: false,
        components: danWeiComm,
        prop: 'bianxianBm'
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
            option: [{label: '总量', prop: 'zSplHj'}, {label: '剩余', prop: 'sSplHj'}]
        },
        {
            label: '主伐',
            option: [{label: '总量', prop: 'zsplZf'}, {label: '剩余', prop: 'ssplZf'}]
        },
        {
            label: '抚育采伐',
            option: [{label: '总量', prop: 'zsplFyf'}, {label: '剩余', prop: 'ssplFycf'}]
        },
        {
            label: '低产林改造',
            option: [{label: '总量', prop: 'zsplDg'}, {label: '剩余', prop: 'ssplDg'}]
        },
        {
            label: '其他采伐',
            option: [{label: '总量', prop: 'zsplQtcf'}, {label: '剩余', prop: 'ssplQtcf'}]
        }
        ]
    },
    {
        label: '生态公益林',
        option: [{
            label: '合计',
            option: [{label: '总量', prop: 'zGylHj'}, {label: '剩余', prop: 'sGylHj'}]
        },
        {
            label: '更新采伐',
            option: [{label: '总量', prop: 'zgylGxcf'}, {label: '剩余', prop: 'sgylGxcf'}]
        },
        {
            label: '抚育采伐',
            option: [{label: '总量', prop: 'zgylFycf'}, {label: '剩余', prop: 'sgylFycf'}]
        },
        {
            label: '低产林改造',
            option: [{label: '总量', prop: 'zgylDg'}, {label: '剩余', prop: 'sgylDgcf'}]
        },
        {
            label: '其他采伐',
            option: [{label: '总量', prop: 'zgylQtcf'}, {label: '剩余', prop: 'sgylQtcf'}]
        }
        ]
    },
    {
        label: '毛竹',
        option: [{label: '总量', prop: 'zmaoZhu'}, {label: '剩余', prop: 'smaoZhu'}]
    }, {
        label: '操作',
        prop: 'action',
        width: 150,
        fixed: 'right',
        formatActions() {
            return [
                {
                    label: '收回',
                    action: 'huiShou'
                }
            ];
        }
    }
];
