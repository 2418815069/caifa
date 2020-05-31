import request from '@/common/api/request';
//  shiXiangJbm(事项子类变化 查询材料)
export const getCaiLiao = (params = {}) => {
    return request({
        url: `public/api/v1/cailiao?caiFaZhengType=${params.shiXiangJbm}`,
        method: 'get',
        needJwt: false
    });
};

export const deleteCaiLiao = (params = {}) => {
    return request({
        url: `public/api/v1/fujian/${params.uuid}`,
        method: 'DELETE',
        needJwt: false
    });
};
