import request from '@/common/api/request';
// 获取按钮
export const getCaiFaZhengBtn = (params = {}) => {
    return request({
        url: `api/v1/workflow?guid=${params.guid}`,
        method: 'get'
    });
};

// 对采伐证进行操作
export const handlCaifazhengBtn = (params = {}) => {
    return request({
        url: 'api/v1/workflow/caifazheng',
        method: 'post',
        params
    });
};

// 获取各种通知书Html
export const getTongZhiShuHtml = (url, guid) => {
    return request({
        url: `${url}/${guid}`,
        method: 'get'
    });
};

// 保存各种通知书Html
export const saveTongZhiShuHtml = (url, guid) => {
    return request({
        url: `${url}/${guid}`,
        method: 'post'
    });
};
