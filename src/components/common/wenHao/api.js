import request from '@/common/api/request';
// 文号查询
export const getWenjianList = (params = {}) => {
    return request({
        url: 'api/v1/wenjian',
        method: 'get',
        params
    });
};
