import request from '@/common/api/request';

// 基础信息 父级别
export const getJiChuFu = (value) => {
    return request({
        url: `public/api/v1/jichubm/leibielist?isUse=2&leiBie=${value}`,
        method: 'get',
        needJwt: false
    });
};

// 新增
export const addItem = (params = {}) => {
    return request({
        url: 'api/v1/jichubm',
        method: 'POST',
        params
    });
};

// 删除列表项
export const deleteItem = (params = {}) => {
    return request({
        url: `api/v1/jichubm/${params.guid}`,
        method: 'delete'
    });
};

// 编辑
export const editItem = (params = {}) => {
    return request({
        url: `api/v1/jichubm/${params.guid}`,
        method: 'put',
        params
    });
};

