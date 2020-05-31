export default {
    name: '用户信息',
    path: '/user-info',
    routeName: 'system-setting',
    icon: 'el-icon-menu',
    meta: { name: '用户信息',
        userTypes: [
            4
        ] },
    component: () => import('@/pages/user-info/index.vue'),
    children: [ {
        name: '资料修改',
        path: 'modify-info',
        icon: 'el-icon-menu',
        meta: {
            type: 0
        },
        component: () => import('@/pages/user-info/modify-info/index.vue')
    } ]
};
