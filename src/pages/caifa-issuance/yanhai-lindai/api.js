import request from '@/common/api/request';
// 采伐申请
export const caiFaZhengSave = (params = {}) => {
    return request({
        url: 'api/v1/caifazheng',
        method: 'post',
        params
    });
};

// 采伐证详情接口
export const getCaiFaZhengDetail = (params = {}) => {
    return request({
        url: `api/v1/caifazheng/${params.guid}`,
        method: 'get'
    });
};

// 采伐证修改
export const caiFaZhengEdit = (params = {}) => {
    return request({
        url: `api/v1/caifazheng/${params.guid}`,
        method: 'put',
        params
    });
};


// 查询采伐证继承列表
export const getCaifazhengJiChengList = (params = {}) => {
    return request({
        url: 'api/v1/caifazheng?zhuangTaiLeiBie=0',
        method: 'get',
        params
    });
};


// 查询一级权属
export const getQuanShuArr = (params = {}) => {
    return request({
        url: 'public/api/v1/jichubm/leibielist?leiBie=01',
        method: 'get',
        params,
        needJwt: false
    });
};

// 查询一级起源
export const linMuQiYuanArr = (params = {}) => {
    return request({
        url: 'public/api/v1/jichubm/leibielist?leiBie=02',
        method: 'get',
        params,
        needJwt: false
    });
};

// 查询林种父
export const getlinZhongFuArr = (params = {}) => {
    return request({
        url: 'public/api/v1/jichubm/leibielist?leiBie=03',
        method: 'get',
        params,
        needJwt: false
    });
};

// 查询林种子
export const getlinZhongZiArr = (params = {}) => {
    return request({
        url: 'public/api/v1/jichubm/zilist?leiBie=03',
        method: 'get',
        params,
        needJwt: false
    });
};

// 查询优势树种父
export const getYouShiShuZhongFuArr = (params = {}) => {
    return request({
        url: 'public/api/v1/jichubm/leibielist?leiBie=09',
        method: 'get',
        params,
        needJwt: false
    });
};

// 查询优势树种子
export const getYouShiShuZhongZiArr = (params = {}) => {
    return request({
        url: 'public/api/v1/jichubm/zilist?leiBie=09',
        method: 'get',
        params,
        needJwt: false
    });
};

// 查询龄组
export const getLingZuArr = (params = {}) => {
    return request({
        url: 'public/api/v1/jichubm/leibielist?leiBie=07',
        method: 'get',
        params,
        needJwt: false
    });
};

// 查询采伐类型父
export const getCaiFaLeiXingFuArr = (params = {}) => {
    return request({
        url: 'public/api/v1/jichubm/leibielist?leiBie=04',
        method: 'get',
        params,
        needJwt: false
    });
};

// 查询采伐类型子
export const getCaiFaLeiXingZiArr = (params = {}) => {
    return request({
        url: 'public/api/v1/jichubm/zilist?leiBie=04',
        method: 'get',
        params,
        needJwt: false
    });
};

// 查询更新方式
export const getGengXinFangShiArr = (params = {}) => {
    return request({
        url: 'public/api/v1/jichubm/leibielist?leiBie=06',
        method: 'get',
        params,
        needJwt: false
    });
};


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

// 查询事项名称
export const getZhengJianArr = (params = {}) => {
    return request({
        url: `public/api/v1/jichubm/leibielist?leiBie=${params.leiBie}`,
        method: 'get',
        needJwt: false
    });
};

// 个人法人验证
export const getZhengJianVaildDatails = (params = {})=>{
    return request({
        url: 'public/api/v1/yichuang/gongan',
        method: 'post',
        params
    });
};
