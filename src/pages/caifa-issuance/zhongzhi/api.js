import request from '@/common/api/request';
// 采伐证终止
export const getZhongZhiList = (params = {}) => {
    return request({
        url: 'api/v1/workflow',
        method: 'get',
        params
    });
};
// 删除列表项
export const deleteZhongZhiItem = (params = {}) => {
    return request({
        url: 'caifa-issuance/shouli/detele',
        method: 'delete',
        params
    });
};
