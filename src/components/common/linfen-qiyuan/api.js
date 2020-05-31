import request from '@/common/api/request';
// 林分起源
export const getLinFenQiYuanList = (params = {}) => {
    return request({
        url: 'public/api/v1/jichubm/leibielist?leiBie=02',
        method: 'get',
        params,
        needJwt: false
    });
};
