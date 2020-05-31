import request from '@/common/api/request';

export const toLogin = (params = {}, pass) => {
    return request({
        url: `public/api/v1/yonghu/login?imageCode=${pass}`,
        method: 'post',
        params: params,
        isPublic: true,
        needJwt: false
    });
};

export const getUserInfo = (params = {}) => {
    return request({
        url: 'api/v1/yonghu/me',
        method: 'get',
        params: params
    });
};

// 获取验证码
export const getVerificationCode = (params = {}) => {
    return request({
        url: `public/api/v1/verification-code/${params}`,
        method: 'get',
        needJwt: false
    });
};

// 验证码效验
export const verificationCode = (params = {}) => {
    return request({
        url: 'public/api/v1/verification-code/validate',
        method: 'post',
        needJwt: false,
        params
    });
};


// 强制登录
export const forceLoginIn = (params = {}) => {
    return request({
        url: 'public/api/v2/login/inagain',
        method: 'post',
        needJwt: false,
        params
    });
};
