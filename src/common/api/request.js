import axios from 'axios';
import Vue from 'vue';
import qs from 'qs';
import {
    checkLogin,
    loginOut
} from '@/common/util';
import Storage from '@/common/storage';
import {
    getCache,
    setCache
} from './cache';
// 携带cookie
axios.defaults.withCredentials = true;

// 添加一个响应拦截器
axios.interceptors.response.use(
    function (response) {
        if (response && response.data && response.data.code === 200) {
            const responseURL = response.request.responseURL;
            setCache(responseURL, response.data);
            return response.data || {};
        }
        if (typeof response === 'object') {return response;}
        Vue.prototype.$notify({
            title: '请求错误',
            type: 'error',
            message: response.data.message || '接口错误'
        });
        return response.data.message || '接口错误';
    },
    function (error) {
        return Promise.reject(error);
    }
);

const request = function ({
    url,
    params = {},
    headers = {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    needJwt = true,
    method = 'get',
    noBase = false,
    isPublic = false,
    sendAllResponse = false,
    showLoading = true
}) {
    const BASE_API = process.env.VUE_APP_BASE_API;
    if (!isPublic) {
        // checkLogin();
    }
    let mock = process.env.VUE_APP_MOCK_API || '';
    let baseUrl = BASE_API + '/';

    // 标识不用baseUrl
    if (params.noBase || noBase) {
        baseUrl = '';
    }
    let sendUrl = baseUrl + mock + url;

    const hasGetParams = sendUrl.indexOf('?') !== -1;
    if (hasGetParams) {
        sendUrl = sendUrl + '&';
    } else {
        sendUrl = sendUrl + '?';
    }
    method = method.toLocaleLowerCase();
    // 对传入后端的空数据统一处理处理
    if (!params instanceof Array) {
        let sendParams = {};
        for (let k in params) {
            if (params[k] || params[k] === 0) {
                sendParams[k] = params[k];
            }
        }
        params = sendParams;
    }
    if (method === 'get') {
        // 对传入后端的空数据统一处理处理
        let sendParams = {};
        for (let k in params) {
            if (params[k] || params[k] === 0) {
                sendParams[k] = params[k];
            }
        }
        params = sendParams;
        params = qs.stringify(params);
        sendUrl += params;
    }
    // jwt
    if (needJwt) {
        const JWT = Storage.get('jwt');
        if (!JWT) {
            // Vue.prototype.$notify({
            //     title: '请求错误',
            //     type: 'error',
            //     message: '缺少JWT请重新登录'
            // });
            loginOut(1500);
        }
        headers = Object.assign(headers, {
            Authorization: `${JWT}`
        });
    }
    // 缓存层， 避免数据重复请求
    const cacheData = getCache(sendUrl);
    if (cacheData) {
        return new Promise((resolve) => {
            resolve(cacheData);
        });
    }
    if (showLoading) {
        Vue.prototype.$xLoading.show();
    }
    return axios({
        method,
        url: sendUrl,
        data: method === 'get' ? null : params,
        headers
    })
        .then(response => {
            if (sendAllResponse) {
                return response;
            }
            if (response.data) {return response.data;}
            return response;
        })
        .catch(err => {
            try {
                if (err.response && err.response.data.code === 401) {
                    loginOut(1500);
                }
                if (err.response && err.response.data.code === 403) {
                    return err;
                }
                Vue.prototype.$notify({
                    title: '请求错误',
                    type: 'error',
                    message: err.response ? err.response.data.message : err
                });
                // 如果是不需要jwt的接口报错，应该就是tikict错误，需要重新登陆
                // if (!needJwt) {
                //     loginOut(1500);
                // }
            } catch (err) {
                console.log('err', err);
            }
        }).finally(() => {
            if (showLoading) {
                Vue.prototype.$xLoading.hide(sendUrl);
            }
        });
};

export default request;


// 处理小数
function setResponseDecimal(response) {
    if (response instanceof Array) {
        let arr = response.filter(item=>{
            if (item.sjcfZhuShu) {
                return item;
            }
        });
    } else {
        return response;
    }
}

