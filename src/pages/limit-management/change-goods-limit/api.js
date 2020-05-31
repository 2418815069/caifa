import request from '@/common/api/request';

// 变更商品林
export const bianGeng = (params = {}) => {
    return request({
        url: `api/v1/xiane/biangeng/shangpinlin/${params.guid}`,
        method: 'post',
        params
    });
};


// 查询指标剩余(下达列表)
export const getCaiFaXianEList = (params = {}) => {
    return request({
        url: 'api/v1/xiane/list',
        method: 'get',
        params
    });
};

