import request from '@/common/api/request';
// 事项名称
export const getShiXiangMcList = (params = {}) => {
    return request({
        url: 'public/api/v1/jichubm/leibielist?leiBie=12',
        method: 'get',
        params,
        needJwt: false
    });
};

// 事项子项
export const getShiXiangZxList = (params = {}) => {
    return request({
        url: 'public/api/v1/jichubm/zilist?leiBie=12',
        method: 'get',
        params,
        needJwt: false
    });
};
