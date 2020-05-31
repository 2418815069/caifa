import request from '@/common/api/request';

// 变更商品林
export const postHuiShou = (params = {}) => {
    return request({
        url: `api/v1/zhibiao/biangeng/shangpinlin/${params.guid}`,
        method: 'post',
        params
    });
};


// 查询指标剩余(下达列表)
export const getCaiFaXianEList = (params = {}) => {
    return request({
        url: 'api/v1/zhibiao/list',
        method: 'get',
        params
    });
};

