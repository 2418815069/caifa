export const filterConfig = [
    {
        span: 8,
        label: '申请类型',
        type: 'select',
        prop: 'isXiane',
        width: '72px',
        options: [
            {
                label: '仅占限额',
                value: '2'
            },
            {
                label: '不占限额计划',
                value: '3'
            }
        ]
    }, {
        span: 16,
        width: '60px',
        label: '单位',
        type: 'danWei',
        prop: 'danWei'
    }, {
        label: '林木权属',
        type: 'linMuQuanShu',
        prop: 'linQuanDm',
        width: '72px',
        span: 8
    }, {
        label: '林分起源',
        type: 'linFenQqYuan',
        prop: 'qiYuanDm',
        width: '72px',
        span: 8
    }, {
        label: '数据来源',
        type: 'shuJuLaiYuan',
        prop: 'systemType',
        width: '72px',
        span: 8
    }, {
        label: '签发人',
        width: '72px',
        type: 'input',
        placeholder: '请输入签发人',
        prop: 'qianFaRen',
        span: 8
    }, {
        label: '申请单位',
        type: 'input',
        prop: 'shenQinRen',
        width: '72px',
        placeholder: '请输入申请单位（个人）',
        span: 8
    },
    {
        label: '申报号',
        type: 'input',
        prop: 'projid',
        width: '72px',
        placeholder: '请输入申报号',
        span: 8
    }, {
        label: '采伐类型',
        width: '72px',
        type: 'caiFaLeiXingFangShi',
        prop: 'caiFaLeiXingFangShi',
        itemStyle: {
            width: '300px'
        },
        allProps: ['caiFaLxdm', 'caiFaFsdm'],
        span: 13
    },
    {
        label: '事项名称',
        width: '72px',
        type: 'shiXiangMcZl',
        itemStyle: {
            width: '300px'
        },
        allProps: ['timberType', 'shiXiangJbm'],
        prop: 'shiXiangMcZl',
        span: 11
    },
    {
        label: '小地名',
        width: '72px',
        type: 'input',
        placeholder: '请输入小地名',
        prop: 'xiaoDiMing',
        span: 8
    },
    {
        label: '签发日期',
        type: 'dataPickter2',
        width: '72px',
        prop: 'qianFaTime',
        dateType: 'date',
        valueFormat: 'yyyy-MM-dd',
        allProps: ['qianFaSjq', 'qianFaSjz'],
        placeholder: '请选择申报日期',
        span: 13
    },
    {
        label: '采伐证号（或编号）',
        width: '142px',
        type: 'input',
        prop: 'caiFaZh',
        placeholder: '请输入采伐证号',
        span: 11
    }
];

export const listPropsConfig = [{
    label: '序号',
    prop: 'xuhao',
    format: function () {
        return arguments[2].$index + 1;
    }
}, {
    label: '采伐证号',
    prop: 'yuLiu1'
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
    label: '签发日期',
    prop: 'qianFaSj'
}, {
    label: '签发机构',
    prop: 'qianFaJiGou'
}, {
    label: '签发人',
    prop: 'qianFaRen'
}, {
    label: '申报号',
    prop: 'projid'
}, {
    label: '事项名称',
    prop: 'timberTypeMc'
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
                label: '打印流程单',
                action: 'printLiuChengDan'
            }
        ];
    }
}];


export const daoChuConfig = [
    {
        type: 'checkbox',
        needLabel: true,
        prop: 'check',
        options: [
            {
                label: '采伐证编号',
                prop: 'guid'
            },
            {
                label: '申请编号',
                prop: 'caiFaZh'
            },
            {
                label: '申请人',
                prop: 'shenQinRen'
            },
            {
                label: '手机号',
                prop: 'telphone'
            },
            {
                label: '采伐申请类型',
                prop: 'isXiane'
            },
            {
                label: '编限单位名称',
                prop: 'bianXianDwmc'
            },
            {
                label: '归口单位名称',
                prop: 'guiKouDwmc'
            },
            {
                label: '申请依据',
                prop: 'zuoYeHao'
            },
            {
                label: '林权证号',
                prop: 'linQuanZh'
            },
            {
                label: '宗地号',
                prop: 'zongDihao'
            },
            {
                label: '林场',
                prop: 'linChang'
            },
            {
                label: '工作区',
                prop: 'gongZuoQu'
            },
            {
                label: '林班',
                prop: 'linBan'
            },
            {
                label: '小班',
                prop: 'xiaoBan'
            },
            {
                label: '小地名',
                prop: 'xiaoDiMing'
            },
            {
                label: '东至',
                prop: 'sbjDong'
            },
            {
                label: '南至',
                prop: 'sbjNan'
            },
            {
                label: '西至',
                prop: 'sbjXi'
            },
            {
                label: '北至',
                prop: 'sbjBei'
            },
            {
                label: '东北X',
                prop: 'gpsDbx'
            },
            {
                label: '东北Y',
                prop: 'gpsDby'
            },
            {
                label: '东南X',
                prop: 'gpsDnx'
            },
            {
                label: '东南Y',
                prop: 'gpsDny'
            },
            {
                label: '西北X',
                prop: 'gpsXbx'
            },
            {
                label: '西北Y',
                prop: 'gpsXby'
            },
            {
                label: '西南X',
                prop: 'gpsXnx'
            },
            {
                label: '西南Y',
                prop: 'gpsXny'
            },
            {
                label: '林木权属',
                prop: 'linQuanMc'
            },
            {
                label: '林木起源',
                prop: 'qiYuanMc'
            },
            {
                label: '森林分类',
                prop: 'senLinLbmc'
            },
            {
                label: '林种',
                prop: 'linZhongMc'
            },
            {
                label: '优势树种',
                prop: 'shuZhongMc'
            },
            {
                label: '采伐类型',
                prop: 'caiFaLxmc'
            },
            {
                label: '采伐方式',
                prop: 'caiFaFsmc'
            },
            {
                label: '采伐面积',
                prop: 'caiFaMj'
            },
            {
                label: '小班蓄积',
                prop: 'xiaoBanXj'
            },
            {
                label: '采伐蓄积',
                prop: 'caiFaXj'
            },
            {
                label: '采伐出材',
                prop: 'caiFaCc'
            },
            {
                label: '采伐株数',
                prop: 'caiFaZs'
            },
            {
                label: '郁闭度',
                prop: 'yuBiDu'
            },
            {
                label: '积蓄强度',
                prop: 'zhuShuQd'
            },
            {
                label: '株数强度',
                prop: 'zhuShuQd'
            }, {
                label: '采伐期限起',
                prop: 'caiFaQxq'
            }, {
                label: '采伐期限止',
                prop: 'caiFaQxz'
            }, {
                label: '更新方式',
                prop: 'gengXingFsmc'
            }, {
                label: '更新面积',
                prop: 'gengXingMjdw'
            }, {
                label: '更新树种',
                prop: 'gengXingSz'
            }, {
                label: '更新期限',
                prop: 'gengXingQx'
            }, {
                label: '更新株数',
                prop: 'gengXingZs'
            }, {
                label: '发证人',
                prop: 'qianFaRen'
            }, {
                label: '发证机构',
                prop: 'qianFaJiGou'
            }, {
                label: '领证人',
                prop: 'lingZhengRen'
            }, {
                label: '发证日期',
                prop: 'qianFaSj'
            }, {
                label: '备注',
                prop: 'beiZhu'
            }
        ]
    }
];
