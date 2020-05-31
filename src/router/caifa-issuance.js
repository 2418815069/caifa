export default {
    name: '采伐证核发',
    path: '/caifa-issuance',
    routeName: 'caifa-issuance',
    icon: 'el-icon-menu',
    meta: {
        name: '系统设置',
        userTypes: [
            4
        ]
    },
    component: () => import('@/pages/caifa-issuance/index.vue'),
    children: [{
        name: '一般林木 申请',
        path: 'yiban',
        icon: 'el-icon-menu',
        meta: {
            name: '系统设置',
            userTypes: [
                4
            ]
        },
        component: () => import('@/pages/caifa-issuance/yiban-mucai/index.vue')
    }, {
        name: '珍贵树木 申请',
        path: 'zhengui',
        icon: 'el-icon-menu',
        meta: {
            type: 0
        },
        component: () => import('@/pages/caifa-issuance/zhengui-mucai/index.vue')
    }, {
        name: '沿海国家特殊保护林带 申请',
        path: 'yanhai',
        icon: 'el-icon-menu',
        meta: {
            type: 0
        },
        component: () => import('@/pages/caifa-issuance/yanhai-lindai/index.vue')
    }, {
        name: '受理',
        path: 'shouli',
        icon: 'el-icon-menu',
        meta: {
            type: 0
        },
        component: () => import('@/pages/caifa-issuance/shouli/index.vue')
    }, {
        name: '审核',
        path: 'shenhe',
        icon: 'el-icon-menu',
        meta: {
            type: 0
        },
        component: () => import('@/pages/caifa-issuance/shenhe/index.vue')
    }, {
        name: '决定',
        path: 'jueding',
        icon: 'el-icon-menu',
        meta: {
            type: 0
        },
        component: () => import('@/pages/caifa-issuance/jueding/index.vue')
    }, {
        name: '发放',
        path: 'banjie',
        icon: 'el-icon-menu',
        meta: {
            type: 0
        },
        component: () => import('@/pages/caifa-issuance/banjie/index.vue')
    }, {
        name: '终止',
        path: 'zhongzhi',
        icon: 'el-icon-menu',
        meta: {
            type: 0
        },
        component: () => import('@/pages/caifa-issuance/zhongzhi/index.vue')
    }, {
        name: '作废',
        path: 'zuofei',
        icon: 'el-icon-menu',
        meta: {
            type: 0
        },
        component: () => import('@/pages/caifa-issuance/zuofei/index.vue')
    }, {
        name: '协办详情',
        path: 'detail',
        icon: 'el-icon-menu',
        meta: {
            type: 0
        },
        component: () => import('@/pages/caifa-issuance/detail/index.vue')
    }, {
        name: '采伐证预览',
        path: 'caifazhen-preview',
        icon: 'el-icon-menu',
        meta: {
            type: 0
        },
        component: () => import('@/pages/caifa-issuance/caifazhen-preview/index.vue')
    }]
};
