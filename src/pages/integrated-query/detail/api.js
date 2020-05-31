import request from '@/common/api/request';
// 获取采伐证
export const getItemCaiFaZheng = (params = {}) => {
    return request({
        url: `api/v1/caifazheng/${params.guid}`,
        method: 'get',
        params
    });
};

// 终止操作
export const zhongZhiPost = (params = {}) => {
    return request({
        url: 'api/v1/workflow/caifazheng',
        method: 'Post',
        params
    });
};

// 获取作业设计详情
export const getZuoYeDetail = (no) => {
    return request({
        url: `api/v1/dangan/${no}`,
        method: 'get'
    });
};
