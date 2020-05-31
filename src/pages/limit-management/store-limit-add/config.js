function buildYears() {
    let date = new Date();
    let year = Number(date.getFullYear()) - 4;
    let arr = [];
    for (let i = 0; i < 11; i++) {
        arr.push({ label: year + i, value: year + i });
    }
    return arr;
}
export const formConfigStep1 = [
    {
        label: '年份',
        type: 'select',
        prop: 'nianFen',
        span: 16,
        width: '72px',
        options: [
            ...buildYears()
        ],
        rules: [
            { required: true, message: '请输入年份', trigger: 'blur' }
        ]
    },
    {
        label: '起源',
        type: 'linFenQqYuan',
        isAllShow: false,
        span: 8,
        needLabel: true,
        prop: 'qiYuanComm',
        allProps: ['qiYuan', 'qiYuanMc'],
        width: '46px',
        rules: [
            { required: true, message: '请选择追加起源', trigger: 'blur' }
        ]
    },
    {
        label: '单位',
        type: 'danWei',
        prop: 'danWei',
        span: 16,
        guiKouShow: false,
        width: '72px',
        needLabel: true,
        rules: [
            { required: true, message: '请选择编限单位', trigger: 'blur',
                validator: function (rule, value, callback) {
                    if (!value) {
                        callback(new Error('请选择编限单位'));
                    } else if (value.value.length === 10) {
                        callback();
                    } else {
                        callback(new Error('请选择编限单位'));
                    }
                } }
        ]
    },
    {
        label: '权属',
        type: 'linMuQuanShu',
        prop: 'quanShuComm',
        isAllShow: false,
        needLabel: true,
        allProps: ['quanShu', 'quanShuMc'],
        span: 8,
        width: '46px',
        rules: [
            { required: true, message: '请选择追加权属', trigger: 'blur' }
        ]
    },
    {
        label: '追加类别',
        type: 'zhuiJiaLeiBie',
        prop: 'zhuiJiaLb',
        // allProps: ['zhuiJiaLb', 'zhuiJiaLx'],
        span: 8,
        width: '72px',
        needLabel: true,
        rules: [
            { required: true, message: '请选择追加类别', trigger: 'blur' }
        ]
    }
];

export const zhuiJiaListProps = [
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
        label: '商品林',
        option: [
            {
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
        option: [
            {
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
                label: '低产林改造',
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
    },
    {
        label: '操作',
        prop: 'action',
        fixed: 'right',
        formatActions() {
            return [
                {
                    label: '删除',
                    action: 'deleYuCunApi'
                }
            ];
        }
    }
];
