<script>
import { getUuid } from './config';
import danWeiComm from '@/components/common/danwei';
import {
    caiFaZhengSave,
    caiFaZhengEdit,
    getCaiFaZhengDetail,
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
    getCaiLiao,
    deleteCaiLiao,
    getZhengJianArr,
    getZhengJianVaildDatails
} from './api';
import { cloneDeep } from 'lodash';
import Storage from '@/common/storage';
import axios from 'axios';
export default {
    data() {
        return {
            // 获取省
            provinceDisplayName: this.$root.provinceDisplayName,
            isShengBanZheng: Storage.get('userInfo').jueSeMc === '省办证',
            guid: '',
            isShenHeEdit: false,
            test: true,
            filterData: {},
            uploadData: {},
            uploadHeader: {
                Authorization: Storage.get('jwt')
            },
            form: {
                // muZhu: '1',
                shiXiangJbm: '许可-00344-003',
                isXiane: '2',
                qiTaCfdm: '1',
                applyCardtype: '',
                linQuanDm: '',
                qiYuanDm: '',
                linZhongDm: '',
                senLinLbDm: '',
                shuZhongZdm: '',
                shuZhongDm: '',
                leiBie: '',
                ddlShengzhangZk: '',
                caiFaFsdm: '',
                gengXingFsdm: '',
                caiFaxj: 0,
                caiFaCc: 0,
                caiFaZs: 0
            },
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
                            console.log(999);
                            console.log(value);
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
                        pattern: /^[a-zA-Z0-9]{15,18}$/,
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
                        pattern: /(^\d{15}$)|(^\d{17}(\d|X|x)$)|(^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$)/,
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
                caiFaQxz: [
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
            danWeiCommShow: true
        };
    },
    components: {
        danWeiComm
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
                let o = await getCaiLiao({ shiXiangJbm: this.form.shiXiangJbm });
                this.caiLiaoTableData = o.content;
                // 附件显示
                this.caiLiaoCldata.projId = this.form.guid;
                this.editFuJian(this.form.fuJianInfo);
            } else {
            // 其他
                this.setFormByGuid(res);
            }
        }
    },
    mounted() {},
    methods: {
        async zhengWuSetInit(res) {
            if (res.legalman) {
                let legaArr = res.legalman.split('*');
                res.legalman = legaArr[0];
                res.legalman1 = legaArr[1];
            }
            delete res.projid;
            if (res.guiKouDwdm) {
                res.danWei = res.guiKouDwdm;
            } else {
                res.danWei = res.bianXianDwdm;
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


            this.form.linZhongDm = this.linZhongZiArr[0].bianMa;
            this.form.shuZhongDm = this.youShiShuZhongZiArr[0].bianMa;
            this.form.caiFaFsdm = this.caiFaLeiXingZiArr[0].bianMa;

            // 树种table二级
            this.shuZhongTableDataShuZhongZi = await getYouShiShuZhongZiArr({
                fuBianMa: this.shuZhongTableData[0].shuZhongZdm
            });
            this.shuZhongTableData[0].shuZhongDm = this.shuZhongTableDataShuZhongZi[0].bianMa;

            Object.keys(res).map(x=>{
                if (!res[x]) {
                    delete res[x];
                }
            });
            return res;
        },
        async init() {
            // 查看是否为审核修改
            const {isShenHe} = this.$route.query;
            if (isShenHe) {
                this.isShenHeEdit = true;
            }
            if (isShenHe || this.isShengBanZheng) {
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

            this.shuZhongTableDataShuZhongFu = await getYouShiShuZhongFuArr();

            // 一级部分赋值
            this.form.linQuanDm = this.linMuQiYuanArr[0].bianMa;
            this.form.qiYuanDm = this.linMuQiYuanArr[0].bianMa;
            this.form.senLinLbDm = this.linZhongFuArr[0].bianMa;
            this.form.shuZhongZdm = this.youShiShuZhongFuArr[0].bianMa;
            this.form.caiFaLxdm = this.caiFaLeiXingFuArr[0].bianMa;

            // 树种table
            this.shuZhongTableData[0].shuZhongZdm = this.shuZhongTableDataShuZhongFu[0].bianMa;
            // this.shuZhongTableData[0].shuZhongZdm = this.shuZhongTableDataShuZhongFu[0].bianMa;

            //  shuZhongDm

            // 材料
            let v = await getCaiLiao({ shiXiangJbm: this.form.shiXiangJbm });
            this.caiLiaoTableData = v.content;
            console.log('材料1');
            console.log(this.caiLiaoTableData);

            this.zhengJianArr = await getZhengJianArr({ leiBie: '14' });

            // 此时不要处理二级下拉 在回显数据中去处理
            if (this.$route.query.guid) {
                return;
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

            // 树种table二级
            this.shuZhongTableDataShuZhongZi = await getYouShiShuZhongZiArr({
                fuBianMa: this.shuZhongTableData[0].shuZhongZdm
            });
            this.shuZhongTableData[0].shuZhongDm = this.shuZhongTableDataShuZhongZi[0].bianMa;
        },
        danWeiChange(value) {
            this.form.danWei = value;
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
        validateByForm() {
            const form = this.form;
            let msg = '';
            if (!form.caiFaZs) {
                msg = '请添加树种';
            }
            if (this.form.caiFaXj && Number(this.form.xiaoBanXj) < Number(this.form.caiFaXj)) {
                msg = '小班蓄积不能小于采伐蓄积';
            }
            if (!form.caiFaQxq || !form.caiFaQxz) {
                msg = '采伐期限不能为空';
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
        // 申请
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

                    // 申请切换比较多 处理无用参数
                    // 身份法人相关
                    if (copyForm.applyCardtype === '53') {
                        copyForm.legalman = copyForm.legalman + '*' + copyForm.legalman1;
                        delete copyForm.legalman1;
                    }
                    if (copyForm.applyCardtype === '31') {
                        delete copyForm.legalman;
                    }
                    if (copyForm.isXiane !== '3') {
                        delete copyForm.qiTaCfdm;
                    }
                    // 过滤树种中多余字段
                    let copyShuZhongTable = cloneDeep(this.shuZhongTableSaveData);
                    let arr = [
                        'shuZhongZmc',
                        'shuZhongZdm',
                        'shuZhongDm',
                        'shuZhongMc',
                        'caiFaXjSpc',
                        'caiFaXjFspc',
                        'chuCaiSpc',
                        'chuCaiFspc',
                        'caiFaZs'
                    ];
                    copyShuZhongTable.map((x, index) => {
                        Object.keys(x).map(y => {
                            if (!JSON.stringify(arr).includes(y)) {
                                delete copyShuZhongTable[index][y];
                            }
                        });
                    });

                    // 隐藏字段
                    if (copyForm.systemType) {
                        // 如果stystemType有值传值 （数据来源）
                    } else {
                        copyForm.systemType = '3';// 默认是自建系统
                    }
                    // 沿海林带
                    copyForm.timberType = '3';
                    if (copyForm.fuJianInfo) {
                        delete copyForm.fuJianInfo;
                    }
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
                        // 从新刷新页面
                        if (this.$route.query.guid) {
                            this.$router.go(-1);
                        } else {
                            this.$router.go(0);
                        }
                    }
                }
            });
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
        },

        // 树种table 一级下拉变化
        async shuZhongFuChangeByTale(value) {
            this.shuZhongTableDataShuZhongZi = await getYouShiShuZhongZiArr({
                fuBianMa: value
            });
            this.shuZhongTableData[0].shuZhongDm = this.shuZhongTableDataShuZhongZi[0].bianMa;
        },

        // 删除已经保存的树种
        shuZhongTableDelete(index, row) {
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
                    document.body.removeChild(downloadElement); // 下载完成移除元素
                    window.URL.revokeObjectURL(href); // 释放掉blob对象
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
            Object.assign(this.form, v);
            // 材料
            let o = await getCaiLiao({ shiXiangJbm: this.form.shiXiangJbm });
            this.caiLiaoTableData = o.content;
            this.caiLiaoCldata.projId = this.form.guid;
            // 附件显示
            this.editFuJian(res.fuJianInfo);
            setTimeout(() => {
                this.danWeiCommShow = true;
            }, 200);
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
                Authorization: Storage.get('jwt')
            };
        },

        // 修改
        editApply() {
            this.saveApply();
        },
        // 修改数据初始化
        async editInit(res) {
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

            // 树种table二级
            this.shuZhongTableDataShuZhongZi = await getYouShiShuZhongZiArr({
                fuBianMa: this.shuZhongTableData[0].shuZhongZdm
            });
            this.shuZhongTableData[0].shuZhongDm = this.shuZhongTableDataShuZhongZi[0].bianMa;

            Object.keys(res).map(x=>{
                if (!res[x]) {
                    delete res[x];
                }
            });
            return res;
        },
        // 林种
        async senLinLbDmChange(value) {
            this.linZhongZiArr = await getlinZhongZiArr({ fuBianMa: value });
            let copyForm = cloneDeep(this.form);
            // 需要改变采伐类型 采伐方式
            // 100是公益林对应的采伐类型  300是商品林对应的采伐类型
            if (value === '1') {
                this.caiFaLeiXingFuArr = await getCaiFaLeiXingFuArr({ caiFaLx: 100 });
            } else {
                this.caiFaLeiXingFuArr = await getCaiFaLeiXingFuArr({ caiFaLx: 300 });
            }
            copyForm.caiFaFsdm = '';
            copyForm.caiFaLxdm = '';
            copyForm.linZhongDm = this.linZhongZiArr[0].bianMa;
            this.form = copyForm;
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
    // 树种table
        shuZhongTableSaveData: function (value) {
            let coyForm = cloneDeep(this.form);
            if (value.length) {
                let caiFaJixu = 0;
                let chuCaiLiang = 0;
                let caiFaZhuShu = 0;
                value.map(item => {
                    caiFaJixu += Number(item.caiFaXjSpc) + Number(item.caiFaXjFspc);
                    chuCaiLiang += Number(item.chuCaiSpc) + Number(item.chuCaiFspc);
                    caiFaZhuShu += Number(item.caiFaZs);
                });
                coyForm.caiFaxj = caiFaJixu.toFixed(2);
                coyForm.caiFaCc = chuCaiLiang.toFixed(2);
                coyForm.caiFaZs = caiFaZhuShu.toFixed(2);
            } else {
                coyForm.caiFaxj = 0;
                coyForm.caiFaCc = 0;
                coyForm.caiFaZs = 0;
            }
            this.form = coyForm;
        }
    }
};
</script>

