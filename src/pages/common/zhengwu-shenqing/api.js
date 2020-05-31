import request from '@/common/api/request';
//  shiXiangJbm(事项子类变化 查询材料)
export const getCaiLiao = (params = {}) => {
    return request({
        url: `public/api/v1/cailiao?caiFaZhengType=${params.shiXiangJbm}`,
        method: 'get',
        needJwt: false
    });
};

export const deleteCaiLiao = (params = {}) => {
    return request({
        url: `public/api/v1/fujian/${params.uuid}`,
        method: 'DELETE',
        needJwt: false
    });
};


// 法人获取信息接口
export const corporation = (params = {}) => {
    return request({
        url: 'public/api/v1/zhejiang-sso/corporation',
        method: 'post',
        params: params,
        needJwt: false
    });
};

// 个人获取信息接口
export const individual = (params = {}) => {
    return request({
        url: `public/api/v1/zhejiang-sso/individual?ticket=${params.ticket}`,
        method: 'post',
        params: params,
        needJwt: false,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};


// 获取行政单位
export const getXingZhengArr = (params = {}) => {
    return request({
        url: `public/api/v1/xzcode?cParentcode=${params.cParentcode}`,
        method: 'get',
        needJwt: false
    });
};


// 政务申请
export const zhengWuShenQing = (params = {}) => {
    return request({
        url: 'public/api/v1/caifazheng',
        method: 'post',
        params,
        needJwt: false
    });
};
