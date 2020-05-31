import request from '@/common/api/request';
// 林木权属
export const getLinMuQuanShuList = (params = {}) => {
    return request({
        url: 'public/api/v1/jichubm/leibielist?leiBie=01',
        method: 'get',
        params,
        needJwt: false
    });
};
