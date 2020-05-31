import request from '@/common/api/request';

// 角色
export const quanxianmenu = (params = {}) => {
    return request({
        url: 'public/api/v1/jiaose',
        method: 'get',
        params: params,
        isPublic: true,
        needJwt: false
    });
};

export const registerApi = (params = {}) => {
    return request({
        url: 'public/api/v1/yonghu/register',
        method: 'post',
        params: params,
        needJwt: false
    });
};
