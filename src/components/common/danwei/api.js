import request from '@/common/api/request';
// 获取用户所属单位
export const getUserDanWeiByXzCode = (params = {}) => {
    return request({
        url: `api/v1/xzcode/grade?yongHuXzCode=${params.yongHuXzcode}`,
        method: 'get',
        params,
        showLoading: false
    });
};

// 获取下级行政单位列表
export const getXingZhengDanWeiList = (params = {}) => {
    return request({
        url: 'public/api/v1/xzcode',
        method: 'get',
        params,
        needJwt: false
    });
};

// 获取下级编限单位
export const getBianXianList = (params = {}) => {
    return request({
        url: 'public/api/v1/bianxian',
        method: 'get',
        params,
        needJwt: false
    });
};
// 获取下级归口单位列表
export const getGuikouList = (params = {}) => {
    return request({
        url: 'public/api/v1/guikou',
        method: 'get',
        params,
        needJwt: false
    });
};

