import request from '@/common/api/request';
// 双随机
export const getSuiJi = (params = {}) => {
    return request({
        url: 'api/v1/shuangsuiji/list',
        method: 'get',
        params
    });
};
