import request from '@/common/api/request';

// 采伐限额列表查询
export const getQueryList = (params = {}) => {
    return request({
        url: 'api/v1/xianegc/yucun',
        method: 'get',
        params
    });
};

// 下达
export const postXiaDa = (params = {}) => {
    return request({
        url: 'api/v1/xianegc/xiada',
        method: 'post',
        params
    });
};

