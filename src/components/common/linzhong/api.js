import request from '@/common/api/request';
// 林种一级下拉
export const getLinZhongList = (params = {}) => {
    return request({
        url: 'public/api/v1/jichubm/leibielist?leiBie=03',
        method: 'get',
        params,
        needJwt: false
    });
};

// 林种二级下拉
export const getLinZhongZiList = (params = {}) => {
    return request({
        url: 'public/api/v1/jichubm/zilist?leiBie=03',
        method: 'get',
        params,
        needJwt: false
    });
};
