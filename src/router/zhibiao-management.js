export default {
    name: '采伐指标管理',
    path: '/zhibiao-management',
    routeName: 'zhibiao-management',
    icon: 'el-icon-menu',
    meta: { name: '采伐指标管理' },
    component: () => import('@/pages/zhibiao-management/index.vue'),
    children: [{
        name: '预存指标',
        path: 'z-store-limit',
        icon: 'el-icon-menu',
        component: () => import('@/pages/zhibiao-management/store-limit/index.vue')
    }, {
        name: '下达指标',
        path: 'z-issued-limit',
        icon: 'el-icon-menu',
        component: () => import('@/pages/zhibiao-management/issued-limit/index.vue')
    }, {
        name: '收回指标',
        path: 'z-recycle-limit',
        icon: 'el-icon-menu',
        component: () => import('@/pages/zhibiao-management/recycle-limit/index.vue')
    }, {
        name: '预存分解指标',
        path: 'z-store-resolve-limit',
        icon: 'el-icon-menu',
        component: () => import('@/pages/zhibiao-management/store-resolve-limit/index.vue')
    }, {
        name: '下达分解指标',
        path: 'z-issued-resolve-limit',
        icon: 'el-icon-menu',
        component: () => import('@/pages/zhibiao-management/issued-resolve-limit/index.vue')
    }, {
        name: '收回分解指标',
        path: 'z-recycle-resolve-limit',
        icon: 'el-icon-menu',
        component: () => import('@/pages/zhibiao-management/recycle-resolve-limit/index.vue')
    }, {
        name: '天然林分项变更',
        path: 'z-store-limit-add',
        icon: 'el-icon-menu',
        component: () => import('@/pages/zhibiao-management/store-limit-add/index.vue')
    }, {
        name: '采伐类型分项变更',
        path: 'z-issued-limit-add',
        icon: 'el-icon-menu',
        component: () => import('@/pages/zhibiao-management/issued-limit-add/index.vue')
    }
    ]
};
