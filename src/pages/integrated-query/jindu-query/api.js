import request from '@/common/api/request';
// 查询采伐证列表
export const caifazheng = (params = {}) => {
    return request({
        url: 'api/v1/caifazheng?zhuangTaiLeiBie=1',
        method: 'get',
        params
    });
};


// 查询申请类型
export const getShenQingLeiXing = (params = {}) => {
    return request({
        url: 'public/api/v1/jichubm/leibielist?leiBie=11',
        method: 'get',
        params,
        needJwt: false
    });
};
