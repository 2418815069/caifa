export const filterConfig = [
    {
        label: '单位',
        type: 'danWei',
        prop: 'danWei',
        shiXianShow: true,
        width: '44px'
    }, {
        type: 'input',
        prop: 'title',
        label: '文号',
        placeholder: '请输入文号',
        width: '44px'
    }];

export const listPropsConfig = [{
    label: '序号',
    prop: 'xuhao',
    format: function () {
        return arguments[2].$index + 1;
    }
}, {
    label: '文号',
    prop: 'title'
}, {
    label: '描述',
    prop: 'content'
}, {
    label: '附件',
    prop: 'fileName'
} ];
