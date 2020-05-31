import request from '@/common/api/request';
// 限额查询列表
export const getCaiFaXianEList = (params = {}) => {
    return request({
        url: 'api/v1/xiane',
        method: 'get',
        params
    });
};
// 删除列表项
export const deleteShouLiItem = (params = {}) => {
    return request({
        url: 'caifa-issuance/shouli/detele',
        method: 'delete',
        params
    });
};
