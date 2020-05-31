import request from '@/common/api/request';

// 预存限额按钮
export const yuCunApi = (params = {}) => {
    return request({
        url: 'api/v1/xianegc/yucun',
        method: 'POST',
        params
    });
};

// 查询预存限额
export const getyuCunListApi = (params = {}) => {
    return request({
        url: 'api/v1/xianegc/yucun',
        method: 'GET',
        params
    });
};

// 查询预存限额
export const jiChengXianEApi = (params = {}) => {
    return request({
        url: 'api/v1/xianegc/jicheng',
        method: 'POST',
        params
    });
};

// 预存导入
export const yuCunDaoRuApi = (params = {}) => {
    return request({
        url: 'api/v1/xianegc/daoru',
        method: 'POST',
        params
    });
};


// 修改预存限额
export const editYuCunApi = (params = {}) => {
    return request({
        url: `api/v1/xianegc/${params.guid}`,
        method: 'PUT',
        params
    });
};


// 刪除一条预存限额
export const deleYuCunApi = (params = {}) => {
    return request({
        url: `api/v1/xianegc/yucun/${params.guid}`,
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
