import request from '@/common/api/request';
// 限额操作列表
export const getCaiFaXianEList = (params = {}) => {
    return request({
        url: 'api/v1/zhibiaogc/caozuolist',
        method: 'get',
        params
    });
};

// 追加类别
export const getZhuiJiaLeiBieList = (params = {}) => {
    return request({
        url: 'public/api/v1/jichubm/leibielist?leiBie=10',
        method: 'get',
        params,
        needJwt: false
    });
};
