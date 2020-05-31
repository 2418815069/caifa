import request from '@/common/api/request';
// 更新方式
export const getGengXinFangShi = (params = {}) => {
    return request({
        url: 'public/api/v1/jichubm/leibielist?leiBie=06',
        method: 'get',
        params,
        needJwt: false
    });
};
