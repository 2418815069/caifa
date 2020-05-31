export default {
    name: '采伐限额管理',
    path: '/limit-management',
    routeName: 'limit-management',
    icon: 'el-icon-menu',
    meta: {
        name: '采伐限额管理'
    },
    component: () => import('@/pages/limit-management/index.vue'),
    children: [{
        name: '预存限额',
        path: 'store-limit',
        icon: 'el-icon-menu',
        component: () => import('@/pages/limit-management/store-limit/index.vue')
    }, {
        name: '下达限额',
        path: 'issued-limit',
        icon: 'el-icon-menu',
        component: () => import('@/pages/limit-management/issued-limit/index.vue')
    }, {
        name: '预追加限额',
        path: 'store-limit-add',
        icon: 'el-icon-menu',
        component: () => import('@/pages/limit-management/store-limit-add/index.vue')
    }, {
        name: '下达追加限额',
        path: 'issued-limit-add',
        icon: 'el-icon-menu',
        component: () => import('@/pages/limit-management/issued-limit-add/index.vue')
    }, {
        name: '收回限额',
        path: 'recycle-limit',
        icon: 'el-icon-menu',
        component: () => import('@/pages/limit-management/recycle-limit/index.vue')
    }, {
        name: '预存分解限额',
        path: 'store-resolve-limit',
        icon: 'el-icon-menu',
        component: () => import('@/pages/limit-management/store-resolve-limit/index.vue')
    }, {
        name: '下达分解限额',
        path: 'issued-resolve-limit',
        icon: 'el-icon-menu',
        component: () => import('@/pages/limit-management/issued-resolve-limit/index.vue')
    }, {
        name: '收回分解限额',
        path: 'recycle-resolve-limit',
        icon: 'el-icon-menu',
        component: () => import('@/pages/limit-management/recycle-resolve-limit/index.vue')
    }, {
        name: '操作记录查询',
        path: 'operate-log',
        icon: 'el-icon-menu',
        component: () => import('@/pages/limit-management/operate-log/index.vue')
    }, {
        name: '天然林分项变更',
        path: 'change-nature-limit',
        icon: 'el-icon-menu',
        component: () => import('@/pages/limit-management/change-nature-limit/index.vue')
    }, {
        name: '采伐类型分项变更',
        path: 'change-goods-limit',
        icon: 'el-icon-menu',
        component: () => import('@/pages/limit-management/change-goods-limit/index.vue')
    }]
};