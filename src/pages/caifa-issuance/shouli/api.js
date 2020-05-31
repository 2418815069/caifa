import request from '@/common/api/request';
// 采伐证受理列表
export const getShouLiList = (params = {}) => {
    return request({
        url: 'api/v1/workflow',
        method: 'get',
        params
    });
};
// 删除列表项
export const deleteShouLiItem = (params = {}) => {
    return request({
        url: `api/v1/caifazheng/${params.guid}`,
        method: 'DELETE'
    });
};
