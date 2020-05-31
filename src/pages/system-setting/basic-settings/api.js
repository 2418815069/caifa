import request from '@/common/api/request';
// 获取所有外部配置
export const getConfigsExternal = (params = {}) => {
    return request({
        url: 'api/v1/configs/external',
        method: 'get',
        params: params
    });
};
// 更新配置
export const updateConfig = (params = {}) => {
    return request({
        url: `api/v1/config/${params.guid}`,
        method: 'put',
        params: params
    });
};

