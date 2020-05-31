module.exports = function () {
    return {
        code: 200,
        message: '接口成功',
        data: {
            'list|20': [{
                projid: '申报号',
                shenQinRen: '申请人',
                timberType: '@integer(1,2,3)',
                systemType: '@integer(1,2,4,5,3)',
                xiaoBan: '小班',
                shenQingSj: '申请时间',
                caiFaXj: '采伐蓄积',
                caiFaZs: '采伐株数',
                shenQingJg: '申请机构',
                zhuangTai: '@integer(0,1,2,4,5,6)',
                qianFaRuid: '签发id',
                qianFaRen: '签发人',
                qianFaSj: '签发时间',
                qianFaJg: '签发机构',
                caiFaZh: '采伐证号'
            }]
        }
    };
};
