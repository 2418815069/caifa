import Storage from '@/common/storage';
import Vue from 'vue';
import request from '@/common/api/request';

export const checkLogin = () => {
    const ticket = Storage.get('jwt');
    if (!ticket) {
        setTimeout(() => {
            Vue.prototype.BaseVue.$router.push({
                path: '/common/login'
            });
        },
        1000
        );
    } else {
        return ticket;
    }
    return '';
};


/**
 * 表单、info 布局结构
 * @param  {[type]} list 配置列表
 * @return {[type]}      结构化后数据
 */
export function gridFormat(list) {
    let gridFormat = [];
    let linePointer = 0;
    let tempGrid = [];
    list.forEach(config => {
        if (config.grid !== linePointer) {
            linePointer = config.grid;
            if (tempGrid.length) {
                gridFormat.push(tempGrid);
                tempGrid = [];
            }
        }
        tempGrid.push(config);
    });
    gridFormat.push(tempGrid);
    return gridFormat;
}


export function showMessage(res, callBack) {
    if (!res) {return;}
    if (res.code === 200) {
        Vue.prototype.$notify({
            title: '提示',
            type: 'success',
            message: res.message
        });
        if (callBack) {
            callBack(res);
        }
    } else {
        Vue.prototype.$notify({
            title: '提示',
            type: 'error',
            message: res.message
        });
    }
}

export const loginOut = waitTime => {
    setTimeout(
        () => {
            const isZheJiang = process.env.VUE_APP_PING_TAI_INDEX_URL;
            if (isZheJiang) {
                window.location.href = isZheJiang;
                return;
            }
            // 如果存在平台登录地址不执行备用通道
            Vue.prototype.BaseVue.$router.push({
                path: '/common/login'
            });
            Storage.clear();
        },
        waitTime || 0
    );
};

export const getXzName = async code => {
    let xzName = '';
    if (!code) {
        return xzName;
    }
    if (code.length === 2) {
        const provinceData = Storage.get('provinceData');
        xzName = provinceData.provinceDisplayName;
    }
    if (code.length === 4) {
        // 获取市
        const provinces = (await request({
            url: 'api/v1/xzcode/grade',
            method: 'get'
        })).zi;
        provinces.map(province => {
            if (province.cfrcode === code) {
                xzName = province.cmc;
            }
        });
    }
    if (code.length === 6) {
        // 获取县
        const countys = await request({
            url: 'public/api/v1/xzcode',
            method: 'get',
            isPublic: true,
            params: {
                cParentcode: code.slice(0, 4)
            }
        });
        countys.map(county => {
            if (county.cfrcode === code) {
                xzName = county.cmc;
            }
        });
    }
    if (code.length === 10) {
        // 获取编限
        const bianxians = await request({
            url: 'public/api/v1/bianxian',
            method: 'get',
            isPublic: true,
            params: {
                xianBianMa: code.slice(0, 6)
            }
        });
        bianxians.map(bianxian => {
            if (bianxian.cfrcode === code) {
                xzName = bianxian.cmc;
            }
        });
    }
    if (code.length === 12) {
        // 获取乡
        const villages = await request({
            url: 'public/api/v1/guikou',
            method: 'get',
            isPublic: true,
            params: {
                bianXianDw: code.slice(0, 10)
            }
        });
        villages.map(village => {
            if (village.cfrcode === code) {
                xzName = village.cmc;
            }
        });
    }
    return xzName;
};

// 获取省纬度配置
export async function getprovinceConfig(checkStorage = true) {
    let hasProvince = false;
    if (checkStorage) {
        hasProvince = Storage.get('provinceData');
    }
    if (!hasProvince) {
        let provinceData = await request({
            url: 'public/api/v1/configs/internal-values',
            method: 'get',
            needJwt: false,
            params: {}
        });
        if (provinceData) {
            Storage.set('provinceData', provinceData);
        } else {
            Storage.remove('provinceData');
        }
        return provinceData;
    }
    return hasProvince;
}

export const xStorage = Storage;
