import request from '@/common/api/request';
// 限额追加类别
export const getleibie = (params = {}) => {
    return request({
        url: 'public/api/v1/jichubm/leibielist?leiBie=10',
        method: 'get',
        params,
        needJwt: false
    });
};
