import request from '@/common/api/request';

// 根据Ticket获取用户list
export const getUserListByTicket = (params = {}) => {
    return request({
        url: 'public/api/v1/zj-slzy-sso',
        method: 'post',
        params,
        needJwt: false
    });
};

// 根据guid获取用户list
export const getUserListByGuid = (params = {}) => {
    return request({
        url: `api/v1/zj-slzy-sso/${params.guid}`,
        method: 'get'
    });
};

// 绑定用户
export const bindUserByGuid = (params = {}) => {
    return request({
        url: 'public/api/v1/zj-slzy-sso/bind',
        method: 'post',
        params,
        needJwt: false
    });
};

// 解除绑定用户
export const unBindUserByGuid = (params = {}) => {
    return request({
        url: `public/api/v1/zj-slzy-sso/unbind/${params.yongHuBh}`,
        method: 'delete',
        needJwt: false
    });
};

// 设置默认账户
export const setDefault = (params = {}) => {
    return request({
        url: `public/api/v1/zj-slzy-sso/default/${params.yongHuBh}?guid=${params.guid}`,
        method: 'POST',
        needJwt: false
    });
};

// 解除默认账户
export const setUnDefault = (params = {}) => {
    return request({
        url: `public/api/v1/zj-slzy-sso/canceldefault/${params.yongHuBh}`,
        method: 'delete',
        needJwt: false
    });
};

// 获取个人信息
export const getUserInfo = () => {
    return request({
        url: 'api/v1/yonghu/me',
        method: 'get'
    });
};

// 获取角色
export const quanxianmenu = (params = {}) => {
    return request({
        url: 'public/api/v1/jiaose',
        method: 'get',
        params: params,
        needJwt: false
    });
};

export const quanXianShenQing = (params = {}) => {
    return request({
        url: 'public/api/v1/zj-slzy-sso/shenqing',
        method: 'POST',
        params: params,
        needJwt: false
    });
};

// 行政单位获取
export const getXingZhengDanWei = (params = {}) => {
    return request({
        url: `public/api/v1/xzcode?cParentcode=${params.cParentcode}`,
        method: 'get',
        needJwt: false
    });
};

// 乡镇
export const getXiangArr = (params = {}) => {
    return request({
        url: `public/api/v1/bianxian?xianBianMa=${params.xianBianMa}`,
        method: 'get',
        needJwt: false
    });
};
