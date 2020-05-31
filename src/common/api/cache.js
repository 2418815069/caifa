// 用于缓存接口, 有些公共配置类接口不需要重复请求，直接在缓存读取就好
let cacheData = {
    'api/v1/jiaose/menuall?': null,
    'public/api/v1/jichubm/leibielist?leiBie=01&': null,
    'public/api/v1/jichubm/zilist?leiBie=09&fuBianMa=01': null
};

export function getCache(url) {
    let data = null;
    const BASE_API = process.env.VUE_APP_BASE_API;
    Object.keys(cacheData).map((cacheKey) => {
        // 确保接口全等
        const hasKey = url === `${BASE_API}/${cacheKey}`;
        if (hasKey) {
            const findKey = url.slice(url.indexOf(cacheKey));
            data = cacheData[findKey];
        }
    });
    if (data) {
        if (data.data) {
            return data.data;
        }
        return data;
    }
}

export function setCache(url, response) {
    Object.keys(cacheData).map((cacheKey) => {
        const hasKey = url.indexOf(cacheKey) !== -1;
        if (hasKey) {
            const findKey = url.slice(url.indexOf(cacheKey));
            cacheData[findKey] = response;
        }
    });
}
