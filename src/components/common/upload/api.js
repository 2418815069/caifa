import request from '@/common/api/request';

export const deleteCaiLiao = (params = {}) => {
    return request({
        url: `public/api/v1/fujian/${params.uuid}`,
        method: 'DELETE',
        needJwt: false
    });
};
