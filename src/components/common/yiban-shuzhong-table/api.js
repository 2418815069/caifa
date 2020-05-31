import request from '@/common/api/request';
// 树种一级
export const getShuZhongFuList = (params = {}) => {
    return request({
        url: 'public/api/v1/jichubm/leibielist?leiBie=09',
        method: 'get',
        params,
        needJwt: false
    });
};

// 树种二级
export const getShuZhongZiList = (params = {}) => {
    return request({
        url: 'public/api/v1/jichubm/zilist?leiBie=09',
        method: 'get',
        params,
        needJwt: false
    });
};
