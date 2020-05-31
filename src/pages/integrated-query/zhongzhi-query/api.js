import request from '@/common/api/request';
// 查询采伐证终止列表
export const caifazheng = (params = {}) => {
    return request({
        url: 'api/v1/caifazheng?zhuangTaiLeiBie=5',
        method: 'get',
        params
    });
};
