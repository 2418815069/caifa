import request from '@/common/api/request';
// 采伐证发放列表
export const getBanJieList = (params = {}) => {
    return request({
        url: 'api/v1/workflow',
        method: 'get',
        params
    });
};
// 删除列表项
export const deleteBanJieItem = (params = {}) => {
    return request({
        url: 'caifa-issuance/shouli/detele',
        method: 'delete',
        params
    });
};


// 不予受理通知书
export const getBuYuShouLi = (params = {}) => {
    return request({
        url: `api/v1/caifazheng/buyushoulitongzhishu/${params.guid}`,
        method: 'get'
    });
};


// 不予许可通知书
export const getBuYuXuKe = (params = {}) => {
    return request({
        url: `api/v1/caifazheng/buyuxuketongzhishu/${params.guid}`,
        method: 'get'
    });
};
