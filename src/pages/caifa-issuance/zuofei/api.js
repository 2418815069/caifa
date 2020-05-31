import request from '@/common/api/request';
// 采伐证作废列表
export const getZuoFeiList = (params = {}) => {
    return request({
        url: 'api/v1/workflow',
        method: 'get',
        params
    });
};
// 删除列表项
export const deleteZuoFeiItem = (params = {}) => {
    return request({
        url: 'caifa-issuance/shouli/detele',
        method: 'delete',
        params
    });
};
