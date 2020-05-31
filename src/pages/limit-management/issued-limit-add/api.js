import request from '@/common/api/request';

// 查询追加限额
export const getQueryList = (params = {}) => {
    return request({
        url: 'api/v1/xianegc/zhuijia',
        method: 'get',
        params
    });
};

// 下达
export const postXiaDa = (params = {}) => {
    return request({
        url: 'api/v1/xianegc/zhuijia/xiada',
        method: 'post',
        params
    });
};

