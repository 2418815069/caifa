import request from '@/common/api/request';
// 采伐申请
export const caiFaZhengSave = (params = {}) => {
    return request({
        url: 'api/v1/caifazheng',
        method: 'post',
        params
    });
};

// 采伐证详情接口(继承)
export const getCaiFaZhengDetail = (params = {}) => {
    // 继承包含附件
    if (params.cfzUuidNew) {
        return request({
            url: `api/v1/caifazheng/${params.guid}?cfzUuidNew=${params.cfzUuidNew}`,
            method: 'get'
        });
    }
    // 普通详情
    return request({
        url: `api/v1/caifazheng/${params.guid}`,
        method: 'get',
        showLoading: false
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
        params
    });
};


// 查询事项名称
export const getShiXiangMingChengArr = (params = {}) => {
    return request({
        url: 'public/api/v1/jichubm/leibielist?leiBie=12',
        method: 'get',
        params,
        needJwt: false
    });
};

// 查询申请类型
export const getShenQingLeiXing = (params = {}) => {
    return request({
        url: 'public/api/v1/jichubm/leibielist?leiBie=11',
        method: 'get',
        params,
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


//  shiXiangJbm(事项子类变化 查询材料)
export const getCaiLiao = (params = {}) => {

    if (String(typeof params.shiXiangJbm) === 'undefined') {
        return request({
            url: 'public/api/v1/cailiao',
            method: 'get',
            needJwt: false
        });
    }
    return request({
        url: `public/api/v1/cailiao?caiFaZhengType=${params.shiXiangJbm}`,
        method: 'get',
        showLoading: false,
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


// 对采伐证进行操作(湖北需要一键受理功能)
export const handlCaifazhengBtn = (params = {}) => {
    return request({
        url: 'api/v1/workflow/caifazheng',
        method: 'post',
        params
    });
};

export const getGeocoder = (params = {}) => {
    return request({
        url: 'api/v1/map/geocoder',
        method: 'get',
        params,
        showLoading: false
    });
};

export const getSingleXianBao = (params = {}) => {
    return request({
        url: 'api/v1/map/xiaoban/single',
        method: 'get',
        params,
        showLoading: false
    });
};

export const getXingZheng = (params)=>{
    return request({
        url: 'api/v1/xingzheng',
        method: 'get',
        params,
        showLoading: false
    });
};

export const getcurrentXzCode = ()=>{
    return request({
        url: 'api/v1/xzcode/current',
        method: 'get',
        showLoading: false
    });
};


// 获取设计档案列表
export const getZuoYeSheJiArr = (params = {})=>{
    return request({
        url: 'api/v1/dangan/list',
        method: 'get',
        params
    });
};

// 获取设计档案详情
export const getZuoYeSheJiXiangQiang = (no)=>{
    return request({
        url: `api/v1/dangan/${no}`,
        method: 'get'
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
