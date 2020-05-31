import linMuQuanShuComm from '@/components/common/linmu-quanshu';
import linFenQiYuanComm from '@/components/common/linfen-qiyuan';
import wenHaoComm from '@/components/common/wenHao';
import danWeiComm from '@/components/common/danwei';


function addBuildYears() {
    let date = new Date();
    let year = Number(date.getFullYear());
    let arr = [];
    for (let i = 0; i < 7; i++) {
        arr.push({ label: year + i, value: year + i });
    }
    return arr;
}

const addFormConfig = [
    {
        // 限额类别，1为常规，2为追加
        label: '限额类型',
        type: 'select',
        prop: 'xianeLeiBie',
        span: 12,
        width: '72px',
        options: [
            {
                label: '常规限额',
                value: '1'
            },
            {
                label: '追加限额',
                value: '2'
            }
        ]
    },
    {
        label: '年份',
        type: 'select',
        prop: 'nianFen',
        span: 8,
        width: '46px',
        style: {
            width: '100px'
        },
        options: [
            ...addBuildYears()
        ],
        rules: [
            { required: true, message: '请选择年份', trigger: 'blur' }
        ]
    },
    {
        span: 24,
        width: '72px',
        label: '单位',
        guiKouShow: false,
        needLabel: true,
        components: danWeiComm,
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
        ],
        prop: 'danWei'
    },
    {
        label: '权属',
        prop: 'quanShuX',
        allProps: ['quanShu', 'quanShuMc'],
        span: 12,
        isAllShow: false,
        needLabel: true,
        width: '72px',
        rules: [
            { required: true, message: '请选择权属', trigger: 'blur' }
        ],
        components: linMuQuanShuComm
    },
    {
        label: '起源',
        prop: 'qiYuanX',
        allProps: ['qiYuan', 'qiYuanMc'],
        needLabel: true,
        width: '46px',
        span: 8,
        isAllShow: false,
        rules: [
            { required: true, message: '请选择起源', trigger: 'blur' }
        ],
        components: linFenQiYuanComm
    }
];


const formList = [
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


export {
    addFormConfig,
    danWeiComm,
    wenHaoComm,
    formList
};

