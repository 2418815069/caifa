import ThreeLinks from '@/pages/limit-management/components/tree-links';

export const filterConfig = [
    {
        span: 8,
        width: '56px',
        label: '登录名',
        type: 'input',
        prop: 'dengLuMc',
        placeholder: '请输入登录名'
    }, {
        label: '操作时间',
        type: 'dataPickter2',
        prop: 'dateTime',
        dateType: 'date',
        valueFormat: 'yyyy-MM-dd',
        allProps: ['startDate', 'endDate'],
        placeholder: '请选择申报日期',
        width: '72px',
        span: 14
    }, {
        span: 16,
        width: '56px',
        label: '单位',
        components: ThreeLinks,
        level: 2,
        prop: 'xzCode'
    } ];

export const listPropsConfig = [
    {
        label: '序号',
        prop: 'xuhao',
        format: function () {
            return arguments[2].$index + 1;
        }
    },
    {
        label: '登录名',
        prop: 'dengLuMc'
    },
    {
        label: '真实姓名',
        prop: 'zhenShiMc'
    },
    {
        label: '操作内容',
        prop: 'neiRong'
    },
    {
        label: '操作时间',
        prop: 'shiJian'
    }
];
