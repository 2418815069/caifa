import request from '@/common/api/request';

// 查询限额剩余(省备用)
export const getCaiFaXianEList = (params = {}) => {
    return request({
        url: 'api/v1/xiane/shengbeiyong',
        method: 'get',
        params
    });
};

// 追加限额
export const addZhuiJiaXianE = (params = {}) => {
    return request({
        url: 'api/v1/xianegc/zhuijia',
        method: 'POST',
        params
    });
};

// 查询追加限额
export const getZhuiJiaXianE = (params = {}) => {
    return request({
        url: 'api/v1/xianegc/zhuijia',
        method: 'get',
        params
    });
};

// 删除追加限额
export const deleYuCunApi = (params = {}) => {
    return request({
        url: `api/v1/xianegc/zhuijia/${params.guid}`,
        method: 'DELETE'
    });
};

