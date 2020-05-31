import request from '@/common/api/request';
// 龄组
export const getLingZu = (params = {}) => {
    return request({
        url: 'public/api/v1/jichubm/leibielist?leiBie=07',
        method: 'get',
        params,
        needJwt: false
    });
};
