import { getUuid, jiChengFormConfig, jiChengListProps, xiaoBanList, guanLianZuoYeFormConfig, guanLianZuoYeListProps, zuoYeSaveListProps } from './config';
import danWeiComm from '@/components/common/danwei';
// 作业设计明细
import zuoYeSheJiMingXi from './zuoye-sheji-mingxi';
import {
    caiFaZhengSave,
    caiFaZhengEdit,
    getCaiFaZhengDetail,
    getCaifazhengJiChengList,
    getQuanShuArr,
    linMuQiYuanArr,
    getlinZhongFuArr,
    getlinZhongZiArr,
    getYouShiShuZhongFuArr,
    getYouShiShuZhongZiArr,
    getLingZuArr,
    getCaiFaLeiXingFuArr,
    getCaiFaLeiXingZiArr,
    getGengXinFangShiArr,
    getZhengJianArr,
    getCaiLiao,
    deleteCaiLiao,
    getShenQingLeiXing,
    getGeocoder,
    getSingleXianBao,
    getXingZheng,
    getcurrentXzCode,
    getZuoYeSheJiArr,
    getZuoYeSheJiXiangQiang,
    getZhengJianVaildDatails
} from './api';
import { cloneDeep } from 'lodash';
import Storage from '@/common/storage';
import axios from 'axios';
import 'ol/ol.css';
import { get as getProjection } from 'ol/proj';
import { getWidth, getTopLeft } from 'ol/extent';
import View from 'ol/View';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import WMTS from 'ol/source/WMTS';
import TileWMS from 'ol/source/TileWMS';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import Overlay from 'ol/Overlay';

