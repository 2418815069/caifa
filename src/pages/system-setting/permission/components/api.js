import request from '@/common/api/request';

// 获取左侧树
export const getInternal = () => {
    return request({
        url: 'api/v1/jiaose/menuall',
        method: 'get',
        showLoading: false

    });
};
