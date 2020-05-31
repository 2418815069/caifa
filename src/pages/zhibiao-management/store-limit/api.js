import request from '@/common/api/request';

// 查询可分解限额 （可用限额）
export const getKeFenJieXian = (params = {}) => {
    return request({
        url: 'api/v1/xiane/kefenjie',
        method: 'GET',
        params
    });
};

// 预存指标按钮
export const yuCunApi = (params = {}) => {
    return request({
        url: 'api/v1/zhibiaogc/yucun',
        method: 'POST',
        params
    });
};

// 查询预存指标
export const getyuCunListApi = (params = {}) => {
    return request({
        url: 'api/v1/zhibiaogc/yucun',
        method: 'GET',
        params
    });
};


// 修改预存指标
export const editYuCunApi = (params = {}) => {
    return request({
        url: `api/v1/xianegc/${params.guid}`,
        method: 'PUT',
        params
    });
};


// 刪除一条预存指标
export const deleYuCunApi = (params = {}) => {
    return request({
        url: `/api/v1/zhibiaogc/yucun/${params.guid}`,
        method: 'DELETE',
        params
    });
};

// 文号查询
export const getWenjianList = (params = {}) => {
    return request({
        url: 'api/v1/wenjian',
        method: 'get',
        params
    });
};