export default {
    data() {
        return {
            // 获取省
            provinceDisplayName: this.$root.provinceDisplayName,
            isShenHe: false,
            guid: '',
            test: true,
            filterData: {},
            // 采伐证继承相关
            jiChengDialogShow: false,
            // form
            jiChengFormConfig,
            jiChengFormData: {
                dateTime: [],
                shiXiangMcZl: [],
                danWei: Storage.get('userInfo').xzCode,
                page: 1,
                size: 10
            },
            // list
            jiChengListProps,
            jiChengListData: {
                list: [],
                total: 0
            },
            pagerInfo: {
                pageSize: 10,
                pageNo: 1
            },
            // 导入作业设计弹窗
            daoRuZuoYeDialog: false,
            uploadData: {},
            uploadHeader: {
                Authorization: Storage.get('jwt')
            },
            // 导入apiurl
            uploadUrl: `${process.env.VUE_APP_BASE_API}/api/v1/caifazheng/zuoyesheji`,
            // 导入作业设计模板
            downloadMoBan: 'https://caifazhengchaxun.oss-cn-beijing.aliyuncs.com/zuoye.zip',
            form: {
                muZhu: '1',
                // shiXiangJbm: '许可-00344-001-05',
                isXiane: '2',
                qiTaCfdm: '1',
                linQuanDm: '',
                qiYuanDm: '',
                senLinLbDm: '',
                linZhongDm: '',
                shuZhongZdm: '',
                shuZhongDm: '',
                linFenNl: '',
                caiFaLxdm: '',
                caiFaFsdm: '',
                zhuiJiaLx: '1',
                caiFaXj: 0,
                caiFaCc: 0,
                caiFaZs: 0
            },
            // 材质是否禁用
            muZhudisabled: false,
            formRules: {
                shenQinRen: [
                    { required: true, message: '请输入申请单位', trigger: 'blur' }
                ],
                danWei: [
                    {
                        required: true,
                        message: '请选择编限单位',
                        trigger: 'blur',
                        validator: function (rule, value, callback) {
                            if (!value || value.value.length < 10) {
                                callback(new Error('请选择编限单位'));
                            } else {
                                callback();
                            }
                        }
                    }
                ],
                applyCardtype: [
                    { required: true, message: '请选择证件类型', trigger: 'blur' }
                ],
                applyType: [
                    { required: true, message: '请选择申请人类型', trigger: 'blur' }
                ],
                applyCardnumber: [
                    { required: true, message: '请输入证件号码', trigger: 'blur' },
                    {
                        pattern: /(^\d{15}$)|(^\d{17}(\d|X|x)$)|(^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$)/,
                        message: '请输入15位或者18位正确格式',
                        trigger: 'blur'
                    }
                ],
                telphone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    {
                        pattern: /^1[345678]\d{9}$/,
                        message: '请输入正确手机号',
                        trigger: 'blur'
                    }
                ],
                address: [
                    { required: true, message: '请输入邮寄地址', trigger: 'blur' },
                    {
                        pattern: /^.{1,30}$/,
                        message: '请输入正确邮寄地址',
                        trigger: 'blur'
                    }
                ],
                legalman: [
                    { required: true, message: '请输入法定代表人', trigger: 'blur' }
                ],
                legalman1: [
                    {
                        required: true,
                        message: '请输入法定代表人身份证',
                        trigger: 'blur'
                    },
                    {
                        pattern: /^[a-zA-Z0-9]{15,18}$/,
                        message: '请输入15位或者18位正确格式',
                        trigger: 'blur'
                    }
                ],
                zuoYeHao: [
                    { required: true, message: '请输入申请依据', trigger: 'blur' },
                    {
                        pattern: /^.{1,30}$/,
                        message: '请输入正确申请依据',
                        trigger: 'blur'
                    }
                ],
                linQuanZh: [
                    { required: false, message: '请输入林权证号', trigger: 'blur' },
                    {
                        pattern: /^.{1,30}$/,
                        message: '请输入正确林权证号',
                        trigger: 'blur'
                    }
                ],
                zongDihao: [
                    { required: false, message: '请输入宗地号', trigger: 'blur' },
                    { pattern: /^.{1,30}$/, message: '请输入正确宗地号', trigger: 'blur' }
                ],
                linChang: [
                    { required: true, message: '请输入林场或乡镇', trigger: 'blur' },
                    { pattern: /^.{1,20}$/, message: '请输入正确宗地号', trigger: 'blur' }
                ],
                linBan: [
                    { required: false, message: '请输入林班或村', trigger: 'blur' },
                    {
                        pattern: /^.{1,20}$/,
                        message: '请输入正确林班或村',
                        trigger: 'blur'
                    }
                ],
                gongZuoQu: [
                    { required: false, message: '请输入工区或组', trigger: 'blur' },
                    {
                        pattern: /^.{1,20}$/,
                        message: '请输入正确工区或组',
                        trigger: 'blur'
                    }
                ],
                xiaoBan: [
                    { required: false, message: '请输入小班', trigger: 'blur' },
                    { pattern: /^.{1,20}$/, message: '请输入正确小班', trigger: 'blur' }
                ],
                xiaoDiMing: [
                    { required: false, message: '请输入小地名', trigger: 'blur' },
                    { pattern: /^.{1,30}$/, message: '请输入正确小地名', trigger: 'blur' }
                ],
                sbjDong: [
                    { required: true, message: '请输入东至', trigger: 'blur' },
                    { pattern: /^.{1,20}$/, message: '请输入正确东至', trigger: 'blur' }
                ],
                sbjNan: [
                    { required: true, message: '请输入南至', trigger: 'blur' },
                    { pattern: /^.{1,20}$/, message: '请输入正确南至', trigger: 'blur' }
                ],
                sbjXi: [
                    { required: true, message: '请输入西至', trigger: 'blur' },
                    { pattern: /^.{1,20}$/, message: '请输入正确西至', trigger: 'blur' }
                ],
                sbjBei: [
                    { required: true, message: '请输入北至', trigger: 'blur' },
                    { pattern: /^.{1,20}$/, message: '请输入正确北至', trigger: 'blur' }
                ],
                gpsDbx: [
                    { required: false},
                    { pattern: /^[0-9]+(.[0-9]{0,1000})?$/, message: '请输入正确东(X)', trigger: 'blur' }
                ],
                gpsDby: [
                    { required: false},
                    { pattern: /^[0-9]+(.[0-9]{0,1000})?$/, message: '请输入正确东(Y)', trigger: 'blur' }
                ],
                gpsDnx: [
                    { required: false},
                    { pattern: /^[0-9]+(.[0-9]{0,1000})?$/, message: '请输入正确南(X)', trigger: 'blur' }
                ],
                gpsDny: [
                    { required: false},
                    { pattern: /^[0-9]+(.[0-9]{0,1000})?$/, message: '请输入正确南(Y)', trigger: 'blur' }
                ],
                gpsXnx: [
                    { required: false},
                    { pattern: /^[0-9]+(.[0-9]{0,1000})?$/, message: '请输入正确西(X)', trigger: 'blur' }
                ],
                gpsXny: [
                    { required: false},
                    { pattern: /^[0-9]+(.[0-9]{0,1000})?$/, message: '请输入正确西(Y)', trigger: 'blur' }
                ],
                gpsXbx: [
                    { required: false},
                    { pattern: /^[0-9]+(.[0-9]{0,1000})?$/, message: '请输入正确北(X)', trigger: 'blur' }
                ],
                gpsXby: [
                    { required: false},
                    { pattern: /^[0-9]+(.[0-9]{0,1000})?$/, message: '请输入正确北(Y)', trigger: 'blur' }
                ],
                xiaoBanXj: [
                    { required: true, message: '请输入小班积蓄', trigger: 'blur' },
                    {
                        pattern: /^(([1-9][0-9]*)|(([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2})))$/,
                        message: '请输入正确格式',
                        trigger: 'blur'
                    }
                ],
                yuBiDu: [
                    { required: true, message: '请输入郁闭度', trigger: 'blur' },
                    {
                        pattern: /^(([0]\.\d{0,2})|1)$/,
                        message: '请输入0到1区间正确格式',
                        trigger: 'blur'
                    }
                ],
                caiFaLeiXingFangShi: [
                    { required: true, message: '请选择采伐方式', trigger: 'blur' }
                ],
                xuJiQd: [
                    { required: true, message: '请输入积蓄强度', trigger: 'blur' },
                    {
                        pattern: /^(([1-9][0-9]*)|(([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2})))$/,
                        message: '请输入正确格式',
                        trigger: 'blur'
                    }
                ],
                zhuShuQd: [
                    { required: false, message: '请输入积蓄强度', trigger: 'blur' },
                    {
                        pattern: /^(([1-9][0-9]*)|(([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2})))$/,
                        message: '请输入正确格式',
                        trigger: 'blur'
                    }
                ],
                caiFaMj: [
                    { required: true, message: '请输入采伐面积', trigger: 'blur' },
                    {
                        pattern: /^(([1-9][0-9]*)|(([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2})))$/,
                        message: '请输入正确格式',
                        trigger: 'blur'
                    }
                ],
                caiFaxj: [
                    { required: true, message: '请输入采伐面积', trigger: 'blur' },
                    {
                        pattern: /^(([1-9][0-9]*)|(([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2})))$/,
                        message: '请输入正确格式',
                        trigger: 'blur'
                    }
                ],
                caiFaCc: [
                    { required: true, message: '请输入采伐面积', trigger: 'blur' }
                ],
                caiFaQiXian: [
                    { required: true, message: '请输入采伐期限', trigger: 'blur' }
                ],
                gengXingZs: [
                    { required: false, message: '请输入更新株数', trigger: 'blur' },
                    { pattern: /^\d+$/, message: '请输入正确格式', trigger: 'blur' }
                ],
                piWenWh: [{ required: true, message: '请输入批文号', trigger: 'blur' }],
                piWenWjm: [
                    { required: true, message: '请输入批文文件名', trigger: 'blur' }
                ]
            },
            // 需要查询下拉数组
            quanShuArr: [],
            linMuQiYuanArr: [],
            linZhongFuArr: [],
            linZhongZiArr: [],
            youShiShuZhongFuArr: [],
            youShiShuZhongZiArr: [],
            lingZuArr: [],
            caiFaLeiXingFuArr: [],
            caiFaLeiXingZiArr: [],
            gengXinFangShiArr: [],
            shiXiangMingChengArr: [],
            shenQingLeiXingArr: [],
            // 证件类型||申请人类型
            zhengJianArr: [],
            // 材料
            caiLiaoTableData: [],
            caiLiaoCldata: {
                projId: '',
                file: '',
                attrName: '',
                xzCode: '',
                caiLiaoGuid: '',
                caiLiaoMingXi: ''
            },
            caiLiaoFuJianUrl: `${process.env.VUE_APP_BASE_API}/api/v1/fujian`,
            // 附件请求头
            caiLiaoUploadHeader: {
                Authorization: Storage.get('jwt')
            },
            // 树种
            shuZhongTableData: [
                {
                    shuZhongZmc: '',
                    shuZhongZdm: '',
                    shuZhongDm: '',
                    shuZhongMc: '',
                    caiFaXjSpc: 0,
                    caiFaXjFspc: 0,
                    chuCaiSpc: 0,
                    chuCaiFspc: 0,
                    caiFaZs: 0
                }
            ],
            shuZhongTableDataShuZhongFu: [],
            shuZhongTableDataShuZhongZi: [],
            shuZhongTableSaveData: [],
            danWeiBind: {
                prop: {
                    needLabel: true
                }
            },
            danWeiCommShow: true,
            mapDialog: {
                show: false,
                xianBanBh: '',
                map: null,
                view: null,
                xiaoBanLayer: null,
                hasXiaoBan: false
            },
            xiaoBanDialog: {
                show: false,
                xiaoBanList,
                xiaoBanArray: [],
                markers: [],
                data: [],
                verifyXiaoBan: true
            },
            xingZheng: {
                shi: '',
                xian: '',
                xiang: '',
                cun: ''
            },
            xingzhengOptions: {
                shi: [],
                xian: [],
                xiang: [],
                cun: []
            },
            // 关联作业设计档
            guanLianZuoYeDialogShow: false,
            guanLianZuoYeFormConfig,
            guanLianZuoYeFormData: {},
            guanLianZuoYeListData: [],
            guanLianZuoYeListProps,
            // 关联作业设计page
            guanLianPage: 1,
            guanLianZuoYeMingXiDialogShow: false,
            zuoYeMingXi: {
                data: {}
            },
            shuZhongTableShow: true,
            zuoYeShuZhongTableData: [],
            nextPageDisabled: false,
            zuoYeSaveData: [],
            zuoYeSaveListProps,
            zuoyeDate: {},
            zuoYeSaveValidShow: false,
            zuoyeSaveApplyData: {}
        };
    },
    components: {
        danWeiComm,
        zuoYeSheJiMingXi
    },
    async created() {
        await this.init();

        // 存在guid时候去查询回显数据
        const { guid } = this.$route.query;
        if (guid) {
            this.guid = guid;
            let res = await getCaiFaZhengDetail({ guid: this.guid });
            if (res.systemType === '1' && !res.linZhongDm) {
                // 只有数据残缺 且是网上申报才执行
                let v = await this.zhengWuSetInit(res);
                Object.assign(this.form, v);
                // 材料
                if (this.$root.isZheJiang) {
                    let v = await getCaiLiao({ shiXiangJbm: this.form.shiXiangJbm });
                    this.caiLiaoTableData = v.content;
                } else {
                    let v = await getCaiLiao();
                    this.caiLiaoTableData = v.content;
                }
                this.caiLiaoCldata.projId = this.form.guid;
                this.editFuJian(this.form.fuJianInfo);
            } else {
                // 其他
                this.setFormByGuid(res);
            }
        }
    },
    mounted() {
    },
    methods: {
        // 政务申请数据回显
        async zhengWuSetInit(res) {
            if (res.legalman) {
                let legaArr = res.legalman.split('*');
                res.legalman = legaArr[0];
                res.legalman1 = legaArr[1];
            }
            delete res.projid;

            this.linZhongZiArr = await getlinZhongZiArr({
                fuBianMa: this.form.senLinLbDm
            });
            this.youShiShuZhongZiArr = await getYouShiShuZhongZiArr({
                fuBianMa: this.form.shuZhongZdm
            });
            this.caiFaLeiXingZiArr = await getCaiFaLeiXingZiArr({
                fuBianMa: this.form.caiFaLxdm
            });

            res.linZhongDm = this.linZhongZiArr[0].bianMa;
            res.shuZhongDm = this.youShiShuZhongZiArr[0].bianMa;
            res.caiFaFsdm = this.caiFaLeiXingZiArr[0].bianMa;
            // 因政务没有木材竹材设置默认值
            res.muZhu = '1';

            Object.keys(res).map(x => {
                if (!res[x]) {
                    delete res[x];
                }
            });
            return res;
        },

        isXianeChangeByQuanGuo(value) {
            // 默认值
            if (value === '3' && !this.form.qiTaCfdm) {
                this.form.qiTaCfdm = '1';
            }
        },

        async init() {

            if (this.$root.isZheJiang) {
                this.zhengJianArr = await getZhengJianArr({ leiBie: '14' });
                // 这个数据属于用户操作的第一个数据，确保这个数据的依赖接口第一个加载
                this.form.shiXiangJbm = '许可-00344-001-05';
            } else {
                this.zhengJianArr = await getZhengJianArr({ leiBie: '15' });
                // 采伐申请类型
                this.shenQingLeiXingArr = await getShenQingLeiXing();
            }
            // 查看是否为审核修改
            const { isShenHe } = this.$route.query;
            if (isShenHe) {
                this.isShenHe = true;
                this.danWeiBind.prop.allDisabled = true;
            }
            // 一级部分
            this.quanShuArr = await getQuanShuArr();
            this.linMuQiYuanArr = await linMuQiYuanArr();
            this.linZhongFuArr = await getlinZhongFuArr();
            this.youShiShuZhongFuArr = await getYouShiShuZhongFuArr();
            this.lingZuArr = await getLingZuArr();
            this.caiFaLeiXingFuArr = await getCaiFaLeiXingFuArr({ caiFaLx: 100 });
            this.gengXinFangShiArr = await getGengXinFangShiArr();

            this.shuZhongTableDataShuZhongFu = await getYouShiShuZhongFuArr({
                isZhuCai: 0
            });
            let coptyFrom = cloneDeep(this.form);
            // 一级部分赋值
            coptyFrom.linQuanDm = this.linMuQiYuanArr[0].bianMa;
            coptyFrom.qiYuanDm = this.linMuQiYuanArr[0].bianMa;
            coptyFrom.senLinLbDm = this.linZhongFuArr[0].bianMa;
            coptyFrom.shuZhongZdm = this.youShiShuZhongFuArr[0].bianMa;
            coptyFrom.caiFaLxdm = this.caiFaLeiXingFuArr[0].bianMa;

            this.form = coptyFrom;

            // 树种table部分

            this.shuZhongTableData[0].shuZhongZdm = this.shuZhongTableDataShuZhongFu[0].bianMa;
            // 树种子级
            this.shuZhongTableDataShuZhongZi = await getYouShiShuZhongZiArr({
                fuBianMa: this.shuZhongTableData[0].shuZhongZdm
            });
            this.shuZhongTableData[0].shuZhongDm = this.shuZhongTableDataShuZhongZi[0].bianMa;


            // 此时不要处理二级下拉 在回显数据中去处理
            if (this.$route.query.guid) {
                return;
            }

            // 材料
            if (this.$root.isZheJiang) {
                let v = await getCaiLiao({ shiXiangJbm: this.form.shiXiangJbm });
                this.caiLiaoTableData = v.content;
            } else {
                let v = await getCaiLiao();
                this.caiLiaoTableData = v.content;
            }


            this.linZhongZiArr = await getlinZhongZiArr({
                fuBianMa: this.form.senLinLbDm
            });
            this.youShiShuZhongZiArr = await getYouShiShuZhongZiArr({
                fuBianMa: this.form.shuZhongZdm
            });
            this.caiFaLeiXingZiArr = await getCaiFaLeiXingZiArr({
                fuBianMa: this.form.caiFaLxdm
            });

            this.caiLiaoCldata.projId = getUuid();

            this.form.linZhongDm = this.linZhongZiArr[0].bianMa;
            this.form.shuZhongDm = this.youShiShuZhongZiArr[0].bianMa;
            this.form.caiFaFsdm = this.caiFaLeiXingZiArr[0].bianMa;
        },
        async shiXiangJbmChange(value) {
            let v = await getCaiLiao({ shiXiangJbm: value });
            this.caiLiaoTableData = v.content;
        },
        danWeiChange(value) {
            let copyForm = cloneDeep(this.form);
            copyForm.danWei = value;
            this.form = copyForm;
        },
        getLabelByValue(value, arr) {
            let labels = '';
            for (let index = 0; index < arr.length; index++) {
                const element = arr[index];
                if (element.bianMa === value) {
                    labels = element.mingCheng;
                    break;
                }
            }
            return labels;
        },
        getValueByLabel(label, arr) {
            let value = '';
            for (let index = 0; index < arr.length; index++) {
                const element = arr[index];
                if (element.mingCheng === label) {
                    value = element.bianMa;
                    break;
                }
            }
            return value;
        },
        // 申请
        validateByForm() {
            const form = this.form;
            let msg = '';
            if (!form.caiFaZs) {
                msg = '请添加树种';
            }
            if (
                this.form.caiFaXj &&
                Number(this.form.xiaoBanXj) < Number(this.form.caiFaXj)
            ) {
                msg = '小班蓄积不能小于采伐蓄积';
            }
            if (!form.caiFaQxq || !form.caiFaQxz) {
                msg = '采伐期限不能为空';
            }
            if (!this.verifyYiZhangTu(form)) {
                return false;
            }
            if (msg) {
                this.$notify({
                    title: '添加失败',
                    type: 'error',
                    message: msg
                });
                return false;
            }
            return true;
        },
        verifyYiZhangTu(form) {
            if (this.xiaoBanDialog.xiaoBanArray.length > 0 && this.xiaoBanDialog.verifyXiaoBan) {
                let msg = '';
                let xiaoBan = this.xiaoBanDialog.xiaoBanArray[0];
                if (form.qiYuanDm !== (xiaoBan.qiYuan.indexOf('人工') > -1 ? '2' : '1')) {
                    msg += '起源与一张图数据不一致,';
                }
                if (form.senLinLbDm !== (xiaoBan.senLinLb.indexOf('商品林') > -1 ? '2' : '1')) {
                    msg += '森林类别与一张图数据不一致,';
                }
                if (msg) {
                    msg += '如果确定，请在备注填写说明';
                    this.xiaoBanDialog.verifyXiaoBan = false;
                    this.$alert(msg, '一张图校验失败');
                    return false;
                }
            }
            return true;
        },
        async saveApply() {
            if (!this.validateByForm()) {
                return;
            }
            const copyForm = cloneDeep(this.form);
            this.$refs.shenQiangForm.validate(async valid => {
                if (valid) {
                    let obj = {
                        caiFaLxmc: this.getLabelByValue(
                            this.form.caiFaLxdm,
                            this.caiFaLeiXingFuArr
                        ),
                        caiFaFsmc: this.getLabelByValue(
                            this.form.caiFaFsdm,
                            this.caiFaLeiXingZiArr
                        ),
                        senLinLbmc: this.getLabelByValue(
                            this.form.senLinLbDm,
                            this.linZhongFuArr
                        ),
                        linZhongMc: this.getLabelByValue(
                            this.form.linZhongDm,
                            this.linZhongZiArr
                        ),
                        shuZhongZmc: this.getLabelByValue(
                            this.form.shuZhongZdm,
                            this.youShiShuZhongFuArr
                        ),
                        shuZhongMc: this.getLabelByValue(
                            this.form.shuZhongDm,
                            this.youShiShuZhongZiArr
                        ),
                        qiYuanMc: this.getLabelByValue(
                            this.form.qiYuanDm,
                            this.linMuQiYuanArr
                        ),
                        linQuanMc: this.getLabelByValue(
                            this.form.linQuanDm,
                            this.quanShuArr
                        ),
                        shuLingMc: this.getLabelByValue(this.form.linFenNl, this.lingZuArr),
                        gengXingFsmc: this.getLabelByValue(
                            this.form.gengXingFsdm,
                            this.gengXinFangShiArr
                        )
                    };
                    if (copyForm.danWei.value.length > 10) {
                        copyForm.bianXianDwdm = copyForm.danWei.value.substring(0, 10);
                        copyForm.guiKouDwmc = copyForm.danWei.label[3];
                    } else {
                        copyForm.bianXianDwdm = copyForm.danWei.value;
                        copyForm.guiKouDwmc = copyForm.danWei.label[2];
                    }
                    copyForm.bianXianDwmc = copyForm.danWei.label[2];

                    copyForm.guiKouDwdm = copyForm.danWei.value;
                    delete copyForm.danWei;

                    // 处理继承多余字段
                    if (copyForm.qianFaRen) {
                        delete copyForm.qianFaRen;
                    }
                    // 处理全国与浙江不同部分
                    if (!this.$root.isZheJiang) {
                        if (copyForm.isXiane !== '3') {
                            delete copyForm.qiTaCfdm;
                        }
                    }
                    if (copyForm.isXiane !== '4') {
                        delete copyForm.laiZi;
                    }
                    // <--处理完成-->

                    // 身份法人相关
                    let q = 'applyType';
                    if (this.$root.isZheJiang) {
                        q = 'applyCardtype';
                    }
                    if (copyForm[q] === '53') {
                        copyForm.legalman = copyForm.legalman + '*' + copyForm.legalman1;
                        delete copyForm.legalman1;
                    }
                    if (copyForm[q] === '31') {
                        delete copyForm.legalman;
                    }
                    // 事项子类 占林地相关
                    if (copyForm.shiXiangJbm !== '许可-00344-001-02') {
                        // 不是占林地 可能要删除占林地相关参数（piWenWh，piWenWjm）
                        if (copyForm.piWenWh) {
                            delete copyForm.piWenWh;
                        }
                        if (copyForm.piWenWjm) {
                            delete copyForm.piWenWjm;
                        }
                    }

                    // 隐藏字段
                    if (copyForm.systemType) {
                        // 如果stystemType有值传值 （数据来源）
                    } else {
                        copyForm.systemType = '3';// 默认是自建系统
                    }
                    // 一般林木
                    copyForm.timberType = '1';
                    Object.keys(copyForm).map(x => {
                        if (
                            copyForm[x] === null ||
                            copyForm[x] === '' ||
                            copyForm[x] === 'null'
                        ) {
                            delete copyForm[x];
                        }
                        if (copyForm[x] instanceof Array && !copyForm[x].length) {
                            delete copyForm[x];
                        }
                    });
                    // 过滤树种中多余字段
                    let copyShuZhongTable = cloneDeep(this.shuZhongTableSaveData);
                    let arr = [
                        'caiFaXjSpc',
                        'caiFaXjFspc',
                        'caiFaZs',
                        'chuCaiFspc',
                        'chuCaiSpc',
                        'shuZhongDm',
                        'shuZhongMc',
                        'shuZhongZdm',
                        'shuZhongZmc'
                    ];
                    copyShuZhongTable.map((x, index) => {
                        Object.keys(x).map(y => {
                            if (!JSON.stringify(arr).includes(y)) {
                                delete copyShuZhongTable[index][y];
                            }
                        });
                    });
                    // 作业设计字段效验
                    if (copyForm.shejiBh || copyForm.yaLinZmc && !this.guid) {
                        let datas = Object.assign(
                            {},
                            copyForm,
                            obj,
                            { uuid: this.caiLiaoCldata.projId },
                            { shuZhong: copyShuZhongTable }
                        );
                        // 作业设计字段效验
                        let validZuoYe = this.nextSaveApplyValid(datas);
                        if (!validZuoYe) {
                            this.zuoYeSaveValidShow = true;
                            return;
                        }

                    }

                    let v;
                    if (this.guid) {
                        v = await caiFaZhengEdit(
                            Object.assign(
                                {},
                                copyForm,
                                obj,
                                { guid: this.guid },
                                { shuZhong: copyShuZhongTable }
                            )
                        );
                    } else {
                        v = await caiFaZhengSave(
                            Object.assign(
                                {},
                                copyForm,
                                obj,
                                { uuid: this.caiLiaoCldata.projId },
                                { shuZhong: copyShuZhongTable }
                            )
                        );
                    }
                    if (v) {
                        this.$message({
                            message: this.guid ? '修改成功' : '申请成功',
                            type: 'success'
                        });
                        if (this.$route.query.guid) {
                            this.$router.go(-1);
                        } else {
                            this.$router.go(0);
                        }

                        // 湖北一键受理注释
                        // if (this.$root.provinceDisplayName === '湖北') {
                        //     this.$confirm('是否进行受理', '提示', {
                        //         confirmButtonText: '确定',
                        //         cancelButtonText: '取消',
                        //         type: 'warning'
                        //     }).then( async () => {
                        //         let obj = {
                        //             actionId: 'shou_li',
                        //             guid: v.guid
                        //         // opinion: '1212'//意见
                        //         };
                        //         let c = await handlCaifazhengBtn(obj);
                        //         if (c.code === 200) {
                        //             this.$message({
                        //                 message: '受理成功',
                        //                 type: 'success'
                        //             });
                        //         }
                        //     }).catch(() => {
                        //         // this.$message({
                        //         //     type: 'info',
                        //         //     message: '已取消'
                        //         // });
                        //     });
                        // } else if (this.$route.query.guid) {
                        // // 从新刷新页面
                        //     this.$router.go(-1);
                        //     // if (this.$route.query.guid) {
                        //     // this.$router.go(-1);
                        //     // } else {
                        //     // this.$router.go(0);
                        //     // }
                        // } else {
                        //     this.$router.go(0);
                        // }
                    }
                }
            });
        },
        editFuJian(data) {
            let copyTableData = cloneDeep(this.caiLiaoTableData);
            copyTableData.map((item, index) => {
                let arr = [];
                if (data instanceof Array) {
                    data.map(x => {
                        if (item.guid === x.caiLiaoGuid) {
                            arr.push({
                                name: x.filename,
                                response: { data: { fileUrl: x.fileurl, uuid: x.uuid } }
                            });
                        }
                    });
                }
                copyTableData[index].fileList = arr;
            });
            this.caiLiaoTableData = copyTableData;
        },
        // 树种table
        shuZhongTableAdd(index, row) {
            let obj = {
                shuZhongZmc: this.getLabelByValue(
                    row.shuZhongZdm,
                    this.shuZhongTableDataShuZhongFu
                ),
                shuZhongMc: this.getLabelByValue(
                    row.shuZhongDm,
                    this.shuZhongTableDataShuZhongZi
                )
            };
            this.shuZhongTableSaveData.push(Object.assign({}, row, obj));

            this.shuZhongTableData[0].caiFaXjSpc = 0;
            this.shuZhongTableData[0].caiFaXjFspc = 0;
            this.shuZhongTableData[0].chuCaiSpc = 0;
            this.shuZhongTableData[0].chuCaiFspc = 0;
            this.shuZhongTableData[0].caiFaZs = 0;

            // 计算值

            let coyForm = cloneDeep(this.form);
            if (this.shuZhongTableSaveData.length) {
                let caiFaJixu = 0;
                let chuCaiLiang = 0;
                let caiFaZhuShu = 0;
                this.shuZhongTableSaveData.map(item => {
                    caiFaJixu += Number(item.caiFaXjSpc) + Number(item.caiFaXjFspc);
                    chuCaiLiang += Number(item.chuCaiSpc) + Number(item.chuCaiFspc);
                    caiFaZhuShu += Number(item.caiFaZs);
                });
                coyForm.caiFaXj = caiFaJixu.toFixed(2);
                coyForm.caiFaCc = chuCaiLiang.toFixed(2);
                coyForm.caiFaZs = caiFaZhuShu.toFixed(2);
            } else {
                coyForm.caiFaXj = 0;
                coyForm.caiFaCc = 0;
                coyForm.caiFaZs = 0;
            }
            this.form = coyForm;
        },

        // 树种table 一级下拉变化
        async shuZhongFuChangeByTale(value) {
            this.shuZhongTableDataShuZhongZi = await getYouShiShuZhongZiArr({
                fuBianMa: value
            });
            this.shuZhongTableData[0].shuZhongDm = this.shuZhongTableDataShuZhongZi[0].bianMa;
        },

        // 删除已经保存的树种
        shuZhongTableDelete(index) {
            this.shuZhongTableSaveData.splice(index, 1);
            if (this.shuZhongTableSaveData.length === 0) {
                this.shuZhongTableSaveData = [];
            }
        },
        // 材料
        // 上传之前
        caiLiaoUpFn(file) {
            this.caiLiaoCldata.file = file.name;
        },
        caiLiaoClickUpFile(file) {
            let urlStr = '';
            urlStr = `${process.env.VUE_APP_BASE_API}/${file.response.data.fileUrl}`;
            axios
                .get(urlStr, {
                    headers: {
                        Authorization: Storage.get('jwt')
                    },
                    responseType: 'blob'
                })
                .then(x => {
                    const blob = new Blob([x.data], { type: 'application/vnd.ms-excel' });
                    const downloadElement = document.createElement('a');
                    const href = window.URL.createObjectURL(blob);
                    downloadElement.href = href;
                    downloadElement.download = file.name;
                    document.body.appendChild(downloadElement);
                    downloadElement.click();
                    // 下载完成移除元素
                    document.body.removeChild(downloadElement);
                    // 释放掉blob对象
                    window.URL.revokeObjectURL(href);
                })
                .catch(x => {
                    console.error(x);
                });
        },
        caiLiaoHandleSave(index, v) {
            let xzCode = Storage.get('userInfo').xzCode;
            let copyData = cloneDeep(this.caiLiaoCldata);
            copyData.attrName = v.caiLiaoLeiBie;
            copyData.xzCode = xzCode;
            copyData.caiLiaoGuid = v.guid;
            copyData.caiLiaoMingXi = v.caiLiaoMingXi;
            this.caiLiaoCldata = copyData;
        },
        caiLiaoSuccessFn(response) {
            if (response.code === 200) {
                this.$message({
                    type: 'success',
                    message: '上传成功'
                });
            }
        },
        async caiLiaoDeleBeforeFn(file) {
            let v = await deleteCaiLiao({ uuid: file.response.data.uuid });
            if (v) {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }
        },
        // 不同省份显示不同
        setHtmlByProvinceDisplayName() {
            let copyFilterConfig = cloneDeep(this.filterConfig);
            this.filterConfig = this.$setListProps(
                this.$root.provinceDisplayName,
                copyFilterConfig
            );
        },
        // 统一处理query携带参数情况(流程中修改,)
        async setFormByGuid(res) {
            let v = await this.editInit(res);
            this.shuZhongTableSaveData = v.shuZhong;
            this.danWeiCommShow = false;
            this.danWeiBind.value = v.guiKouDwdm;
            this.form = v;
            this.caiLiaoCldata.projId = this.form.guid;
            // 材料
            if (this.$root.isZheJiang) {
                let v = await getCaiLiao({ shiXiangJbm: this.form.shiXiangJbm });
                this.caiLiaoTableData = v.content;
            } else {
                let v = await getCaiLiao();
                this.caiLiaoTableData = v.content;
            }
            this.editFuJian(this.form.fuJianInfo);
            setTimeout(() => {
                this.danWeiCommShow = true;
            }, 200);
            delete this.form.fuJianInfo;
        },
        // 导入作业设计
        daoRuZuoYe() {
            this.daoRuZuoYeDialog = true;
        },
        //  上传成功后（导入作业设置成功后）
        uploadSuccess(response) {
            if (response.code === 500) {
                this.$message({
                    type: 'error',
                    message: response.message
                });
            } else {
                this.$message({
                    type: 'success',
                    message: response.message
                });
            }
            this.uploadData = {};
            this.daoRuZuoYeDialog = false;
        },

        // 上传按钮
        uploadClick() {
            this.uploadHeader = {
                'Authorization': Storage.get('jwt'),
                'Content-Type': 'multipart/form-data'
            };
        },

        // 继承相关
        // 继承按钮
        caiFaZhengJiChengClick() {
            this.jiChengDialogShow = true;
            this.jiChengQuery();
        },
        // 继承查询项变化
        handleJiCheng(data) {
            this.jiChengFormData = data;
        },
        // 继承查询
        async jiChengQuery(data) {
            let query = this.jichengMapQuery(this.jiChengFormData);
            let obj = {};
            if (this.$root.isZheJiang) {
                obj = Object.assign({ timberType: 1 }, query, data);
            } else {
                obj = Object.assign({}, query, data);
            }

            let v = await getCaifazhengJiChengList(obj);
            this.jiChengListData = {
                list: v.content,
                total: v.totalElements
            };
        },
        // 继承分页变化
        updatePagerInfoTOJiCheng(data) {
            let obj = {
                page: data.pageNo,
                size: data.pageSize
            };
            this.jiChengQuery(obj);
        },
        async jiChengAction({ action, data }) {
            if (action === 'jiCheng') {
                // 给材料重新赋值 proJid 防止重复
                this.caiLiaoCldata.projId = getUuid();
                let res = await getCaiFaZhengDetail({
                    guid: data.guid,
                    cfzUuidNew: this.caiLiaoCldata.projId
                });
                let v = await this.editInit(res, 'jiCheng');
                this.form = v;
                this.shuZhongTableSaveData = v.shuZhong;
                this.danWeiCommShow = false;
                this.danWeiBind.value = v.guiKouDwdm;
                // 材料
                if (this.$root.isZheJiang) {
                    let v = await getCaiLiao({ shiXiangJbm: this.form.shiXiangJbm });
                    this.caiLiaoTableData = v.content;
                } else {
                    let v = await getCaiLiao();
                    this.caiLiaoTableData = v.content;
                }
                this.editFuJian(this.form.fuJianInfo);
                setTimeout(() => {
                    this.danWeiCommShow = true;
                }, 200);
                this.jiChengDialogShow = false;
                delete this.form.fuJianInfo;
            }
        },
        // 继承查询前条件映射
        jichengMapQuery(queryParams) {
            let copyQueryParams = cloneDeep(queryParams);
            this.jiChengFormConfig.map(fil => {
                const prop = fil.prop;
                if (prop === 'dateTime') {
                    fil.allProps.map((x, index) => {
                        copyQueryParams[x] = copyQueryParams[prop][index];
                    });
                    delete copyQueryParams[prop];
                }
                if (prop === 'shiXiangMcZl') {
                    fil.allProps.map((x, index) => {
                        copyQueryParams[x] = copyQueryParams[prop][index];
                    });
                    delete copyQueryParams[prop];
                }
            });
            Object.keys(copyQueryParams).map(x => {
                if (!copyQueryParams[x] || String(copyQueryParams[x]) === 'null') {
                    delete copyQueryParams[x];
                }
            });
            return copyQueryParams;
        },
        // 修改
        editApply() {
            this.saveApply();
        },
        // 修改数据初始化
        async editInit(res, isJiCheng) {
            // 继承和修改不能修改材质 添加禁用
            this.muZhudisabled = true;
            if (res.legalman) {
                let legaArr = res.legalman.split('*');
                res.legalman = legaArr[0];
                res.legalman1 = legaArr[1];
            }

            if (res.guiKouDwdm) {
                res.danWei = res.guiKouDwdm;
            } else {
                res.danWei = res.bianXianDwdm;
            }

            // 附件显示
            // if (isJiCheng !== 'jiCheng') {
            // this.editFuJian(res.fuJianInfo);
            // }

            // 如果是继承回显数据要处理的事情
            if (isJiCheng === 'jiCheng') {
                const now = this.$getTime();
                const time = new Date(now).getTime();
                const qTime = new Date(res.caiFaQxq).getTime();
                const zTime = new Date(res.caiFaQxz).getTime();
                if (time > qTime && (time > zTime || time === zTime)) {
                    res.caiFaQxq = now;
                    res.caiFaQxz = '';
                }
                if (time > qTime && time < zTime) {
                    res.caiFaQxq = now;
                    res.caiFaQxz = res.caiFaQxz;
                }
                if (time < qTime && time > zTime) {
                    res.caiFaQxq = now;
                    res.caiFaQxz = res.caiFaQxz;
                }
                // 继承过来数据部分
                delete res.projid;
            }

            // 采伐类型
            if (res.senLinLbDm === '1') {
                this.caiFaLeiXingFuArr = await getCaiFaLeiXingFuArr({ caiFaLx: 100 });
            } else {
                this.caiFaLeiXingFuArr = await getCaiFaLeiXingFuArr({ caiFaLx: 300 });
            }
            // 树种table下拉
            if (res.muZhu === '1') {
                this.shuZhongTableDataShuZhongFu = await getYouShiShuZhongFuArr({
                    isZhuCai: 0
                });
            } else {
                this.shuZhongTableDataShuZhongFu = await getYouShiShuZhongFuArr({
                    isZhuCai: 1
                });
            }
            this.shuZhongTableData[0].shuZhongZdm = this.shuZhongTableDataShuZhongFu[0].bianMa;
            this.shuZhongTableDataShuZhongZi = await getYouShiShuZhongZiArr({
                fuBianMa: this.shuZhongTableData[0].shuZhongZdm
            });
            this.shuZhongTableData[0].shuZhongDm = this.shuZhongTableDataShuZhongZi[0].bianMa;

            // 处理二级下拉
            this.linZhongZiArr = await getlinZhongZiArr({
                fuBianMa: res.senLinLbDm
            });
            this.youShiShuZhongZiArr = await getYouShiShuZhongZiArr({
                fuBianMa: res.shuZhongZdm
            });
            this.caiFaLeiXingZiArr = await getCaiFaLeiXingZiArr({
                fuBianMa: res.caiFaLxdm
            });

            return res;
        },

        // 林种
        async senLinLbDmChange(value) {
            let copyForm = cloneDeep(this.form);
            this.linZhongZiArr = await getlinZhongZiArr({ fuBianMa: value });
            copyForm.linZhongDm = this.linZhongZiArr[0].bianMa;
            console.log('林种子');
            console.log(copyForm.linZhongDm);

            // 需要改变采伐类型 采伐方式
            // 100是公益林对应的采伐类型  300是商品林对应的采伐类型
            if (value === '1') {
                this.caiFaLeiXingFuArr = await getCaiFaLeiXingFuArr({ caiFaLx: 100 });
            } else {
                this.caiFaLeiXingFuArr = await getCaiFaLeiXingFuArr({ caiFaLx: 300 });
            }
            this.caiFaLeiXingZiArr = await getCaiFaLeiXingZiArr({
                fuBianMa: this.caiFaLeiXingFuArr[0].bianMa
            });
            copyForm.caiFaLxdm = this.caiFaLeiXingFuArr[0].bianMa;
            copyForm.caiFaFsdm = this.caiFaLeiXingZiArr[0].bianMa;
            this.form = copyForm;
            console.log(777);
            console.log(this.form);
        },
        // 采伐类型
        async caiFaLxdmChange(value) {
            this.caiFaLeiXingZiArr = await getCaiFaLeiXingZiArr({ fuBianMa: value });
            this.form.caiFaFsdm = this.caiFaLeiXingZiArr[0].bianMa;
        },
        // 优势树种
        async shuZhongZdmChange(value) {
            this.youShiShuZhongZiArr = await getYouShiShuZhongZiArr({
                fuBianMa: value
            });
            this.form.shuZhongDm = this.youShiShuZhongZiArr[0].bianMa;
        },
        // 材质变化
        async caiZhiChange(value) {
            let copyForm = cloneDeep(this.form);
            let copyFormRules = cloneDeep(this.formRules);
            if (value === '2') {
                copyForm.isXiane = '3';
                this.shuZhongTableSaveData = [];
                copyForm.caiFaXj = '';
                copyForm.caiFaCc = '';
                copyForm.caiFaZs = '';
                // 竹材时候不需要限制字段  xiaoBanXj yuBiDu linZhong caiFaXj caiFaCc
                Object.keys(copyFormRules).map(x => {
                    if (
                        x === 'xiaoBanXj' ||
                        x === 'yuBiDu' ||
                        x === '' ||
                        x === 'linZhong' ||
                        x === 'caiFaCc' ||
                        x === 'caiFaXj'
                    ) {
                        delete copyFormRules[x];
                    }
                });
                this.formRules = copyFormRules;
                this.shuZhongTableDataShuZhongFu = await getYouShiShuZhongFuArr({
                    isZhuCai: 1
                });
            }
            if (value === '1') {
                // 不是竹材
                this.shuZhongTableSaveData = [];
                copyForm.caiFaXj = '';
                copyForm.caiFaCc = '';
                copyForm.caiFaZs = '';
                // 竹材时候需要限制字段  xiaoBanXj yuBiDu linZhong caiFaXj caiFaCc
                let arr = ['xiaoBanXj', 'yuBiDu', 'linZhong', 'caiFaCc', 'caiFaXj'];
                arr.map(x => {
                    copyFormRules[x] = [
                        { required: true, message: '请输入正确格式', trigger: 'blur' }
                    ];
                });

                this.formRules = copyFormRules;
                if (copyForm.shiXiangJbm === '许可-00344-001-03') {
                    copyForm.isXiane = '2';
                }
                if (copyForm.shiXiangJbm === '许可-00344-001-04') {
                    copyForm.isXiane = '2';
                }
                if (copyForm.shiXiangJbm === '许可-00344-001-05') {
                    copyForm.isXiane = '2';
                }
                this.shuZhongTableDataShuZhongFu = await getYouShiShuZhongFuArr({
                    isZhuCai: 0
                });
            }
            this.shuZhongTableData[0].shuZhongZdm = this.shuZhongTableDataShuZhongFu[0].bianMa;
            this.shuZhongTableDataShuZhongZi = await getYouShiShuZhongZiArr({
                fuBianMa: this.shuZhongTableData[0].shuZhongZdm
            });
            this.shuZhongTableData[0].shuZhongDm = this.shuZhongTableDataShuZhongZi[0].bianMa;

            this.form = copyForm;
        },
        showMap() {
            this.mapDialog.show = true;
            this.initMap();
        },
        async initMap() {
            if (this.mapDialog.map) {
                this.xiaoBanDialog.verifyXiaoBan = true;
                return;
            }
            let geocoderStr = await getGeocoder();
            let geocoder = JSON.parse(geocoderStr);
            let webKey = '8a6f61a57f68bbdc206b89f2e1a84dc9';
            let projection = getProjection('EPSG:4326');
            let projectionExtent = projection.getExtent();
            let size = getWidth(projectionExtent) / 256;
            let resolutions = new Array(16);
            let matrixIds = new Array(16);
            for (var z = 0; z < 16; ++z) {
                resolutions[z] = size / Math.pow(2, z);
                matrixIds[z] = z;
            }
            // 矢量底图
            let vecUrl = 'http://t{0-7}.tianditu.gov.cn/vec_c/wmts?tk=';
            // 矢量注记
            let cvaUrl = 'http://t{0-7}.tianditu.gov.cn/cva_c/wmts?tk=';
            // 影像底图
            let imageUrl = 'http://t{0-7}.tianditu.gov.cn/img_c/wmts?tk=';

            this.mapDialog.xiaoBanLayer = new TileLayer({
                opacity: 0.7,
                source: new TileWMS({
                    url: 'http://115.238.61.202:8080/geoserver/ZJ_SLZYDTGX/wms',
                    params: {
                        version: '1.1.1',
                        layers: 'ZJ_SLZYDTGX:slzy_xz_2017',
                        transparent: true,
                        styles: '',
                        format: 'image/png'
                    }
                })
            });

            this.mapDialog.view = new View({
                center: [geocoder.location.lon, geocoder.location.lat],
                projection: projection,
                zoom: 10
            });
            this.mapDialog.map = new Map({
                layers: [
                    new TileLayer({
                        opacity: 1,
                        source: new WMTS({
                            url: vecUrl + webKey,
                            layer: 'vec',
                            matrixSet: 'c',
                            format: 'tiles',
                            style: 'default',
                            projection: projection,
                            tileGrid: new WMTSTileGrid({
                                origin: getTopLeft(projectionExtent),
                                resolutions: resolutions,
                                matrixIds: matrixIds
                            }),
                            wrapX: true
                        })
                    }),
                    new TileLayer({
                        opacity: 0.7,
                        source: new WMTS({
                            url: imageUrl + webKey,
                            layer: 'img',
                            matrixSet: 'c',
                            format: 'tiles',
                            style: 'default',
                            projection: projection,
                            tileGrid: new WMTSTileGrid({
                                origin: getTopLeft(projectionExtent),
                                resolutions: resolutions,
                                matrixIds: matrixIds
                            }),
                            wrapX: true
                        })
                    }),
                    new TileLayer({
                        opacity: 1,
                        source: new WMTS({
                            url: cvaUrl + webKey,
                            layer: 'cva',
                            matrixSet: 'c',
                            format: 'tiles',
                            style: 'default',
                            projection: projection,
                            tileGrid: new WMTSTileGrid({
                                origin: getTopLeft(projectionExtent),
                                resolutions: resolutions,
                                matrixIds: matrixIds
                            }),
                            wrapX: true
                        })
                    }),
                    this.mapDialog.xiaoBanLayer
                ],
                target: 'map',
                view: this.mapDialog.view
            });

            this.mapDialog.map.on('click', this.mapClick);
            this.mapDialog.hasXiaoBan = true;
            this.initXingZheng();
        },
        removeXiaoBan() {
            this.mapDialog.map.removeLayer(this.mapDialog.xiaoBanLayer);
            this.mapDialog.hasXiaoBan = false;
        },
        addXiaoBan() {
            this.mapDialog.map.addLayer(this.mapDialog.xiaoBanLayer);
            this.mapDialog.hasXiaoBan = true;
        },
        async mapClick(e) {
            let xzCode = this.xiaoBanDialog.xiaoBanArray.length > 0 ? this.xiaoBanDialog.xiaoBanArray[0].xian : this.xingZheng.xian;
            let xiaoBan = await getSingleXianBao({ xzCode: xzCode, lon: e.coordinate[0], lat: e.coordinate[1] });
            if (!xiaoBan) {
                return;
            }
            xiaoBan.lon = e.coordinate[0];
            xiaoBan.lat = e.coordinate[1];
            this.showXiaoBanInfo(xiaoBan);
        },
        showXiaoBanInfo(xiaoBan) {
            if (this.xiaoBanExist(xiaoBan)) {
                this.$message.warning('当前小班号与已选择小班号重复');
                return;
            }
            if (this.xiaoBanClash(xiaoBan)) {
                return;
            }
            this.xiaoBanDialog.data = [xiaoBan];
            this.xiaoBanDialog.show = true;
        },
        xiaoBanExist(xiaoBan) {
            if (this.xiaoBanDialog.xiaoBanArray.length > 0) {
                return this.xiaoBanDialog.xiaoBanArray.some(xb => xb.xiaoBan === xiaoBan.xiaoBan);
            }
            return false;
        },
        xiaoBanClash(xiaoBan) {
            if (this.xiaoBanDialog.xiaoBanArray.length === 0) {
                return false;
            }
            for (let xb of this.xiaoBanDialog.xiaoBanArray) {
                if (xb.linZhong !== xiaoBan.linZhong) {
                    this.$message.warning('当前林种与已选择小班林种不一致,已选择小班林种:' + xb.linZhong);
                    return true;
                }
                if (xb.qiYuan !== xiaoBan.qiYuan) {
                    this.$message.warning('当前起源与已选择小班起源不一致,已选择小班起源:' + xb.qiYuan);
                    return true;
                }
                if (xb.youShiSz !== xiaoBan.youShiSz) {
                    this.$message.warning('当前优势树种与已选择小班优势树种不一致,已选择小班优势树种:' + xb.youShiSz);
                    return true;
                }
                if (xb.senLinLb !== xiaoBan.senLinLb) {
                    this.$message.warning('当前林种与已选择小班森林类别冲突,已选择小班森林类别:' + xb.senLinLb);
                    return true;
                }
            }
            return false;
        },
        addMarker() {
            let xiaoBan = this.xiaoBanDialog.data[0];
            if (xiaoBan.lon && xiaoBan.lat) {
                let coordinate = [xiaoBan.lon, xiaoBan.lat];
                let elementDiv = document.createElement('div');
                let markerDiv = document.createElement('div');
                markerDiv.className = 'marker';
                elementDiv.appendChild(markerDiv);
                let markerImg = document.createElement('img');
                markerImg.className = 'icon';
                markerImg.alt = '标记';
                let imgUrl = require('../../../theme/img/marker-icon.png');
                markerImg.src = imgUrl;
                elementDiv.appendChild(markerImg);
                let overLayElement = document.getElementById('overLay');
                overLayElement.appendChild(elementDiv);
                let newOverlay = new Overlay({
                    position: coordinate,
                    positioning: 'center-center',
                    element: elementDiv

                });
                elementDiv.onclick = () => {
                    this.removeMarker(xiaoBan, newOverlay);
                };
                this.xiaoBanDialog.markers.push(newOverlay);
                this.mapDialog.map.addOverlay(newOverlay);
            }
            this.xiaoBanDialog.show = false;
            this.xiaoBanDialog.xiaoBanArray.push(xiaoBan);
        },
        clearaddMarker() {
            this.removeAllMarker();
            this.addMarker();
        },
        removeMarker(xiaoBan, overLay) {
            let index = this.xiaoBanDialog.xiaoBanArray.indexOf(xiaoBan);
            if (index < 0) {
                return;
            }
            this.xiaoBanDialog.xiaoBanArray.splice(index, 1);
            this.mapDialog.map.removeOverlay(overLay);
            event.stopPropagation();
            event.cancelBubble = true;
        },
        removeAllMarker() {
            this.xiaoBanDialog.xiaoBanArray.splice(0, this.xiaoBanDialog.xiaoBanArray.length);
            this.xiaoBanDialog.markers.forEach(marker => this.mapDialog.map.removeOverlay(marker));
        },
        async searchXiaoBan() {
            if (!this.mapDialog.xianBanBh) {
                this.$message.warning('小班编号为空,请确认');
                return;
            }
            let xiaoBan = await getSingleXianBao({ xzName: '', xbBh: this.mapDialog.xianBanBh });
            if (!xiaoBan) {
                return;
            }
            this.showXiaoBanInfo(xiaoBan);
        },
        hideMapDialog() {
            this.mapDialog.show = false;
        },
        confirmXiaoBan() {
            if (this.xiaoBanDialog.xiaoBanArray.length > 0) {
                let points = '';
                let xbh = '';
                let xbids = '';
                points += '[';
                this.xiaoBanDialog.xiaoBanArray.forEach((item, index) => {
                    xbh += item.xiaoBan;
                    xbids += item.xiaoBanId;
                    if (item.lon) {
                        points += '{"lon":"' + item.lon + '","lat":"' + item.lat + '"}';
                    }
                    if (index !== this.xiaoBanDialog.xiaoBanArray.length - 1) {
                        xbh += ',';
                        xbids += ',';
                        if (item.lon) {
                            points += ',';
                        }
                    }
                });
                points += ']';
                this.xiaoBanDialog.xiaoBanArray[0].points = points;
                this.xiaoBanDialog.xiaoBanArray[0].xbh = xbh;
                this.xiaoBanDialog.xiaoBanArray[0].xbids = xbids;
            }
            this.bindData();
        },
        bindData() {
            let xiaoBan = this.xiaoBanDialog.xiaoBanArray[0];
            xiaoBan = xiaoBan ? xiaoBan : { qiYuan: '', senLinLb: '' };
            this.form.xiaoBan = xiaoBan.xbh;
            this.form.linChang = xiaoBan.xiangName;
            this.form.linBan = xiaoBan.cunName;
            this.form.qiYuanDm = xiaoBan.qiYuan.indexOf('人工') > -1 ? '2' : '1';
            this.form.senLinLbDm = xiaoBan.senLinLb.indexOf('商品林') > -1 ? '2' : '1';
            this.form.linZhongDm = this.getValueByLabel(xiaoBan.linZhong, this.linZhongZiArr);
            this.mapDialog.show = false;
        },
        async initXingZheng() {
            let xzq = await getcurrentXzCode();
            if (xzq.length === 1) {
                this.initShi();
            } else if (xzq.length === 2) {
                this.xingzhengOptions.shi = [{ xzCode: xzq[1].ccode, xzName: xzq[1].cmc }];
                this.xingZheng.shi = xzq[1].ccode;
                this.initXian();
            } else if (xzq.length === 3) {
                this.xingzhengOptions.shi = [{ xzCode: xzq[1].ccode, xzName: xzq[1].cmc }];
                this.xingZheng.shi = xzq[1].ccode;
                this.xingzhengOptions.xian = [{ xzCode: xzq[2].ccode, xzName: xzq[2].cmc }];
                this.xingZheng.xian = xzq[2].ccode;
                this.initXiang();
            } else if (xzq.length === 4) {
                this.xingzhengOptions.shi = [{ xzCode: xzq[1].ccode, xzName: xzq[1].cmc }];
                this.xingZheng.shi = xzq[1].ccode;
                this.xingzhengOptions.xian = [{ xzCode: xzq[2].ccode, xzName: xzq[2].cmc }];
                this.xingZheng.xian = xzq[2].ccode;
                this.xingzhengOptions.xiang = [{ xzCode: xzq[3].ccode, xzName: xzq[3].cmc }];
                this.xingZheng.xiang = xzq[3].ccode;
                this.initCun();
            }
        },
        async initShi() {
            let params = { pCode: '330000', type: 'shi' };
            let xingzhengs = await getXingZheng(params);
            this.xingzhengOptions.shi = [{ xzCode: '', xzName: '请选择' }].concat(xingzhengs);
        },
        async initXian() {
            if (this.xingZheng.shi) {
                let params = { pCode: this.xingZheng.shi, type: 'xian' };
                let xingzhengs = await getXingZheng(params);
                this.xingzhengOptions.xian = [{ xzCode: '', xzName: '请选择' }].concat(xingzhengs);
            } else {
                this.xingzhengOptions.xian = [];
                this.xingzhengOptions.xiang = [];
                this.xingzhengOptions.cun = [];
            }
            this.xingZheng.xian = '';
            this.xingZheng.xiang = '';
            this.xingZheng.cun = '';
            this.locateMap();
        },
        async initXiang() {
            if (this.xingZheng.xian) {
                let params = { pCode: this.xingZheng.xian, type: 'xiang' };
                let xingzhengs = await getXingZheng(params);
                this.xingzhengOptions.xiang = [{ xzCode: '', xzName: '请选择' }].concat(xingzhengs);
            } else {
                this.xingzhengOptions.xiang = [];
                this.xingzhengOptions.cun = [];
            }
            this.xingZheng.xiang = '';
            this.xingZheng.cun = '';
            this.locateMap();
        },
        async initCun() {
            if (this.xingZheng.xian && this.xingZheng.xiang) {
                let params = { tCode: this.xingZheng.xian, pCode: this.xingZheng.xiang, type: 'cun' };
                let xingzhengs = await getXingZheng(params);
                this.xingzhengOptions.cun = [{ xzCode: '', xzName: '请选择' }].concat(xingzhengs);
            } else {
                this.xingzhengOptions.cun = [];
            }
            this.xingZheng.cun = '';
            this.locateMap();
        },
        async locateMap() {
            let xzName = this.getOptionLabel(this.xingzhengOptions.shi, this.xingZheng.shi)
                + this.getOptionLabel(this.xingzhengOptions.xian, this.xingZheng.xian)
                + this.getOptionLabel(this.xingzhengOptions.xiang, this.xingZheng.xiang)
                + this.getOptionLabel(this.xingzhengOptions.cun, this.xingZheng.cun);
            let data = await getGeocoder({ xzName: xzName });
            let geocoder = JSON.parse(data);
            let view = this.mapDialog.map.getView();
            view.setCenter([geocoder.location.lon, geocoder.location.lat]);
            view.setZoom(this.getZoom());
            this.mapDialog.map.setView(view);
        },
        getZoom() {
            if (this.xingZheng.cun) {
                return 16;
            }
            if (this.xingZheng.xiang) {
                return 15;
            }
            if (this.xingZheng.xian) {
                return 13;
            }
            return 12;
        },
        getOptionLabel(options, value) {
            if (!options || options.length === 0) {
                return '';
            }
            return options.find(o => o.xzCode === value).xzName;
        },
        // 关联作业设计档
        relationZuoYe() {
            this.guanLianZuoYeDialogShow = true;
            this.guanLianPage = 1;
            setTimeout(() => {
                this.guanLianZuoYeQuery();    
            },500);
        },
        handleGuanLianZuoYe(data) {
            console.log(789);
            console.log(data);
            this.guanLianZuoYeFormData = data;
        },
        // 作业设计查询
        async guanLianZuoYeQuery(data) {

            let query = this.guanLianZuoYeMapQuery(Object.assign({}, this.guanLianZuoYeFormData, data));
            
            let v = await getZuoYeSheJiArr(query);
            this.guanLianZuoYeListData = v;
            if (this.guanLianZuoYeListData.length === 0) {
                this.nextPageDisabled = true;
            }


            // }, 1000);

        },
        // 上一页
        prePage() {
            this.nextPageDisabled = false;
            if (this.guanLianPage === 1) {
                return;
            }
            this.guanLianPage -= 1;
            this.guanLianZuoYeQuery({ page: this.guanLianPage });
        },
        // 下一页
        nextPage() {
            if (this.guanLianZuoYeListData.length === 0) {
                return;
            }
            this.guanLianPage += 1;
            this.guanLianZuoYeQuery({ page: this.guanLianPage });

        },
        async guanLianZuoYeAction({ action, data }) {
            // 选择
            if (action === 'choice') {
                let v = await getZuoYeSheJiXiangQiang(data.no);
                this.guanLianZuoYeDialogShow = false;
                // 作业设计详情数据
                this.zuoyeDate = v;
                this.setFormByZuoYeSheJiData(v);
            }
            if (action === 'seeData') {
                let v = await getZuoYeSheJiXiangQiang(data.no);

                this.guanLianZuoYeMingXiDialogShow = true;
                this.zuoYeMingXi = { data: v };

            }
        },

        // 作业设计赋值申请单个赋值（每个字段不一样）
        async setFormByZuoYeSheJiData(data) {
            // let copyForm = cloneDeep(this.form);
            let copyForm = {};
            if (data.sen_Lin_LB_DM) {
                // 会查询二级林种并且变化 采伐类型
                await this.senLinLbDmChange(data.sen_Lin_LB_DM);
                copyForm = cloneDeep(this.form);
                copyForm.senLinLbDm = data.sen_Lin_LB_DM;
            }

            copyForm.shenQinRen = data.client;
            copyForm.applyCardtype = '31';
            copyForm.applyCardnumber = data.idcard;
            copyForm.telphone = data.linkPhone;
            copyForm.address = data.clientAdress;
            copyForm.linQuanZh = data.lqCard;
            copyForm.linChang = data.xiangname;
            copyForm.linBan = data.cunname;
            copyForm.xiaoBan = data.xiaoBan;
            copyForm.xiaoDiMing = data.tm;
            copyForm.sbjDong = data.cfeast;
            copyForm.sbjNan = data.cfsouth;
            copyForm.sbjXi = data.cfwest;
            copyForm.sbjBei = data.cfnorth;
            copyForm.caiFaMj = data.cai_Fa_MJ;

            // 类型类型 采伐方式
            if (data.cai_Fa_Lxdm) {
                copyForm.caiFaLxdm = data.cai_Fa_Lxdm;

                // 查询二级 采伐方式
                this.caiFaLeiXingZiArr = await getCaiFaLeiXingZiArr({ fuBianMa: copyForm.caiFaLxdm });

                // 赋值采伐方式
                copyForm.caiFaFsdm = data.cai_Fa_Fsdm;
            }
            // 默认字段 mobileNo - shejiBh  no -yaLinZmc
            copyForm.shejiBh = data.mobileNo;
            copyForm.yaLinZmc = data.no;
            this.form = copyForm;


            data.speciesdate.map(x => {
                let obj = {
                    shuZhongMc: x.species,
                    caiFaXjSpc: x.cflxj,
                    caiFaXjFspc: 0,
                    caiFaZs: x.cflzs,
                    chuCaiSpc: x.cflcc,
                    chuCaiFspc: 0
                };

                this.zuoYeShuZhongTableData.push(obj);
            });

        },
        // 默认字段 mobileNo - shejiBh  no -yaLinZmc


        // 关联作业设计档查询条件
        guanLianZuoYeMapQuery(queryParams) {
            console.log(777);
            console.log(queryParams);
            let copyQuery = cloneDeep(queryParams);
            if (copyQuery.danWei) {
                if (copyQuery.danWei.xian) {
                    copyQuery.xian = copyQuery.danWei.xian;
                }
                if (copyQuery.danWei.xiang) {
                    copyQuery.xiang = copyQuery.danWei.xiang;
                }
                if (copyQuery.danWei.cun) {
                    copyQuery.cun = copyQuery.danWei.cun;
                }
                delete copyQuery.danWei;
            } else {
                let xzCode = Storage.get('userInfo').xzCode;
                if (xzCode.length === 6) {
                    copyQuery.xian = xzCode;
                }
                if (xzCode.length>6) {
                    copyQuery.xian = xzCode.substr(0,6);
                }
            }
            return copyQuery;
        },
        // 作业设计字段效验(弹窗)
        nextSaveApplyValid(data) {
            // 先清空弹窗数据
            this.zuoYeSaveData = [];
            // 作业设计详情数据

            let copyZuoYeData = cloneDeep(this.zuoyeDate);

            // 林场乡镇
            if (data.linChang !== copyZuoYeData.xiangname) {
                this.zuoYeSaveData.push({ field: '林场', zuoYeField: copyZuoYeData.xiangname, caiFaField: data.linChang });
            }


            // 林班或村
            if (data.linBan !== copyZuoYeData.cunname) {
                this.zuoYeSaveData.push({ field: '林班', zuoYeField: copyZuoYeData.cunname, caiFaField: data.linBan });
            }


            // 工区或组
            if (data.gongZuoQu !== copyZuoYeData.groupName) {
                this.zuoYeSaveData.push({ field: '工区', zuoYeField: copyZuoYeData.groupName, caiFaField: data.gongZuoQu });
            }


            // 小班
            if (data.xiaoBan !== copyZuoYeData.xiaoBan) {
                this.zuoYeSaveData.push({ field: '小班', zuoYeField: copyZuoYeData.xiaoBan, caiFaField: data.xiaoBan });
            }


            // 小地名
            if (data.xiaoDiMing !== copyZuoYeData.tm) {
                this.zuoYeSaveData.push({ field: '小地名', zuoYeField: copyZuoYeData.tm, caiFaField: data.xiaoDiMing });
            }


            // 冬至
            if (data.sbjDong !== copyZuoYeData.cfeast) {
                this.zuoYeSaveData.push({ field: '东至', zuoYeField: copyZuoYeData.cfeast, caiFaField: data.sbjDong });
            }


            // 南至
            if (data.sbjNan !== copyZuoYeData.cfsouth) {
                this.zuoYeSaveData.push({ field: '南至', zuoYeField: copyZuoYeData.cfsouth, caiFaField: data.sbjNan });
            }


            // 西至
            if (data.sbjXi !== copyZuoYeData.cfwest) {
                this.zuoYeSaveData.push({ field: '西至', zuoYeField: copyZuoYeData.cfwest, caiFaField: data.sbjXi });
            }


            // 北至
            if (data.sbjBei !== copyZuoYeData.cfnorth) {
                this.zuoYeSaveData.push({ field: '北至', zuoYeField: copyZuoYeData.cfnorth, caiFaField: data.sbjBei });
            }
            if (this.zuoYeSaveData.length) {
                // 设置设计申请 数据
                this.zuoyeSaveApplyData = data;
                return false;
            }
            return true;

        },
        // 作业设计申请
        async nextSaveApply() {
            this.zuoYeSaveValidShow = false;
            let v = await caiFaZhengSave(this.zuoyeSaveApplyData);
            if (v) {
                this.$message({ message: '申请成功', type: 'success' });
                this.$router.go(0);
            }
        },
        // 验证身份证
        async validApplyCardnumber(applyCardnumber) {
            console.log(applyCardnumber);
            if (!this.form.shenQinRen) {
                this.$message({
                    message: '请添写申请单位',
                    type: 'error'
                });
                return;
            }
            if (!applyCardnumber) {
                this.$message({
                    message: '请添写证件号码',
                    type: 'error'
                });
                return;
            }
            if (!this.form.applyCardtype) {
                this.$message({
                    message: '请选择证件类型',
                    type: 'error'
                });
                return;
            }
            let v = await getZhengJianVaildDatails({ applyCardNumber: applyCardnumber, leixing: this.form.applyCardtype, name: this.form.shenQinRen });
            console.log(JSON.parse(v));
            if (v) {
                let copyForm = cloneDeep(this.form);
                if (this.form.applyCardtype === '31') {
                    // 个人回填信息
                    const res = JSON.parse(v);
                    copyForm.address = res.address.substr(1, res.address.length - 2);
                }

                if (this.form.applyCardtype === '53') {
                    const res = JSON.parse(v);
                    // 法人回填信息
                    copyForm.legalman1 = res.farenCard.substr(1, res.farenCard.length - 2);
                    copyForm.legalman = res.name;
                    copyForm.address = res.address.substr(1, res.address.length - 2);
                    console.log(res.address.length);

                }
                this.form = copyForm;
            }
        },
        // 验证法人身份证
        async validLegalman1(legalman1) {
            if (!this.form.shenQinRen) {
                this.$message({
                    message: '请添写申请单位',
                    type: 'error'
                });
                return;
            }
            if (!this.form.applyCardnumber) {
                this.$message({
                    message: '请添写证件号码',
                    type: 'error'
                });
                return;
            }
            // 写死
            let v = await getZhengJianVaildDatails({ applyCardNumber: this.form.applyCardnumber, leixing: this.form.applyCardtype, name: this.form.shenQinRen });
            if (v) {
                this.$message({
                    message: '验证成功',
                    type: 'success'
                });
            }
        }
    },
    watch: {
        'zuoYeShuZhongTableData': {
            handler: function (value) {
                let coyForm = cloneDeep(this.form);
                if (value.length) {
                    let caiFaJixu = 0;
                    let chuCaiLiang = 0;
                    let caiFaZhuShu = 0;
                    this.zuoYeShuZhongTableData.map(item => {
                        caiFaJixu += Number(item.caiFaXjSpc) + Number(item.caiFaXjFspc);
                        chuCaiLiang += Number(item.chuCaiSpc) + Number(item.chuCaiFspc);
                        caiFaZhuShu += Number(item.caiFaZs);
                    });
                    coyForm.caiFaXj = caiFaJixu.toFixed(2);
                    coyForm.caiFaCc = chuCaiLiang.toFixed(2);
                    coyForm.caiFaZs = caiFaZhuShu.toFixed(2);
                } else {
                    coyForm.caiFaXj = 0;
                    coyForm.caiFaCc = 0;
                    coyForm.caiFaZs = 0;
                }
                this.form = coyForm;
            },
            deep: true
        },
        // 事项子类
        'form.shiXiangJbm':

            function (value) {
                let copyForm = cloneDeep(this.form);
                if (copyForm.muZhu === '2') {
                    return;
                }
                switch (value) {
                    case '许可-00344-001-01':
                        copyForm.isXiane = '3';
                        break;
                    case '许可-00344-001-02':
                        copyForm.isXiane = '3';
                        break;
                    case '许可-00344-001-03':
                        copyForm.isXiane = '2';
                        break;
                    case '许可-00344-001-04':
                        copyForm.isXiane = '2';
                        break;
                    case '许可-00344-001-05':
                        copyForm.isXiane = '2';
                        break;
                    default:
                        break;
                }
                this.form = copyForm;
            }
    }
};
