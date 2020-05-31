export const filterConfig = [
    {
        label: '单位',
        width: '44px',
        type: 'danWei',
        prop: 'danWei',
        guiKouShow: false
    }];

export const listPropsConfig = [{
    label: '序号',
    prop: 'xuhao',
    format: function () {
        return arguments[2].$index + 1;
    }
}, {
    label: '单位',
    prop: 'danWeiMc'
}, {
    label: '起始号',
    prop: 'haoQi'
}, {
    label: '截止号',
    prop: 'haoZhi'
}, {
    label: '总量',
    prop: 'zongLiang'
}, {
    label: '已使用量',
    prop: 'shiYongLiang'
}, {
    label: '领证时间',
    prop: 'dengJiSj'
}, {
    label: '领证人',
    prop: 'lingZhenRen'
}, {
    label: '最后使用时间',
    prop: 'shiYongSj'
}, {
    label: '是否可用',
    prop: 'isUse',
    format: function (text) {
        if (text === '0') {
            return '不可用';
        }
        if (text === '1') {
            return '可用';
        }
        return '数据错误';
    }
}];
