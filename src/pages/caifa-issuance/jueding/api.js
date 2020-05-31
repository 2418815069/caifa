import request from '@/common/api/request';
// 采伐证决定
export const getJueDingList = (params = {}) => {
    return request({
        url: 'api/v1/workflow',
        method: 'get',
        params
    });
};

// 删除列表项
export const deleteItem = (params = {}) => {
    return request({
        url: 'caifa-issuance/shenhe/detele',
        method: 'delete',
        params
    });
};
