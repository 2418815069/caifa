import request from '@/common/api/request';

// 查询可分解指标
export const getCaiFaXianEList = (params = {}) => {
    return request({
        url: 'api/v1/zhibiao/kefenjie',
        method: 'get',
        params
    });
};

// 分解指标
export const fenJieXianE = (params = {}) => {
    return request({
        url: 'api/v1/zhibiaogc/fenjie',
        method: 'POST',
        params
    });
};

// 查询已分解指标
export const getZhuiJiaXianE = (params = {}) => {
    return request({
        url: 'api/v1/zhibiaogc/yucun',
        method: 'get',
        params
    });
};

// 删除追加指标
export const deleYuCunApi = (params = {}) => {
    return request({
        url: `api/v1/zhibiaogc/fenjie/${params.guid}`,
        method: 'DELETE'
    });
};

