/* eslint-disable*/
var _utils = () => ({
    isJson: (value) => {
        return (/^\{|\[(.+:.+,*)*}|\]$/).test(value);
    },
    getObjectType:(data) => {
      let type = typeof data;
      if (type === 'object') {
          let _type = Object.prototype.toString.call(data);
          let len = _type.length
          type = _type.substring(8,len-1).toLowerCase();
      }
      return type;
    },
    storage: window.localStorage
});

/**
 * @description:
 * @method getStorage(key)       // 方法：获取个storage的数据
 *   @param key {String}                 // 参数：填写要获取的storage的key。
 */
function getStorage(key) {
    const {storage, isJson} = _utils();
    const value = storage.getItem(key);
    // 判断是否为JSON
    if (value && isJson(value)) {
        return JSON.parse(value);
    }
    return value;

}

/**
 * @description:
 * @method setStorage(key, value = {})       // 方法：设置个storage的数据
 *   @param key {String}                 // 参数：填写要设置的storage的key。
 *   @param value {Object | string}                 // 参数：填写要设置的storage的值。 *
 */
function setStorage(key, value) {
    const {storage, getObjectType} = _utils();
    if (getObjectType(value) === 'string') {
        storage.setItem( key, value);
    } else {
        storage.setItem( key, JSON.stringify(value));
    }
}

/**
 * @description:
 * @method removeStorage(key)       // 方法：清除某个storage的数据
 *   @param key {String}                 // 参数：填写要清除的storage的key。
 */
function removeStorage(key) {
    const {storage} = _utils();
    return storage.removeItem(key);
}

/**
 * @description:
 * @method clearStorage(keys)       // 方法：清楚storage的数据
 *   @param keys {Array}                 // 参数：要清除的keys数组列表(可选，如果不传就清空所有数据)。
 */
function clearStorage(keys) {
    const {storage} = _utils();
    if (keys && Array.isArray(keys)) {
        keys.map((key) => {
            removeStorage(key);
        });
    } else {
        storage.clear();
    }
}

/**
 * @description:
 * @method getAllStorage()       // 方法：获取storage所有数据
 */
function getAllStorage() {
    const {storage} = _utils();
    let data = {};
    for (let k in storage) {
        if (storage.hasOwnProperty(k)) {
            const value = getStorage(k);
            data[k] = value;
        }
    }
    return data;
}

/**
 * @description:
 * @method getAllStorage(callBack)       // 方法：遍历storage所有数据
 *   @param callBack {function}                 // 参数：回调函数，传出每一个值(必选)。 *
 */
function eachStorage(callBack) {
    const {storage} = _utils();
    for (let k in storage) {
        if (storage.hasOwnProperty(k)) {
            const value = getStorage(k);
            callBack && callBack(k, value);
        }
    }
}

const zybStorage = {
    get: getStorage,
    set: setStorage,
    remove: removeStorage,
    clear: clearStorage,
    getAll: getAllStorage,
    each: eachStorage
};

export default zybStorage;
