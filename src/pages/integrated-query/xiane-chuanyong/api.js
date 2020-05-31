import request from '@/common/api/request';
// 限额串用过程
export const getXianEChuanYongList = (params = {}) => {
    return request({
        url: 'api/v1/xianecygc',
        method: 'get',
        params
    });
};

