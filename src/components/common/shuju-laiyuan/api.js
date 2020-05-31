import request from '@/common/api/request';
// 数据来源
export const getShuJuLaiYuan = (params = {}) => {
    return request({
        url: 'public/api/v1/jichubm/leibielist?leiBie=13',
        method: 'get',
        params,
        needJwt: false
    });
};

