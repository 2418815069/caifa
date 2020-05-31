import request from '@/common/api/request';

// 查询可分解限额
export const getCaiFaXianEList = (params = {}) => {
    return request({
        url: 'api/v1/xiane/kefenjie',
        method: 'get',
        params
    });
};

// 分解限额
export const fenJieXianE = (params = {}) => {
    return request({
        url: 'api/v1/xianegc/fenjie',
        method: 'POST',
        params
    });
};

// 查询已分解限额
export const getZhuiJiaXianE = (params = {}) => {
    return request({
        url: 'api/v1/xianegc/yifenjie',
        method: 'get',
        params
    });
};

// 删除追加限额
export const deleYuCunApi = (params = {}) => {
    return request({
        url: `api/v1/xianegc/fenjie/${params.guid}`,
        method: 'DELETE'
    });
};

