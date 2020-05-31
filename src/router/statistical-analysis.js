export default {
    name: '统计分析',
    path: '/statistical-analysis',
    routeName: 'statistical-analysis',
    icon: 'el-icon-menu',
    meta: { name: '统计分析' },
    component: () => import('@/pages/statistical-analysis/index.vue'),
    children: [ {
        name: '发放量统计',
        path: 'faliang-tj',
        icon: 'el-icon-menu',
        component: () => import('@/pages/statistical-analysis/faliang-tj/index.vue')
    }
    ]
};
