import request from '@/common/api/request';
// 政策法规列表
export const getZhengCeFaGuiList = (params = {}) => {
    return request({
        url: 'api/v1/fagui',
        method: 'get',
        params
    });
};
