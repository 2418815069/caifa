export default {
    name: '综合查询',
    path: '/integrated-query',
    routeName: 'integrated-query',
    icon: 'el-icon-menu',
    meta: {
        name: '综合查询',
        userTypes: [
            4
        ]
    },
    component: () => import('@/pages/integrated-query/index.vue'),
    children: [{
        name: '进度查询',
        path: 'jindu-query',
        icon: 'el-icon-menu',
        meta: {
            type: 0
        },
        component: () => import('@/pages/integrated-query/jindu-query/index.vue')
    }, {
        name: '采伐证查询',
        path: 'caifazheng-query',
        icon: 'el-icon-menu',
        meta: {
            type: 0
        },
        component: () => import('@/pages/integrated-query/caifazheng-query/index.vue')
    }, {
        name: '流程单',
        path: 'process-query',
        icon: 'el-icon-menu',
        meta: {
            type: 0
        },
        component: () => import('@/pages/integrated-query/process-query/index.vue')
    },
    {
        name: '作废查询',
        path: 'zuofei-query',
        icon: 'el-icon-menu',
        meta: {
            type: 0
        },
        component: () => import('@/pages/integrated-query/zuofei-query/index.vue')
    }, {
        name: '终止查询',
        path: 'zhongzhi-query',
        icon: 'el-icon-menu',
        meta: {
            type: 0
        },
        component: () => import('@/pages/integrated-query/zhongzhi-query/index.vue')
    }, {
        name: '限额使用',
        path: 'xiane-shiyong',
        icon: 'el-icon-menu',
        meta: {
            type: 0
        },
        component: () => import('@/pages/integrated-query/caifazheng-xiane/index.vue')
    }, {
        name: '限额操作记录查询',
        path: 'xiane-caozuo',
        icon: 'el-icon-menu',
        meta: {
            type: 0
        },
        component: () => import('@/pages/integrated-query/xiane-caozuo/index.vue')
    },
    {
        name: '指标使用',
        path: 'zhibiao-shiyong',
        icon: 'el-icon-menu',
        meta: {
            type: 0
        },
        component: () => import('@/pages/integrated-query/zhibiao-shiyong/index.vue')
    },
    {
        name: '指标操作记录查询',
        path: 'zhibiao-query',
        icon: 'el-icon-menu',
        meta: {
            type: 0
        },
        component: () => import('@/pages/integrated-query/zhibiao-query/index.vue')
    },
    {
        name: '政策法规',
        path: 'zhengce-fagui',
        icon: 'el-icon-menu',
        meta: {
            type: 0
        },
        component: () => import('@/pages/integrated-query/zhengce-fagui/index.vue')
    }, {
        name: '证本查询',
        path: 'zhengben-query',
        icon: 'el-icon-menu',
        meta: {
            type: 0
        },
        component: () => import('@/pages/integrated-query/zhengben-query/index.vue')
    }, {
        name: '相关文件',
        path: 'xiangguan-file',
        icon: 'el-icon-menu',
        meta: {
            type: 0
        },
        component: () => import('@/pages/integrated-query/xiangguan-file/index.vue')
    }, {
        name: '用户日志',
        path: 'user-rizhi',
        icon: 'el-icon-menu',
        meta: {
            type: 0
        },
        component: () => import('@/pages/integrated-query/user-rizhi/index.vue')
    }, {
        name: '查看通知',
        path: 'view-notice',
        icon: 'el-icon-menu',
        meta: {
            type: 0
        },
        component: () => import('@/pages/system-setting/notice/index.vue')
    }, {
        name: '双随机',
        path: 'double-random',
        icon: 'el-icon-menu',
        meta: {
            type: 0
        },
        component: () => import('@/pages/integrated-query/double-random/index.vue')
    }, {
        name: '限额串用查询',
        path: 'xiane-chuanyong',
        icon: 'el-icon-menu',
        meta: {
            type: 0
        },
        component: () => import('@/pages/integrated-query/xiane-chuanyong/index.vue')
    }, {
        name: '指标串用查询',
        path: 'zhibiao-chuanyong',
        icon: 'el-icon-menu',
        meta: {
            type: 0
        },
        component: () => import('@/pages/integrated-query/zhibiao-chuanyong/index.vue')
    }
    ]
};
