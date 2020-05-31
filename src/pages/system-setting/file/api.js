import request from '@/common/api/request';

// file列表
export const getFileList = (params = {}) => {
    return request({
        url: 'api/v1/wenjian',
        method: 'get',
        params
    });
};

// add file
export const saveFile = (params = {}) => {
    return request({
        url: 'api/v1/wenjian',
        method: 'post',
        params
    });
};

// add file
export const updateFile = (params = {}) => {
    return request({
        url: `api/v1/wenjian/${params.guid}`,
        method: 'put',
        params
    });
};

// 删除file
export const deleteFile = (params = {}) => {
    return request({
        url: `api/v1/wenjian/${params.guid}`,
        method: 'delete',
        params
    });
};
