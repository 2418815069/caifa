import request from '@/common/api/request';
// 列表
export const getList = (params = {}) => {
    return request({
        url: 'api/v1/bianxian/list',
        method: 'get',
        params
    });
};

// 新增
export const addYanZheng = (params = {}) => {
    return request({
        url: 'api/v1/bianxian',
        method: 'POST',
        params
    });
};

// 删除列表项
export const deleteItem = (params = {}) => {
    return request({
        url: `api/v1/bianxian/${params.guid}`,
        method: 'delete'
    });
};

// 编辑
export const editItem = (params = {}) => {
    return request({
        url: `api/v1/bianxian/${params.guid}`,
        method: 'put',
        params
    });
};


// 获取工程区
export const getGongChengQuQrr = () => {
    return request({
        url: 'public/api/v1/jichubm/leibielist?leiBie=08',
        method: 'get',
        needJwt: false
    });
};
