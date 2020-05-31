import request from '@/common/api/request';

// 获取下级行政单位列表
export const getXingZhengDanWeiList = (params = {}) => {
    return request({
        url: 'public/api/v1/xzcode',
        method: 'get',
        params,
        isPublic: true,
        needJwt: false
    });
};

// 获取下级编限单位
export const getBianXianList = (params = {}) => {
    return request({
        url: 'public/api/v1/bianxian',
        method: 'get',
        isPublic: true,
        params,
        needJwt: false
    });
};

// 获取下级归口单位列表
export const getGuikouList = (params = {}) => {
    return request({
        url: 'public/api/v1/guikou',
        method: 'get',
        isPublic: true,
        params,
        needJwt: false
    });
};

