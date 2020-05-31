import request from '@/common/api/request';
// 查询采伐证列表
export const caifazheng = (params = {}) => {
    return request({
        url: 'api/v1/caifazheng?zhuangTaiLeiBie=2',
        method: 'get',
        params
    });
};
