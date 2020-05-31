import request from '@/common/api/request';
// 列表
export const getList = (params = {}) => {
    return request({
        url: 'api/v1/yanzheng',
        method: 'get',
        params
    });
};


// 新增
export const addYanZheng = (params = {}) => {
    return request({
        url: 'api/v1/yanzheng',
        method: 'POST',
        params
    });
};

// 删除列表项
export const deleteItem = (params = {}) => {
    return request({
        url: `api/v1/yanzheng/${params.guid}`,
        method: 'delete',
        params
    });
};

// 编辑
export const editItem = (params = {}) => {
    return request({
        url: 'api/v1/yanzheng',
        method: 'put',
        params
    });
};
