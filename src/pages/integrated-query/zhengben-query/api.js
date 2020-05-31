import request from '@/common/api/request';
// 获取证本列表
export const getZhengBenList = (params = {}) => {
    return request({
        url: 'api/v1/zhengben',
        method: 'get',
        params
    });
};
