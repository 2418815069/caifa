import request from '@/common/api/request';
// 角色
export const quanxianmenu = (params = {}) => {
    return request({
        url: 'api/v1/jiaose',
        method: 'get',
        params: params
    });
};
// 用户列表
export const getYonghuList = (params = {}) => {
    return request({
        url: 'api/v1/yonghu',
        method: 'get',
        params,
        sendAllResponse: true
    });
};

// 修改用户
export const updateYonghu = (params = {}) => {
    return request({
        url: `api/v1/yonghu/${params.yongHuBh}`,
        method: 'put',
        params
    });
};

// 删除用户
export const deleteYonghu = (params = {}) => {
    return request({
        url: `api/v1/yonghu/${params.yongHuBh}`,
        method: 'delete',
        params
    });
};

// 初始化密码
export const resetYonghu = (params = {}) => {
    return request({
        url: `api/v1/yonghu/${params.yongHuBh}/pwd`,
        method: 'put',
        params
    });
};
