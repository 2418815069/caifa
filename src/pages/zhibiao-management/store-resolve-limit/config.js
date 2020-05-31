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
        span: 8,
        width: '46px',
        options: [
            ...buildYears()
        ],
        rules: [
            { required: true, message: '请输入年份', trigger: 'blur' }
        ]
    },
    {
        label: '单位',
        type: 'danWei',
        prop: 'danWei',
        span: 16,
        width: '46px',
        needLabel: true
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
        label: '起源',
        type: 'linFenQqYuan',
        isAllShow: false,
        span: 16,
        needLabel: true,
        prop: 'qiYuanComm',
        allProps: ['qiYuan', 'qiYuanMc'],
        width: '46px',
        rules: [
            { required: true, message: '请选择追加起源', trigger: 'blur' }
        ]
    }
];

export const yuCunListProps = [
    {
        label: '单位',
        prop: 'guiKouMc'
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
        width: 150,
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
