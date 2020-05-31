import request from '@/common/api/request';
// 采伐证审核
export const getShenHeList = (params = {}) => {
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

// 获取单个角色
export const getJueSeByYongHuBh = (params = {}) => {
    return request({
        url: `api/v1/yonghu/${params.yongHuBh}`,
        method: 'get'
    });
};
