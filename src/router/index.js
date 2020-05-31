import VueRouter from 'vue-router';
import Vue from 'vue';
import common from './common';
import systemSetting from './system-setting';
import caifaIssuance from './caifa-issuance';
import integratedQuery from './integrated-query';
import limitManagement from './limit-management';
import userInfo from './user-info';
import zhibiaoManagement from './zhibiao-management';
import statisticalAnalysis from './statistical-analysis';


Vue.use(VueRouter);

const notFound = {
    path: '*',
    redirect: '/'
};
const defaultPage = {
    path: '/',
    redirect: {
        name: ''
    }
};

const router = new VueRouter({
    // mode: 'history',
    routes: [
        common,
        systemSetting,
        caifaIssuance,
        integratedQuery,
        limitManagement,
        userInfo,
        zhibiaoManagement,
        notFound,
        defaultPage,
        statisticalAnalysis
    ]
});

// 路由钩子
// 校验登录状态，权限，Query是否携带
router.beforeEach(async (to, from, next) => {
    // 获取全部权限部分在APP.vue中执行 如果此时没有本地缓存会报错(给Vue一个登录标识后在去获取权限)
    // 单点登录部分再加额外代码
    if (from.path === '/common/login') {
        Vue.prototype.isLogin = true;
    }
    next();
});

export default router;
