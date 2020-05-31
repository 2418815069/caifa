import request from '@/common/api/request';
// 修改用户
export const updateYonghu = (params = {}) => {
    return request({
        url: `api/v1/yonghu/${params.yongHuBh}`,
        method: 'put',
        params
    });
};
// 获取用户信息
export const getYonghu = (params = {}) => {
    return request({
        url: `api/v1/yonghu/${params.yongHuBh}`,
        method: 'get',
        params
    });
};
