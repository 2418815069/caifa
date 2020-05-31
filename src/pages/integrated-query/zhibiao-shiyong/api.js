import request from '@/common/api/request';
// 指标查询列表
export const getCaiFaXianEList = (params = {}) => {
    return request({
        url: 'api/v1/zhibiao',
        method: 'get',
        params
    });
};