<template>
  <div>
    <div style="font-size: 22px;text-align: center;margin-bottom:30px">沿海国家特殊保护林带许可申请</div>
    <!-- 测试 -->
    <el-form
      ref="shenQiangForm"
      :validate-on-rule-change="false"
      :hide-required-asterisk="true"
      :rules="formRules"
      :model="form"
      label-width="110px"
      size="small"
      label-position="left"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="采伐申请类型:" prop="isXiane">
            <el-select class="width300" v-model="form.isXiane">
              <el-option value="2" label="仅占限额"></el-option>
              <el-option value="3" label="不占限额计划"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="this.form.isXiane==='3'">
          <el-form-item label label-width="0px" prop="qiTaCfdm">
            <el-radio-group v-model="form.qiTaCfdm">
              <el-radio label="1">房前屋后林木</el-radio>
              <el-radio label="2">非林地林木</el-radio>
              <el-radio label="5">征占用林地</el-radio>
              <el-radio label="3">其他</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="申请单位:" prop="shenQinRen">
            <el-input v-model="form.shenQinRen" class="width300"></el-input>
            <span style="color:#F56C6C;width:5%;margin-left:3%">*</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="限额单位:" label-width="90px" prop="danWei">
            <dan-wei-comm v-if="danWeiCommShow" v-bind="danWeiBind" @change="danWeiChange" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="title-bck">联系方式</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item label="证件类型:" label-width="90px" prop="applyCardtype">
              <el-select class="width300" v-model="form.applyCardtype">
                <el-option
                  v-for="(item,index) in zhengJianArr"
                  :key="index"
                  :label="item.mingCheng"
                  :value="item.bianMa"
                ></el-option>
              </el-select>
              <span style="color:#F56C6C;width:5%;margin-left:3%">*</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="证件号码:" prop="applyCardnumber">
              <el-input class="width300" v-model="form.applyCardnumber"></el-input>
              <span style="color:#F56C6C;width:5%;margin-left:3%">*</span>
                  <el-button
                  size="mini"
                  @click="validApplyCardnumber(form.applyCardnumber)"
                >验证
                </el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号:" label-width="90px" prop="telphone">
              <el-input class="width300" v-model="form.telphone"></el-input>
              <span style="color:#F56C6C;width:5%;margin-left:3%">*</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮寄地址:" prop="address">
              <el-input class="width300" v-model="form.address"></el-input>
              <span style="color:#F56C6C;width:5%;margin-left:3%">*</span>
            </el-form-item>
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" v-if="form.applyCardtype==='53'">
          <div class="title-bck">法人信息</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" v-if="form.applyCardtype==='53'">
          <el-col :span="12">
            <el-form-item label="法定代表人:" label-width="90px" prop="legalman">
              <el-input class="width300" v-model="form.legalman"></el-input>
              <span style="color:#F56C6C;width:5%;margin-left:3%">*</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="法定代表人身份证:" label-width="130px" prop="legalman1">
              <el-input class="width300" v-model="form.legalman1"></el-input>
              <span style="color:#F56C6C;width:5%;margin-left:3%">*</span>
               <el-button
                  size="mini"
                  @click="validLegalman1(form.legalman1)"
                >验证
                </el-button>
            </el-form-item>
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="title-bck">采伐依据</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item label="申请依据:" label-width="90px" prop="zuoYeHao">
              <el-input class="width300" v-model="form.zuoYeHao"></el-input>
              <span style="color:#F56C6C;width:5%;margin-left:3%">*</span>
            </el-form-item>
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="title-bck">采伐地点</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item label="林场或乡镇:" label-width="90px" prop="linChang">
              <el-input class="width300" v-model="form.linChang"></el-input>
              <span style="color:#F56C6C;width:5%;margin-left:3%">*</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="林班或村:" prop="linBan">
              <el-input class="width300" v-model="form.linBan"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工区或租:" label-width="90px" prop="gongZuoQu">
              <el-input class="width300" v-model="form.gongZuoQu"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="小地名:" label-width="90px" prop="xiaoDiMing">
              <el-input class="width300" v-model="form.xiaoDiMing"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="title-bck">GPS坐标</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item label="东(X):" label-width="90px" prop="gpsDbx">
              <el-input class="width300" v-model="form.gpsDbx"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="东(Y):" prop="gpsDby">
              <el-input class="width300" v-model="form.gpsDby"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="南(X):" label-width="90px" prop="gpsDnx">
              <el-input class="width300" v-model="form.gpsDnx"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="南(Y):" prop="gpsDny">
              <el-input class="width300" v-model="form.gpsDny"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="西(X):" label-width="90px" prop="gpsXnx">
              <el-input class="width300" v-model="form.gpsXnx"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="西(Y):" prop="gpsXny">
              <el-input class="width300" v-model="form.gpsXny"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="北(X):" label-width="90px" prop="gpsXbx">
              <el-input class="width300" v-model="form.gpsXbx"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="北(Y):" prop="gpsXby">
              <el-input class="width300" v-model="form.gpsXby"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="title-bck">基本信息</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item label="林木权属:" label-width="90px" prop="linQuanDm">
              <el-select
                v-model="form.linQuanDm"
                :disabled="isShenHeEdit||isShengBanZheng"
                class="width300"
              >
                <el-option
                  v-for="(item,key) in quanShuArr"
                  :key="key"
                  :value="item.bianMa"
                  :label="item.mingCheng"
                ></el-option>
              </el-select>
              <span style="color:#F56C6C;width:5%;margin-left:3%">*</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="林木起源:" prop="qiYuanDm">
              <el-select
                v-model="form.qiYuanDm"
                :disabled="isShenHeEdit||isShengBanZheng"
                class="width300"
              >
                <el-option
                  v-for="(item,key) in linMuQiYuanArr"
                  :key="key"
                  :value="item.bianMa"
                  :label="item.mingCheng"
                ></el-option>
              </el-select>
              <span style="color:#F56C6C;width:5%;margin-left:3%">*</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="林种:" label-width="90px" prop="linZhongDm">
              <el-row>
                <el-col :span="12">
                  <el-select
                    disabled
                    @change="senLinLbDmChange"
                    style="width:192px"
                    v-model="form.senLinLbDm"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item,key) in linZhongFuArr"
                      :key="key"
                      :value="item.bianMa"
                      :label="item.mingCheng"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="12">
                  <el-select
                    style="width:192px"
                    :disabled="isShenHeEdit||isShengBanZheng"
                    v-model="form.linZhongDm"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item,key) in linZhongZiArr"
                      :key="key"
                      :value="item.bianMa"
                      :label="item.mingCheng"
                    ></el-option>
                  </el-select>
                  <span style="color:#F56C6C;width:5%;margin-left:3%" v-if="form.muZhu==='1'">*</span>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="优势树种:" prop="shuZhongDm">
              <el-row>
                <el-col :span="12">
                  <el-select
                    :disabled="isShenHeEdit||isShengBanZheng"
                    style="width:192px"
                    @change="shuZhongZdmChange"
                    v-model="form.shuZhongZdm"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item,key) in youShiShuZhongFuArr"
                      :key="key"
                      :value="item.bianMa"
                      :label="item.mingCheng"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="12">
                  <el-select
                    :disabled="isShenHeEdit||isShengBanZheng"
                    style="width:192px"
                    v-model="form.shuZhongDm"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item,key) in youShiShuZhongZiArr"
                      :key="key"
                      :value="item.bianMa"
                      :label="item.mingCheng"
                    ></el-option>
                  </el-select>
                  <span style="color:#F56C6C;width:5%;margin-left:3%">*</span>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="小班蓄积:" prop="xiaoBanXj">
              <el-input class="width300" v-model="form.xiaoBanXj"></el-input>
              <span>立方米</span>
              <span style="color:#F56C6C;width:5%;margin-left:3%" v-if="form.muZhu==='1'">*</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="林分年龄:" label-width="90px" prop="linFenNl">
              <el-input class="width300" v-model="form.linFenNl"></el-input>
              <span style="color:#F56C6C;width:5%;margin-left:3%" v-if="form.muZhu==='1'">*</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="类别:" prop="leiBie">
              <el-row>
                <el-col :span="12">
                  <el-select style="width:192px" v-model="form.leiBie" placeholder="请选择">
                    <el-option value="1" label="大陆海岸基干林带"></el-option>
                    <el-option value="2" label="岛屿海岸基干林带"></el-option>
                  </el-select>
                  <span style="color:#F56C6C;width:5%;margin-left:3%">*</span>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="生长情况:" label-width="90px" prop="shengzhangZk">
              <el-select style="width:192px" v-model="form.shengzhangZk" placeholder="请选择">
                <el-option value="1" label="达到或超过防护成熟年龄"></el-option>
                <el-option value="2" label="生长停滞、防护效益严重下降"></el-option>
              </el-select>
              <span style="color:#F56C6C;width:5%;margin-left:3%">*</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="采伐类型:" prop="caiFaFsdm">
              <el-row>
                <el-col :span="12">
                  <el-select
                    :disabled="isShenHeEdit||isShengBanZheng"
                    style="width:192px"
                    @change="caiFaLxdmChange"
                    v-model="form.caiFaLxdm"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item,key) in caiFaLeiXingFuArr"
                      :key="key"
                      :value="item.bianMa"
                      :label="item.mingCheng"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="12">
                  <el-select
                    style="width:192px"
                    :disabled="isShenHeEdit||isShengBanZheng"
                    v-model="form.caiFaFsdm"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item,key) in caiFaLeiXingZiArr"
                      :key="key"
                      :value="item.bianMa"
                      :label="item.mingCheng"
                    ></el-option>
                  </el-select>
                  <span style="color:#F56C6C;width:5%;margin-left:3%">*</span>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="采伐强度:" prop="xuJiQd">
              <el-input class="width300" v-model="form.xuJiQd"></el-input>
              <span>%</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="采伐面积:" label-width="90px" prop="caiFaMj">
              <el-input class="width300" v-model="form.caiFaMj"></el-input>
              <span>公顷</span>
              <span style="color:#F56C6C;width:5%;margin-left:3%">*</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="采伐蓄积:" prop="caiFaxj">
              <el-input class="width300" disabled v-model="form.caiFaxj"></el-input>
              <span>立方米</span>
              <span style="color:#F56C6C;width:5%;margin-left:3%" v-if="form.muZhu==='1'">*</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="采伐出材:" label-width="90px" prop="caiFaCc">
              <el-input class="width300" disabled v-model="form.caiFaCc"></el-input>
              <span>立方米</span>
              <span style="color:#F56C6C;width:5%;margin-left:3%" v-if="form.muZhu==='1'">*</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="采伐株数:" prop="caiFaZs">
              <el-input class="width300" disabled v-model="form.caiFaZs"></el-input>
              <span>株</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申请采伐原因:" prop="applyReason">
              <el-input class="width300" v-model="form.applyReason"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="采伐期限:" prop="caiFaQxz">
              <el-row>
                <el-col :span="12">
                  <el-date-picker
                    v-model="form.caiFaQxq"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                  ></el-date-picker>
                </el-col>
                <el-col :span="12">
                  <el-date-picker
                    v-model="form.caiFaQxz"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                  ></el-date-picker>
                  <span style="color:#F56C6C;">*</span>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="title-bck">更新信息</div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="更新方式:" label-width="90px" prop="gengXingFsdm">
            <el-select class="width300" v-model="form.gengXingFsdm">
              <el-option
                v-for="(item,key) in gengXinFangShiArr"
                :key="key"
                :value="item.bianMa"
                :label="item.mingCheng"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="更新面积:" prop="gengXingMjdw">
            <el-input class="width300" v-model="form.gengXingMjdw"></el-input>
            <span>公顷</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="更新树种:" label-width="90px" prop="gengXingSz">
            <el-input class="width300" v-model="form.gengXingSz"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="更新期限:" prop="gengXingQx">
            <el-date-picker
              v-model="form.gengXingQx"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注:" label-width="90px" prop="beiZhu">
            <el-input class="width300" v-model="form.beiZhu"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="title-bck">材料上传</div>
        </el-col>
      </el-row>
      <el-row>
        <el-table :data="caiLiaoTableData" style="width:100%" border>
          <el-table-column align="center" prop="caiLiaoLeiBie" label="材料类别"></el-table-column>
          <el-table-column align="center" prop="caiLiaoMingXi" label="材料明细"></el-table-column>
          <el-table-column align="center" label="附件上传">
            <template slot-scope="scope">
              <el-upload
                class="upload-demo"
                :action="caiLiaoFuJianUrl"
                :file-list="scope.row.fileList"
                :data="caiLiaoCldata"
                :headers="caiLiaoUploadHeader"
                :before-upload="caiLiaoUpFn"
                :on-success="caiLiaoSuccessFn"
                :before-remove="caiLiaoDeleBeforeFn"
                :on-preview="caiLiaoClickUpFile"
              >
                <el-button
                  size="mini"
                  type="primary"
                  @click="caiLiaoHandleSave(scope.$index, scope.row)"
                >上传</el-button>
              </el-upload>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="title-bck">采伐树种</div>
        </el-col>
      </el-row>
      <el-row>
        <el-table :data="shuZhongTableData" width="100%" border>
          <el-table-column align="center" label="树种">
            <template slot-scope="scope">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-select
                    style="width:150px"
                    v-model="scope.row.shuZhongZdm"
                    @change="shuZhongFuChangeByTale"
                  >
                    <el-option
                      v-for="(v,k) in shuZhongTableDataShuZhongFu"
                      :key="k"
                      :label="v.mingCheng"
                      :value="v.bianMa"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="12">
                  <el-select style="width:150px" v-model="scope.row.shuZhongDm">
                    <el-option
                      :key="k"
                      v-for="(v,k) in shuZhongTableDataShuZhongZi"
                      :label="v.mingCheng"
                      :value="v.bianMa"
                    ></el-option>
                  </el-select>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column align="center" label="积蓄(立方米)">
            <el-table-column align="center" prop="name" label="商品材" width="150">
              <template slot-scope="scope">
                <el-row>
                  <el-col :span="24">
                    <el-input style="width:90%" v-model="scope.row.caiFaXjSpc"></el-input>
                    <span style="color:#F56C6C;width:5%;margin-left:3%">*</span>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="name" label="非商品材" width="150">
              <template slot-scope="scope">
                <el-row>
                  <el-col :span="24">
                    <el-input style="width:90%" v-model="scope.row.caiFaXjFspc"></el-input>
                    <span style="color:#F56C6C;width:5%;margin-left:3%">*</span>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column align="center" width="100" label="株数">
            <template slot-scope="scope">
              <el-row :gutter="20">
                <el-col :span="24">
                  <el-input v-model="scope.row.caiFaZs"></el-input>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column align="center" label="出材(立方米)">
            <el-table-column align="center" prop="name" label="商品材" width="150">
              <template slot-scope="scope">
                <el-row>
                  <el-col :span="24">
                    <el-input style="width:90%" v-model="scope.row.chuCaiSpc"></el-input>
                    <span style="color:#F56C6C;width:5%;margin-left:3%">*</span>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="name" label="非商品材" width="150">
              <template slot-scope="scope">
                <el-row>
                  <el-col :span="24">
                    <el-input style="width:90%" v-model="scope.row.chuCaiFspc"></el-input>
                    <span style="color:#F56C6C;width:5%;margin-left:3%">*</span>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column align="center" label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                :disabled="isShenHeEdit||isShengBanZheng"
                @click="shuZhongTableAdd(scope.$index, scope.row)"
              >增加树种</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row>
        <div class="footer" style="padding-top:50px" v-if="shuZhongTableSaveData.length>0">
          <el-table :data="shuZhongTableSaveData" style="width:100%" border>
            <el-table-column align="center" prop="shuZhongMc" label="树种"></el-table-column>
            <el-table-column align="center" prop="caiFaXjSpc" label="商品材蓄积(m³)"></el-table-column>
            <el-table-column align="center" prop="caiFaXjFspc" label="非商品材蓄积(m³)"></el-table-column>
            <el-table-column align="center" prop="caiFaZs" label="株数" width="130"></el-table-column>
            <el-table-column align="center" prop="chuCaiSpc" label="商品材出材量(m³)"></el-table-column>
            <el-table-column align="center" prop="chuCaiFspc" label="非商品材出材量(m³)"></el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="shuZhongTableDelete(scope.$index, scope.row)"
                  :disabled="isShenHeEdit||isShengBanZheng"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-row>
    </el-form>
    <div style="width:300px;margin:0 auto">
      <el-button type="primary" size="mini" @click="saveApply" v-if="this.guid===''">申请</el-button>
      <el-button type="primary" size="mini" @click="editApply" v-if="this.guid!==''">修改</el-button>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.container {
  margin: 20px 0;
  padding: 20px;
}

.width300 {
  width: 300px;
}
</style>
