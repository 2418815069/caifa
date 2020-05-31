import request from '@/common/api/request';
// 采伐类型
export const getCaiFaLeiXingList = (params = {}) => {
    return request({
        url: 'public/api/v1/jichubm/leibielist?leiBie=04',
        method: 'get',
        params,
        needJwt: false
    });
};

// 采伐方式
export const getCaiFangShiList = (params = {}) => {
    return request({
        url: 'public/api/v1/jichubm/zilist?leiBie=04',
        method: 'get',
        params,
        needJwt: false
    });
};
