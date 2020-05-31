import request from '@/common/api/request';

// 变更天然林
export const postHuiShou = (params = {}) => {
    return request({
        url: `api/v1/xiane/biangeng/tianranlin/${params.guid}`,
        method: 'post',
        params
    });
};


// 查询指标剩余
export const getCaiFaXianEList = (params = {}) => {
    return request({
        url: 'api/v1/xiane/list',
        method: 'get',
        params
    });
};

