import request from '@/common/api/request';

// 回收
export const postHuiShou = (params = {}) => {
    return request({
        url: `api/v1/zhibiao/shouhui/fenjie/${params.guid}`,
        method: 'post',
        params
    });
};

// 查询指标剩余(指标查询-分页)
export const getCaiFaXianEList = (params = {}) => {
    return request({
        url: 'api/v1/zhibiao/list',
        method: 'get',
        params
    });
};

