export default {
    name: '系统设置',
    path: '/system-setting',
    routeName: 'system-setting',
    icon: 'el-icon-menu',
    meta: { name: '系统设置',
        userTypes: [
            4
        ] },
    component: () => import('@/pages/system-setting/index.vue'),
    children: [ {
        name: '用户管理',
        path: 'user-mgr',
        icon: 'el-icon-menu',
        meta: {
            type: 0
        },
        component: () => import('@/pages/system-setting/user-mgr/index.vue')
    }, {
        name: '权限管理',
        path: 'permission',
        icon: 'el-icon-menu',
        meta: {
            type: 0
        },
        component: () => import('@/pages/system-setting/permission/index.vue')
    }, {
        name: '基础设置',
        path: 'basic-settings',
        icon: 'el-icon-menu',
        meta: {
            type: 0
        },
        component: () => import('@/pages/system-setting/basic-settings/index.vue')
    }, {
        name: '政策法规',
        path: 'fagui',
        icon: 'el-icon-menu',
        meta: {
            type: 0
        },
        component: () => import('@/pages/system-setting/fagui/index.vue')
    }, {
        name: '相关文件',
        path: 'file',
        icon: 'el-icon-menu',
        meta: {
            type: 0
        },
        component: () => import('@/pages/system-setting/file/index.vue')
    }, {
        name: '审核规程管理',
        path: 'verify-regulation',
        icon: 'el-icon-menu',
        meta: {
            type: 0
        },
        component: () => import('@/pages/system-setting/verify-regulation/index.vue')
    },
    {
        name: '行政单位',
        path: 'xingzheng-danwei',
        icon: 'el-icon-menu',
        meta: {
            type: 0
        },
        component: () => import('@/pages/system-setting/xingzheng-danwei/index.vue')
    },
    {
        name: '编限单位',
        path: 'bianxian-danwei',
        icon: 'el-icon-menu',
        meta: {
            type: 0
        },
        component: () => import('@/pages/system-setting/bianxian-danwei/index.vue')
    },
    {
        name: '归口单位',
        path: 'guikou-danwei',
        icon: 'el-icon-menu',
        meta: {
            type: 0
        },
        component: () => import('@/pages/system-setting/guikou-danwei/index.vue')
    },
    {
        name: '基础数据',
        path: 'jichu-shuju',
        icon: 'el-icon-menu',
        meta: {
            type: 0
        },
        component: () => import('@/pages/system-setting/jichu-shuju/index.vue')
    },
    {
        name: '公告通知',
        path: 'notice',
        icon: 'el-icon-menu',
        meta: {
            type: 0
        },
        component: () => import('@/pages/system-setting/notice/index.vue')
    } ]
};
