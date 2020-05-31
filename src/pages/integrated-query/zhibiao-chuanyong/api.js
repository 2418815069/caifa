import request from '@/common/api/request';
// 指标串用过程
export const getZhiBiaoChuanYongList = (params = {}) => {
    return request({
        url: 'api/v1/zhibiaocygc',
        method: 'get',
        params
    });
};

