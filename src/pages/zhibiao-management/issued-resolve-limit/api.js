import request from '@/common/api/request';

// 查询已经分解指标（也用预存接口 通过guikouBm和bianxianBm区分是分解的还是预存的）
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

