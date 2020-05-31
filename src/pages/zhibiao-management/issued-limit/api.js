import request from '@/common/api/request';

// 采伐指标列表查询
export const getQueryList = (params = {}) => {
    return request({
        url: 'api/v1/zhibiaogc/yucun',
        method: 'get',
        params
    });
};

// 下达
export const postXiaDa = (params = {}) => {
    return request({
        url: 'api/v1/zhibiaogc/xiada',
        method: 'post',
        params
    });
};

