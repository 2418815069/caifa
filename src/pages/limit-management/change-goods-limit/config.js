
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
        components: danWeiComm,
        prop: 'bianXianBm'
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
        label: '分类',
        returnHtml: function () {
            return '<div><div>积蓄</div></div>';
        }
    },
    {
        label: '生态公益林',
        option: [{
            label: '合计',
            option: [
                {
                    label: '剩余',
                    prop: 'sGylHj'
                },
                {
                    label: '总量',
                    prop: 'zGylHj'
                }
            ]
        },
        {
            label: '更新采伐',
            option: [
                {
                    label: '剩余',
                    prop: 'sgylGxcf'
                },
                {
                    label: '总量',
                    prop: 'zgylGxcf'
                }
            ]
        },
        {
            label: '抚育采伐',
            option: [
                {
                    label: '剩余',
                    prop: 'sgylFycf'
                },
                {
                    label: '总量',
                    prop: 'zgylFycf'
                }
            ]
        },
        {
            label: '低产林改造',
            option: [
                {
                    label: '剩余',
                    prop: 'sgylDgcf'
                },
                {
                    label: '总量',
                    prop: 'zgylDg'
                }
            ]
        },
        {
            label: '其他采伐',
            option: [
                {
                    label: '剩余',
                    prop: 'sgylQtcf'
                }, {
                    label: '总量',
                    prop: 'zgylQtcf'
                } ]
        }
        ]
    },
    {
        label: '商品林',
        option: [{
            label: '合计',
            option: [
                {
                    label: '剩余',
                    prop: 'sSplHj'
                }, {
                    label: '总量',
                    prop: 'zSplHj'
                }
            ]
        },
        {
            label: '主伐',
            option: [
                {
                    label: '剩余',
                    prop: 'ssplZf'
                },
                {label: '总量',
                    prop: 'zsplZf'
                }
            ]
        },
        {
            label: '抚育采伐',
            option: [
                {
                    label: '剩余',
                    prop: 'ssplFycf'
                },
                {
                    label: '总量',
                    prop: 'zsplFyf'
                }
            ]
        },
        {
            label: '低产林改造',
            option: [
                {
                    label: '剩余',
                    prop: 'ssplDg'
                },
                {
                    label: '总量',
                    prop: 'zsplDg'
                }
            ]
        },
        {
            label: '其他采伐',
            option: [
                {
                    label: '剩余',
                    prop: 'ssplQtcf'
                },
                {
                    label: '总量',
                    prop: 'zsplQtcf'
                } ]
        }
        ]
    },
    {
        label: '毛竹',
        option: [
            {
                label: '剩余',
                prop: 'smaoZhu'
            },
            {label: '总量',
                prop: 'zmaoZhu'
            }

        ]
    }, {
        label: '操作',
        prop: 'action',
        width: 150,
        fixed: 'right',
        formatActions() {
            return [
                {
                    label: '变更',
                    action: 'huiShou'
                }
            ];
        }
    }
];


function getBianGengHtml(jixuValue, chuCaiValue, jixuProp, chuCaiProp, isNeedValue) {
    if (isNeedValue) {
        return `<div style="height:50px">
    <div style="height:50px;border-bottom:1px solid #EBEEF5">
        <div style="border-bottom:1px solid #EBEEF5;color:red">${jixuValue}</div><div><input prop=${jixuProp} value=${jixuValue} style="width:80%"></input></div>
        </div>
        </div>`;
    }
    return `<div style="height:50px">
    <div style="height:50px;border-bottom:1px solid #EBEEF5">
        <div style="border-bottom:1px solid #EBEEF5;color:red">${jixuValue}</div><div><input prop=${jixuProp} value=${0} style="width:80%"></input></div>
        </div>
        </div>`;
}

export const bianGenglistPropsConfig = [
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
        label: '分类',
        returnHtml: function () {
            return '<div style="height:50px;"><div style="border-bottom:1px solid #EBEEF5;height:50px">积蓄</div></div>';
        }
    },
    {
        label: '生态公益林',
        needReturnHtml: true,
        option: [
            {
                label: '合计',
                returnHtml: function (row) {
                    return getBianGengHtml(row.sGylHj, row.sSplCcHj);
                }
            },
            {
                label: '抚育采伐',
                returnHtml: function (row) {
                    return getBianGengHtml(row.sgylFycf, row.sgylFycfCc, 'gylFycf', 'gylFycfCc');
                }
            },
            {
                label: '更新采伐',
                returnHtml: function (row) {
                    return getBianGengHtml(row.sgylGxcf, row.sgylGxcfCc, 'gylGxcf', 'gylGxcfCc', true);
                }
            },
            {
                label: '低产林改造',
                returnHtml: function (row) {
                    return getBianGengHtml(row.sgylDgcf, row.sgylDgcfCc, 'gylDg', 'gylDgCc');
                }
            },
            {
                label: '其他采伐',
                returnHtml: function (row) {
                    return getBianGengHtml(row.sgylQtcf, row.sgylQtcfCc, 'gylQtcf', 'gylQtcfCc');
                }
            }
        ]
    },
    {
        label: '商品林',
        needReturnHtml: true,
        option: [
            {
                label: '合计',
                returnHtml: function (row) {
                    return getBianGengHtml(row.sSplHj, row.sSplCcHj);
                }
            },
            {
                label: '主伐',
                returnHtml: function (row) {
                    return getBianGengHtml(row.ssplZf, row.ssplZfCc, 'splZf', 'splZfCc', true);
                }
            },
            {
                label: '抚育采伐',
                returnHtml: function (row) {
                    return getBianGengHtml(row.ssplFycf, row.ssplFycfCc, 'splFyf', 'splFyfCc');
                }
            },
            {
                label: '低产林改造',
                returnHtml: function (row) {
                    return getBianGengHtml(row.ssplDg, row.ssplDgCc, 'splDg', 'splDgCc');
                }
            },
            {
                label: '其他采伐',
                returnHtml: function (row) {
                    return getBianGengHtml(row.ssplQtcf, row.ssplQtcfCc, 'splQtcf', 'splQtcfCc');
                }
            }
        ]
    },
    {
        label: '毛竹',
        needReturnHtml: true,
        returnHtml: function (row) {
            return getBianGengHtml(row.smaoZhu, row.smaoZhuCc, 'maoZhu', 'maoZhuCc');
        }
    }
];
