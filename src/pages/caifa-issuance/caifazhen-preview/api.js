import request from '@/common/api/request';
// 获取采伐证
export const getItemCaiFaZheng = (params = {}) => {
    return request({
        url: `api/v1/caifazheng/${params.guid}`,
        method: 'get',
        params
    });
};

// 获取决定书
export const getJueDingShu = (params = {}) => {
    return request({
        url: `api/v1/caifazheng/juedingtongzhishu/${params.guid}`,
        params
    });
};

// 获取按钮
export const getCaiFaZhengBtn = (params = {}) => {
    return request({
        url: `api/v1/workflow?guid=${params.guid}`,
        method: 'get'
    });
};


// 打印成功后发放 Api
export const banJieApi = (params = {}) => {
    return request({
        url: 'api/v1/workflow/caifazheng',
        method: 'POST',
        params
    });
};


// 上传许可证打印照片
export const uploadZhaoPian = (params = {}) => {
    return request({
        url: 'public/api/v1/caifazheng/xukezheng/send',
        method: 'POST',
        params
    });
};


// 是否可以打印采伐证
export const isDaYinCaiFaZheng = (params = {}) => {
    return request({
        url: 'api/v1/caifazheng/isprintcaifazheng',
        method: 'GET',
        params
    });
};
