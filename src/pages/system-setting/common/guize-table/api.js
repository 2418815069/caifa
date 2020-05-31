import request from '@/common/api/request';
// 列表
export const getYanzhengXiangOptions = () => {
    return request({
        url: 'api/v1/option?type=yanzhengxiang',
        method: 'get'
    });
};
