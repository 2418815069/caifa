import request from '@/common/api/request';

//  法规列表
export const getGonggaoList = (params = {}) => {
    return request({
        url: 'api/v1/gonggao',
        method: 'get',
        params
    });
};
export const saveGonggao = (params = {}) => {
    return request({
        url: 'api/v1/gonggao',
        method: 'post',
        params
    });
};
export const editGonggao = (params = {}) => {
    return request({
        url: `api/v1/gonggao/${params.guid}`,
        method: 'put',
        params
    });
};
export const deleteGonggao = (params = {}) => {
    return request({
        url: `api/v1/gonggao/${params.guid}`,
        method: 'delete',
        params
    });
};
