import request from '@/common/api/request';

// 查询已经分解限额
export const getQueryList = (params = {}) => {
    return request({
        url: 'api/v1/xianegc/yifenjie',
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

