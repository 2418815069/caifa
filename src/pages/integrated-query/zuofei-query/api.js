import request from '@/common/api/request';
// 查询采伐作废证列表
export const caifazheng = (params = {}) => {
    return request({
        url: 'api/v1/caifazheng?zhuangTaiLeiBie=4',
        method: 'get',
        params
    });
};
