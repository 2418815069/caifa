import request from '@/common/api/request';

//  法规列表
export const getFaguiList = (params = {}) => {
    return request({
        url: 'api/v1/fagui',
        method: 'get',
        params
    });
};
export const saveFagui = (params = {}) => {
    return request({
        url: 'api/v1/fagui',
        method: 'post',
        params
    });
};
export const editFagui = (params = {}) => {
    return request({
        url: `api/v1/fagui/${params.guid}`,
        method: 'put',
        params
    });
};
export const deleteFagui = (params = {}) => {
    return request({
        url: `api/v1/fagui/${params.guid}`,
        method: 'delete',
        params
    });
};
