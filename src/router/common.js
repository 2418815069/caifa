export default {
    name: '公共页面',
    path: '/common',
    routeName: 'common',
    icon: 'el-icon-menu',
    meta: { name: '公共页面',
        userTypes: [
            4
        ] },
    component: () => import('@/pages/common/index.vue'),
    children: [
        {
            name: '用户中心',
            path: 'account',
            icon: 'el-icon-menu',
            meta: {
                type: 0
            },
            component: () => import('@/pages/common/sso/account')
        },
        {
            name: '登录',
            path: 'login',
            icon: 'el-icon-menu',
            meta: {
                type: 0
            },
            component: () => import('@/pages/common/login')
        }, {
            name: '注册',
            path: 'register',
            icon: 'el-icon-menu',
            meta: {
                type: 0
            },
            component: () => import('@/pages/common/register')
        },
        {
            name: '政务申请',
            path: 'zhengwu-shenqing',
            icon: 'el-icon-menu',
            meta: {
                type: 0
            },
            component: () => import('@/pages/common/zhengwu-shenqing')
        },
        {
        // 采伐证详情也是这个页面
            name: '综合查询详情',
            path: 'integrated-query-detail',
            icon: 'el-icon-menu',
            meta: {
                type: 0
            },
            component: () => import('@/pages/integrated-query/detail/index.vue')
        },
        {
            name: '综合查询详情',
            path: 'integrated-query-detail2',
            icon: 'el-icon-menu',
            meta: {
                type: 0
            },
            component: () => import('@/pages/integrated-query/integrated-query-detail/index.vue'),
            children: [
                {
                    name: '采伐证',
                    path: 'caifazheng',
                    icon: 'el-icon-menu',
                    meta: {
                        type: 0
                    },
                    component: () => import('@/pages/caifa-issuance/caifazhen-preview/index.vue')
                },
                {
                    name: '核发信息',
                    path: 'hefaxinxi',
                    icon: 'el-icon-menu',
                    meta: {
                        type: 0
                    },
                    component: () => import('@/pages/integrated-query/detail/index.vue')
                }
            ]
        } ]
};
