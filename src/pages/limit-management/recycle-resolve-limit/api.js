import request from '@/common/api/request';

// 回收
export const postHuiShou = (params = {}) => {
    return request({
        url: `api/v1/xiane/shouhui/fenjie/${params.guid}`,
        method: 'post',
        params
    });
};

// 查询限额剩余(限额查询-分页)
export const getCaiFaXianEList = (params = {}) => {
    return request({
        url: 'api/v1/xiane/list',
        method: 'get',
        params
    });
};

