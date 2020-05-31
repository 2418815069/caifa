import request from '@/common/api/request';

// 变更天然林
export const postHuiShou = (params = {}) => {
    return request({
        url: `api/v1/zhibiao/biangeng/tianranlin/${params.guid}`,
        method: 'post',
        params
    });
};


// 查询指标剩余
export const getCaiFaXianEList = (params = {}) => {
    return request({
        url: 'api/v1/zhibiao/list',
        method: 'get',
        params
    });
};

