import request from '@/common/api/request';

export const quanxianmenu = (params = {}) => {
    return request({
        url: 'api/v1/jiaose',
        method: 'get',
        params: params
    });
};

// 创建角色
export const creatQuanxian = (params = {}) => {
    return request({
        url: 'api/v1/jiaose',
        method: 'post',
        params: params
    });
};

// 更新角色
export const updateQuanxian = (params = {}) => {
    return request({
        url: `api/v1/jiaose/${params.jiaoSeBh}`,
        method: 'put',
        params: params
    });
};

// 删除角色
export const deleteQuanxian = (params = {}) => {
    return request({
        url: `api/v1/jiaose/${params.jiaoSeBh}`,
        method: 'DELETE',
        params: params
    });
};
