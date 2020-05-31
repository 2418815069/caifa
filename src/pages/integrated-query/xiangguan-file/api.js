import request from '@/common/api/request';
// 相关文件
export const getXiangGuanFileList = (params = {}) => {
    return request({
        url: 'api/v1/wenjian',
        method: 'get',
        params
    });
};
