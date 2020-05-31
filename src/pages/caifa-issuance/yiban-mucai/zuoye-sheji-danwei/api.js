import request from '@/common/api/request';
// 获取市
export const getShiArr = (params = {}) => {
    return request({
        url: 'api/v1/lyjcode/shi',
        method: 'GET',
        params
    });
};

// 获取县
export const getXianArr = (params = {}) => {
    return request({
        url: 'api/v1/lyjcode/xian',
        method: 'GET',
        params
    });
};

// 获取乡
export const getXiangArr = (params = {}) => {
    return request({
        url: 'api/v1/lyjcode/xiang',
        method: 'GET',
        params
    });
};

// 获取村
export const getCunArr = (params = {}) => {
    return request({
        url: 'api/v1/lyjcode/cun',
        method: 'GET',
        params
    });
};

export const getcurrentXzCode = ()=>{
    return request({
        url: 'api/v1/xzcode/current',
        method: 'get',
        showLoading: false
    });
};
