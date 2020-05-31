import LimitTable from '../components/limit-table';
import linMuQuanShuComm from '@/components/common/linmu-quanshu';
import linFenQiYuanComm from '@/components/common/linfen-qiyuan';
import wenHaoComm from '@/components/common/wenHao';
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

function addBuildYears() {
    let date = new Date();
    let year = Number(date.getFullYear());
    let arr = [];
    for (let i = 0; i < 7; i++) {
        arr.push({ label: year + i, value: year + i });
    }
    return arr;
}

function getHtml(title) {
    return `<div style="color:#89bca9"><span style="width: 8px;
  display: inline-block;
  height: 20px;
  vertical-align: sub;
  background:#88b780;
  margin-right: 10px;"></span>${title}</div>
  `;
}
const addFormConfig = [
    {
        type: 'html',
        span: 24,
        render: () => {
            return getHtml('新增预存限额');
        }
    },
    {
        label: '年份',
        type: 'select',
        prop: 'nianFen',
        span: 8,
        width: '46px',
        options: [
            ...addBuildYears()
        ],
        rules: [
            { required: true, message: '请选择年份', trigger: 'blur' }
        ]
    },
    {
        label: '文号',
        prop: 'wenHao',
        width: '46px',
        span: 8,
        isAllShow: false,
        components: wenHaoComm,
        rules: [
            { required: true, message: '请选择文号', trigger: 'blur' }
        ]
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
    },
    {
        span: 16,
        width: '46px',
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
        span: 8,
        isAllShow: false,
        needLabel: true,
        width: '46px',
        rules: [
            { required: true, message: '请选择权属', trigger: 'blur' }
        ],
        components: linMuQuanShuComm
    },
    {
        type: 'html',
        span: 24,
        render: () => {
            return getHtml('商品林');
        }
    },
    {
        type: 'select',
        prop: 'splTable',
        components: LimitTable,
        span: 24,
        elFormItemBlock: true,
        width: '200px',
        colums: [
            {
                prop: 'splZf',
                label: '主伐',
                width: '200'
            }, {
                prop: 'splFyf',
                label: '抚育采伐',
                width: '200'
            }, {
                prop: 'splDg',
                label: '低产林改造',
                width: '200'
            }, {
                prop: 'splQtcf',
                label: '其他采伐',
                width: '200'
            }
        ]
    },
    {
        type: 'html',
        span: 24,
        render: () => {
            return getHtml('生态公益林');
        }
    },
    {
        type: 'select',
        prop: 'gylTable',
        components: LimitTable,
        span: 24,
        elFormItemBlock: true,
        width: '200px',
        colums: [
            {
                prop: 'gylGxcf',
                label: '更新主伐',
                width: '200'
            }, {
                prop: 'gylFycf',
                label: '抚育采伐',
                width: '200'
            }, {
                prop: 'gylDg',
                label: '低产林改造',
                width: '200'
            }, {
                prop: 'gylQtcf',
                label: '其他采伐',
                width: '200'
            }
        ]
    },
    {
        type: 'html',
        span: 24,
        render: () => {
            return getHtml('毛竹');
        }
    },
    {
        type: 'input',
        prop: 'maoZhu',
        span: 8,
        width: '60px'
    }
];

// 编辑弹窗config
const editFormConfig = [
    {
        type: 'html',
        span: 24,
        render: () => {
            return getHtml('修改预存限额');
        }
    },
    {
        label: '起源',
        prop: 'qiYuanX',
        allProps: ['qiYuan', 'qiYuanMc'],
        needLabel: true,
        width: '60px',
        span: 8,
        isAllShow: false,
        components: linFenQiYuanComm,
        rules: [
            { required: true, message: '请选择起源', trigger: 'blur' }
        ]
    },
    {
        label: '权属',
        prop: 'quanShuX',
        allProps: ['quanShu', 'quanShuMc'],
        span: 8,
        isAllShow: false,
        needLabel: true,
        width: '60px',
        components: linMuQuanShuComm,
        rules: [
            { required: true, message: '请选择权属', trigger: 'blur' }
        ]
    },
    {
        type: 'html',
        span: 24,
        render: () => {
            return getHtml('商品林');
        }
    },
    {
        type: 'select',
        prop: 'splTable',
        components: LimitTable,
        span: 24,
        elFormItemBlock: true,
        width: '200px',
        colums: [
            {
                prop: 'splZf',
                label: '主伐',
                width: '200'
            }, {
                prop: 'splFyf',
                label: '抚育采伐',
                width: '200'
            }, {
                prop: 'splDg',
                label: '低产林改造',
                width: '200'
            }, {
                prop: 'splQtcf',
                label: '其他采伐',
                width: '200'
            }
        ]
    },
    {
        type: 'html',
        span: 24,
        render: () => {
            return getHtml('生态公益林');
        }
    },
    {
        type: 'select',
        prop: 'gylTable',
        components: LimitTable,
        span: 24,
        elFormItemBlock: true,
        width: '200px',
        colums: [
            {
                prop: 'gylGxcf',
                label: '更新主伐',
                width: '200'
            }, {
                prop: 'gylFycf',
                label: '抚育采伐',
                width: '200'
            }, {
                prop: 'gylDg',
                label: '低产林改造',
                width: '200'
            }, {
                prop: 'gylQtcf',
                label: '其他采伐',
                width: '200'
            }
        ]
    },
    {
        type: 'html',
        span: 24,
        render: () => {
            return getHtml('毛竹');
        }
    },
    {
        type: 'input',
        prop: 'maoZhu',
        span: 8,
        width: '60px'
    }
];

const daoRuConfig = [
    {
        label: '年份',
        type: 'select',
        prop: 'nianFen',
        span: 12,
        width: '60px',
        options: [
            ...buildYears()
        ]
    },
    {
        label: '文号',
        prop: 'wenHao',
        span: 12,
        width: '60px',
        components: wenHaoComm
    }
];

const JiChengConfig = [
    {
        label: '年份',
        type: 'select',
        prop: 'nianFen',
        span: 12,
        width: '60px',
        options: [
            ...buildYears()
        ]
    },
    {
        span: 16,
        width: '60px',
        label: '单位',
        guiKouShow: false,
        components: danWeiComm,
        prop: 'bianXianBm'
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
                    label: '编辑',
                    action: 'editXianE'
                },
                {
                    label: '删除',
                    action: 'deleYuCunApi'
                }
            ];
        }
    }
];


const jiChengformList = [
    {
        label: '编限单位',
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
    }
];

export {
    addFormConfig,
    editFormConfig,
    danWeiComm,
    wenHaoComm,
    daoRuConfig,
    JiChengConfig,
    formList,
    jiChengformList
};

