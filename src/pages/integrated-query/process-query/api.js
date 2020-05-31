import request from '@/common/api/request';
// 查询流程单
export const liuChengDan = (params = {}) => {
    return request({
        url: 'api/v1/caifazheng?zhuangTaiLeiBie=3',
        method: 'get',
        params
    });
};


// 获取流程单(打印)
export const getLiuChengDan = (params = {}) => {
    return request({
        url: `api/v1/caifazheng/liuchengdan/${params.guid}`,
        method: 'get'
    });
};
