import request from '@/common/api/request';
// 保存各种通知书Html
export const saveTongZhiShuHtml = (url, guid, params) => {
    return request({
        url: `${url}/${guid}`,
        method: 'post',
        params
    });
};
