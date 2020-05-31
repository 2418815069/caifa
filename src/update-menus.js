// 此文件主要是为了方便前端路由有更新的时候，修改此配置文件之后调下接口，把当前menus入库后端
export default {
    menuMc: '林木采伐管理系统',
    menuBm: 'm',
    target: '/',
    children: [
        {
            menuMc: '采伐限额管理',
            menuBm: 'm04',
            target: '/limit-management',
            icon: 'el-icon-tickets',
            children: [
                {
                    menuMc: '预存限额',
                    menuBm: 'm0401',
                    target: 'store-limit',
                    icon: 'el-icon-star-on'
                }, {
                    menuMc: '下达限额',
                    menuBm: 'm0402',
                    target: 'issued-limit',
                    icon: 'el-icon-star-off'
                }, {
                    menuMc: '预追加限额',
                    menuBm: 'm0403',
                    target: 'store-limit-add',
                    icon: 'el-icon-s-goods'
                }, {
                    menuMc: '下达追加限额',
                    menuBm: 'm0404',
                    target: 'issued-limit-add',
                    icon: 'el-icon-goods'
                }, {
                    menuMc: '收回限额',
                    menuBm: 'm0405',
                    target: 'recycle-limit',
                    icon: 'el-icon-warning'
                }, {
                    menuMc: '预存分解限额',
                    menuBm: 'm0406',
                    target: 'store-resolve-limit',
                    icon: 'el-icon-warning-outline'
                }, {
                    menuMc: '下达分解限额',
                    menuBm: 'm0407',
                    target: 'issued-resolve-limit',
                    icon: 'el-icon-question'
                }, {
                    menuMc: '收回分解限额',
                    menuBm: 'm0408',
                    target: 'recycle-resolve-limit',
                    icon: 'el-icon-info'
                }, {
                    menuMc: '天然林分项变更',
                    menuBm: 'm0409',
                    target: 'change-nature-limit',
                    icon: 'el-icon-circle-plus'
                }, {
                    menuMc: '采伐类型分项变更',
                    menuBm: 'm0409',
                    target: 'change-goods-limit',
                    icon: 'el-icon-circle-plus'
                }
            ]
        },
        {
            menuMc: '采伐指标管理',
            menuBm: 'm06',
            target: '/zhibiao-management',
            icon: 'el-icon-document-copy',
            children: [
                {
                    menuMc: '预存指标',
                    menuBm: 'm0601',
                    target: 'z-store-limit',
                    icon: 'el-icon-success'
                }, {
                    menuMc: '下达指标',
                    menuBm: 'm0602',
                    target: 'z-issued-limit',
                    icon: 'el-icon-error'
                }, {
                    menuMc: '收回指标',
                    menuBm: 'm0603',
                    target: 'z-recycle-limit',
                    icon: 'el-icon-zoom-in'
                }, {
                    menuMc: '预存分解指标',
                    menuBm: 'm0604',
                    target: 'z-store-resolve-limit',
                    icon: 'el-icon-zoom-out'
                }, {
                    menuMc: '下达分解指标',
                    menuBm: 'm0605',
                    target: 'z-issued-resolve-limit',
                    icon: 'el-icon-remove-outline'
                }, {
                    menuMc: '收回分解指标',
                    menuBm: 'm0606',
                    target: 'z-recycle-resolve-limit',
                    icon: 'el-icon-circle-plus-outline'
                }, {
                    menuMc: '天然林分项变更',
                    menuBm: 'm0607',
                    target: 'z-store-limit-add',
                    icon: 'el-icon-circle-check'
                }, {
                    menuMc: '采伐类型分项变更',
                    menuBm: 'm0608',
                    target: 'z-issued-limit-add',
                    icon: 'el-icon-circle-close'
                }
            ]
        },
        {
            menuMc: '采伐证核发',
            menuBm: 'm02',
            target: '/caifa-issuance',
            icon: 'el-icon-document-checked',
            children: [
                {
                    menuMc: '一般林木 申请',
                    menuBm: 'm0201',
                    target: 'yiban',
                    icon: 'el-icon-s-help'
                }, {
                    menuMc: '珍贵树木 申请',
                    menuBm: 'm0202',
                    target: 'zhengui',
                    icon: 'el-icon-help'
                }, {
                    menuMc: '沿海国家特殊保护林带 申请',
                    menuBm: 'm0203',
                    target: 'yanhai',
                    icon: 'el-icon-minus'
                }, {
                    menuMc: '受理',
                    menuBm: 'm0204',
                    target: 'shouli',
                    icon: 'el-icon-plus'
                }, {
                    menuMc: '审核',
                    menuBm: 'm0205',
                    target: 'shenhe',
                    icon: 'el-icon-check'
                }, {
                    menuMc: '决定',
                    menuBm: 'm0206',
                    target: 'jueding',
                    icon: 'el-icon-picture'
                }, {
                    menuMc: '发放',
                    menuBm: 'm0207',
                    target: 'banjie',
                    icon: 'el-icon-picture-outline'
                }, {
                    menuMc: '终止',
                    menuBm: 'm0208',
                    target: 'zhongzhi',
                    icon: 'el-icon-picture-outline-round'
                }, {
                    menuMc: '作废',
                    menuBm: 'm0209',
                    target: 'zuofei',
                    icon: 'el-icon-upload'
                }
            ]
        },
        {
            menuMc: '综合查询',
            menuBm: 'm03',
            target: '/integrated-query',
            icon: 'el-icon-search',
            children:
             [
                 {
                     menuMc: '进度查询',
                     menuBm: 'm0301',
                     target: 'jindu-query',
                     icon: 'el-icon-camera-solid'
                 }, {
                     menuMc: '采伐证查询',
                     menuBm: 'm0302',
                     target: 'caifazheng-query',
                     icon: 'el-icon-camera'
                 },
                 {
                     menuMc: '流程单',
                     menuBm: 'm0303',
                     target: 'process-query',
                     icon: 'el-icon-video-camera-solid'
                 },
                 {
                     menuMc: '作废查询',
                     menuBm: 'm0304',
                     target: 'zuofei-query',
                     icon: 'el-icon-video-camera'
                 }, {
                     menuMc: '终止查询',
                     menuBm: 'm0305',
                     target: 'zhongzhi-query',
                     icon: 'el-icon-message-solid'
                 }, {
                     menuMc: '限额使用',
                     menuBm: 'm0306',
                     target: 'xiane-shiyong',
                     icon: 'el-icon-bell'
                 },
                 {
                     menuMc: '限额操作记录查询',
                     menuBm: 'm0307',
                     target: 'xiane-caozuo',
                     icon: 'el-icon-s-cooperation'
                 },
                 {
                     menuMc: '指标使用',
                     menuBm: 'm0308',
                     target: 'zhibiao-shiyong',
                     icon: 'el-icon-s-order'
                 },
                 {
                     menuMc: '指标操作记录查询',
                     menuBm: 'm0309',
                     target: 'zhibiao-query',
                     icon: 'el-icon-s-platform'
                 },
                 {
                     menuMc: '政策法规',
                     menuBm: 'm0310',
                     target: 'zhengce-fagui',
                     icon: 'el-icon-s-fold'
                 },
                 {
                     menuMc: '证本查询',
                     menuBm: 'm0311',
                     target: 'zhengben-query',
                     icon: 'el-icon-s-unfold'
                 },
                 {
                     menuMc: '相关文件',
                     menuBm: 'm0312',
                     target: 'xiangguan-file',
                     icon: 'el-icon-s-operation'
                 },
                 {
                     menuMc: '用户日志',
                     menuBm: 'm0313',
                     target: 'user-rizhi',
                     icon: 'el-icon-s-promotion'
                 },
                 {
                     menuMc: '查看通知',
                     menuBm: 'm0314',
                     target: 'view-notice',
                     icon: 'el-icon-s-home'
                 },
                 {
                     menuMc: '双随机',
                     menuBm: 'm0315',
                     target: 'double-random',
                     icon: 'el-icon-s-home'
                 },
                 {
                     menuMc: '限额串用查询',
                     menuBm: 'm0316',
                     target: 'xiane-chuanyong',
                     icon: 'el-icon-s-home'
                 },
                 {
                     menuMc: '指标串用查询',
                     menuBm: 'm0317',
                     target: 'zhibiao-chuanyong',
                     icon: 'el-icon-s-home'
                 }
             ]
        },
        {
            menuMc: '统计分析',
            menuBm: 'm08',
            target: '/statistical-analysis',
            icon: 'el-icon-data-line',
            children: [
                {
                    menuMc: '发放量统计',
                    menuBm: 'm0801',
                    target: 'faliang-tj',
                    icon: 'el-icon-menu'
                }
            ]
        },
        {
            menuMc: '系统设置',
            menuBm: 'm01',
            target: '/system-setting',
            icon: 'el-icon-setting',
            children: [
                {
                    menuMc: '用户管理',
                    menuBm: 'm0101',
                    target: 'user-mgr',
                    icon: 'el-icon-s-release'
                },
                {
                    menuMc: '权限管理',
                    menuBm: 'm0102',
                    target: 'permission',
                    icon: 'el-icon-menu'
                },
                {
                    menuMc: '审核规程管理',
                    menuBm: 'm0103',
                    target: 'verify-regulation',
                    icon: 'el-icon-menu'
                },
                {
                    menuMc: '行政单位',
                    menuBm: 'm0105',
                    target: 'xingzheng-danwei',
                    icon: 'el-icon-menu'
                },
                {
                    menuMc: '编限单位',
                    menuBm: 'm0106',
                    target: 'bianxian-danwei',
                    icon: 'el-icon-menu'
                },
                {
                    menuMc: '归口单位',
                    menuBm: 'm0107',
                    target: 'guikou-danwei',
                    icon: 'el-icon-menu'
                },
                {
                    menuMc: '基础数据',
                    menuBm: 'm0108',
                    target: 'jichu-shuju',
                    icon: 'el-icon-menu'
                },
                {
                    menuMc: '相关文件',
                    menuBm: 'm0109',
                    target: 'file',
                    icon: 'el-icon-menu'
                },
                {
                    menuMc: '政策法规',
                    menuBm: 'm0110',
                    target: 'fagui',
                    icon: 'el-icon-menu'
                },
                {
                    menuMc: '公告通知',
                    menuBm: 'm0111',
                    target: 'notice',
                    icon: 'el-icon-menu'
                },
                {
                    menuMc: '基础设置',
                    menuBm: 'm0112',
                    target: 'basic-settings',
                    icon: 'el-icon-menu'
                }
            ]
        },
        {
            menuMc: '用户信息',
            menuBm: 'm05',
            target: '/user-info',
            icon: 'el-icon-user',
            children: [
                {
                    menuMc: '资料修改',
                    menuBm: 'm0501',
                    target: 'modify-info',
                    icon: 'el-icon-user-solid'
                }
            ]
        }
    ]
};

