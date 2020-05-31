import request from '@/common/api/request';
// 用户列表
export const getRizhiList = (params = {}) => {
    return request({
        url: 'api/v1/rizhi',
        method: 'get',
        params,
        sendAllResponse: true
    });
};
