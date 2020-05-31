<script>
import { getItemCaiFaZheng, zhongZhiPost, getZuoYeDetail } from './api';
import { zhongZhiConfig } from './config';
import detailCaoZuo from '@/pages/caifa-issuance/detail/index';
import { cloneDeep } from 'lodash';
import axios from 'axios';
import Storage from '@/common/storage';
import zuoYeSheJiMingXi from '@/pages/caifa-issuance/yiban-mucai/zuoye-sheji-mingxi';
export default {
    data() {
        return {
            detail: {},
            btnActions: [],
            formDatas: [],
            guid: this.$route.query.guid || '',
            type: '一般林木',
            timberTypeMc: '',
            isXianeMc: '',
            qiTaCfdmMc: '',
            ddlShengzhangZkMc: '',
            // 独立部分（终止采伐固定）
            zhongZhiTableData: [],
            zhongZhiConfig,
            zhongZhiData: {
                // 是否已采伐
                isYiCaiFa: '1'
            },
            apiUrl: process.env.VUE_APP_BASE_API,
            zhuanBaoFuJianName: '',
            guanLianZuoYeMingXiDialogShow: false,
            zuoYeMingXi: { data: {} },
            shouLiXinXiBind: {}
        };
    },
    components: {
        detailCaoZuo,
        zuoYeSheJiMingXi
    },
    async created() {
        this.getDetail();
    },
    methods: {
        async getDetail() {
            this.detail = await getItemCaiFaZheng({
                guid: this.guid
            });
            this.shouLiXinXiBind.res = this.detail;

            if (this.detail.timberType === '1') {
                this.timberTypeMc = '一般林木';
            }
            if (this.detail.timberType === '2') {
                this.timberTypeMc = '珍贵树木';
                const arr = this.detail.flowInfo[4].accessoryurl.split('/');
                this.zhuanBaoFuJianName = arr[arr.length - 1];
            }
            if (this.detail.timberType === '3') {
                this.timberTypeMc = '沿海保护林带';
            }


            if (this.detail.isXiane === '2') {
                this.isXianeMc = '仅占限额';
            }
            if (this.detail.isXiane === '3') {
                this.isXianeMc = '不占限额计划';
            }

            if (this.detail.qiTaCfdm === '1') {
                this.qiTaCfdmMc = '房前屋后林木';
            }
            if (this.detail.qiTaCfdm === '2') {
                this.qiTaCfdmMc = '非林地林木';
            }
            if (this.detail.qiTaCfdm === '3') {
                this.qiTaCfdmMc = '其他';
            }
            if (this.detail.qiTaCfdm === '5') {
                this.qiTaCfdmMc = '征占用林地';
            }

            if (this.detail.ddlShengzhangZk === '1') {
                this.ddlShengzhangZkMc = '达到或超过防护成熟年龄';
            }

            if (this.detail.ddlShengzhangZk === '2') {
                this.ddlShengzhangZkMc = '生长停滞、防护效益严重下降';
            }

            if (Boolean(this.$route.query.isZhongZhi) === true) {
                let arr = [];
                this.detail.shuZhong.map((x, index) => {
                    arr.push(x);
                    let obj = {
                        // 避免数据完全一样 其余为要传的参数
                        id: index + 1,
                        guid: x.guid,
                        caiFaXjFspc: x.caiFaXjFspc,
                        caiFaXjSpc: x.caiFaXjSpc,
                        caiFaZs: x.caiFaZs,
                        chuCaiFspc: x.chuCaiFspc,
                        chuCaiSpc: x.chuCaiSpc
                    };
                    arr.push(obj);
                });
                this.zhongZhiTableData = arr;
            }
        },
        // 终止按钮
        async zhongZhiClick() {
            this.$refs.zhongZhiForm.validate(async valid => {
                if (valid) {
                    let arr = [];
                    let copyTableData = cloneDeep(this.zhongZhiTableData);
                    copyTableData.map((x, index) => {
                        if (x.id) {
                            let obj = {
                                guid: x.guid,
                                sjcaiFaXjSpc: Number(x.caiFaXjSpc),
                                sjcaiFaXjFspc: Number(x.caiFaXjFspc),
                                sjcfZhuShu: Number(x.caiFaZs),
                                sjchuCaiSpc: Number(x.chuCaiSpc),
                                sjchuCaiFspc: Number(x.chuCaiFspc)
                            };
                            delete copyTableData[index].id;
                            arr.push(obj);
                        }
                    });
                    let obj = Object.assign(
                        {
                            shuzhongs: JSON.stringify(arr),
                            guid: this.detail.guid,
                            actionId: 'zhong_zhi'
                        },
                        this.zhongZhiData
                    );
                    delete obj.isYiCaiFa;
                    let v = await zhongZhiPost(obj);
                    if (v.code === 200) {
                        this.$message({
                            type: 'success',
                            message: v.message
                        });
                        this.$router.go(-1);
                    }
                }
            });
        },
        zhongZhiUpdate(data) {
            if (this.zhongZhiData.isYiCaiFa !== data.isYiCaiFa) {
                this.isYiCaiFaChange(data.isYiCaiFa);
            }
            this.zhongZhiData = data;
        },
        // 是否已经采伐变化
        isYiCaiFaChange(value) {
            let arr = [];
            let isYiCaiFaTrue = value === '1';
            this.detail.shuZhong.map((x, index) => {
                arr.push(x);
                let obj = {
                    // 避免数据完全一样 其余为要传的参数
                    id: index + 1,
                    caiFaXjFspc: isYiCaiFaTrue ? x.caiFaXjFspc : 0,
                    caiFaXjSpc: isYiCaiFaTrue ? x.caiFaXjSpc : 0,
                    caiFaZs: isYiCaiFaTrue ? x.caiFaZs : 0,
                    chuCaiFspc: isYiCaiFaTrue ? x.chuCaiFspc : 0,
                    chuCaiSpc: isYiCaiFaTrue ? x.chuCaiSpc : 0
                };
                arr.push(obj);
            });
            this.zhongZhiTableData = arr;
        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0) {
                if (rowIndex % 2 === 0) {
                    return {
                        rowspan: 2,
                        colspan: 1
                    };
                }
                return {
                    rowspan: 0,
                    colspan: 0
                };
            }
        },
        // 返回按钮（前端）
        goBack() {
            this.$router.go(-1);
        },
        // 查看作业设计档案
        async seeZuoYeData(no) {
            // no
            let v = await getZuoYeDetail(no);
            this.guanLianZuoYeMingXiDialogShow = true;
            this.zuoYeMingXi = { data: v };
        },
        getShuZhongInfo(shuZhong) {
            if (!shuZhong || shuZhong.length === 0) {
                return '';
            }
            return shuZhong.reduce((oldVal, val) => {
                return `${oldVal}${val.shuZhongMc},采伐${val.sjcfZhuShu}株,商品材蓄积${val.caiFaXjSpc}立方米,商品出材${val.chuCaiSpc}立方米`;
            }, '');
        },
        downloadFile(url, name) {
            let urlStr = `${process.env.VUE_APP_BASE_API}${url}`;
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
                    downloadElement.download = name;
                    document.body.appendChild(downloadElement);
                    downloadElement.click();
                    document.body.removeChild(downloadElement); // 下载完成移除元素
                    window.URL.revokeObjectURL(href); // 释放掉blob对象
                })
                .catch(x => { });
        }
    }
};
</script>

<template>
  <div class="issuance-detail">
    <!-- 关联作业设计明细 -->
    <el-dialog
      :close-on-click-modal="false"
      width="85%"
      :visible.sync="guanLianZuoYeMingXiDialogShow"
    >
      <zuo-ye-she-ji-ming-xi
        v-if="guanLianZuoYeMingXiDialogShow"
        v-bind="zuoYeMingXi"
      ></zuo-ye-she-ji-ming-xi>
    </el-dialog>
    <div v-if="this.detail.timberType === '1'||!this.$root.isZheJiang">
      <div class="title">林木采伐许可证</div>
      <div class="group-title">采伐许可证信息</div>
      <div class="content">
        <div
          class="content-item"
          v-if="this.$root.isZheJiang"
        >
          申报号:
          <span class="blue">{{detail.projid}}</span>
        </div>
        <div
          class="content-item"
          v-else
        >
          申请编号:
          <span class="blue">{{detail.caiFaZh}}</span>
        </div>
        <div
          class="content-item"
          v-if="this.$root.isZheJiang"
        >
          采伐证类型:
          <span class="blue">{{timberTypeMc}}</span>
        </div>
        <div class="content-item">
          采伐单位或个人:
          <span class="blue">{{detail.shenQinRen}}</span>
        </div>
        <div class="content-item">
          编限单位:
          <span class="blue">{{detail.bianXianDwmc}}</span>
        </div>
        <div class="content-item">
          归口单位:
          <span class="blue">{{detail.guiKouDwmc}}</span>
        </div>
      </div>
      <div class="group-title">联系方式</div>
      <div class="content">
        <div class="content-item">
          统一社会信用代码或身份证号:
          <span class="blue">{{detail.applyCardnumber}}</span>
        </div>
        <div class="content-item">
          手机号:
          <span class="blue">{{detail.telphone}}</span>
        </div>
        <div class="content-item">
          地址:
          <span class="blue">{{detail.address}}</span>
        </div>
      </div>
      <div class="group-title">申请依据:</div>
      <div class="content">
        <div class="content-item">
          采伐设计号:
          <span class="blue">{{detail.zuoYeHao}}</span>
        </div>
        <div class="content-item">
          林权证号:
          <span class="blue">{{detail.linQuanZh}}</span>
        </div>
      </div>
      <div class="group-title">采伐地点</div>
      <div class="content">
        <div class="content-item">
          林场或乡镇:
          <span class="blue">{{detail.linChang}}</span>
        </div>
        <div class="content-item">
          林班或村:
          <span class="blue">{{detail.linBan}}</span>
        </div>
        <div class="content-item">
          工区或组:
          <span class="blue">{{detail.gongZuoQu}}</span>
        </div>
        <div class="content-item">
          小 班:
          <span class="blue">{{detail.xiaoBan}}</span>
        </div>
        <div
          class="content-item"
          v-if="detail.yaLinZmc"
        >
          <el-button
            size="mini"
            type="primary"
            @click="seeZuoYeData(detail.yaLinZmc)"
          >查看作业设计档案</el-button>
        </div>

        <div class="content-item">
          小 地 名:
          <span class="blue">{{detail.xiaoDiMing}}</span>
        </div>
      </div>
      <div class="group-title">四 边 界</div>
      <div class="content">
        <div
          class="content-item"
          style="width:100%;margin-bottom:20px"
        >
          东至:
          <span
            class="blue"
            style="margin-right:100px"
          >{{detail.sbjDong}}</span>
          南至:
          <span
            class="blue"
            style="margin-right:100px"
          >{{detail.sbjNan}}</span>
          西至:
          <span
            class="blue"
            style="margin-right:100px"
          >{{detail.sbjXi}}</span>
          北至:
          <span class="blue">{{detail.sbjBei}}</span>
        </div>
        <div class="content-item">
          GPS坐标: 东（X,Y）:（
          <span class="blue">{{detail.gpsDbx}}</span>,
          <span class="blue">{{detail.gpsDby}}</span>）；
          <span style="margin-right:50px" />
          南（X,Y）:（
          <span class="blue">{{detail.gpsDnx}}</span>,
          <span class="blue">{{detail.gpsDny}}</span>）
          <span style="margin-right:50px" />
          西（X,Y）:（
          <span class="blue">{{detail.gpsXnx}}</span>,
          <span class="blue">{{detail.gpsXny}}</span>）；
          <span style="margin-right:50px" />
          北（X,Y）:（
          <span class="blue">{{detail.gpsXbx}}</span>,
          <span class="blue">{{detail.gpsXby}}</span>）
        </div>
      </div>
      <div class="group-title">基本信息</div>
      <div class="content base-info">
        <div
          class="content-item"
          style="width:20%;margin-bottom:10px"
        >
          林木权属:
          <span class="blue">{{detail.linQuanMc}}</span>
        </div>
        <div
          class="content-item"
          style="width:20%;margin-bottom:10px"
        >
          林木起源:
          <span class="blue">{{detail.qiYuanMc}}</span>
        </div>
        <div
          class="content-item"
          style="width:20%;margin-bottom:10px"
        >
          林 种:
          <span class="blue">{{detail.senLinLbmc}} {{detail.linZhongMc}}</span>
        </div>
        <div
          class="content-item"
          style="width:20%;margin-bottom:10px"
        >
          优势树种:
          <span class="blue">{{detail.shuZhongZmc}} {{detail.shuZhongMc}}</span>
        </div>
        <div
          class="content-item"
          style="width:20%;margin-bottom:10px"
        >
          林 龄:
          <span class="blue">{{detail.shuLingMc}}</span>
        </div>
        <div
          class="content-item"
          style="width:20%;margin-bottom:10px"
        >
          小班蓄积:
          <span class="blue">{{detail.xiaoBanXj}}</span>
        </div>
        <div
          class="content-item"
          style="width:20%;margin-bottom:10px"
        >
          郁 闭 度:
          <span class="blue">{{detail.yuBiDu}}</span>
        </div>
        <div
          class="content-item"
          style="width:20%;margin-bottom:10px"
        >
          采伐类型:
          <span class="blue">{{detail.caiFaLxmc}}</span>
        </div>
        <div
          class="content-item"
          style="width:20%;margin-bottom:10px"
        >
          采伐方式:
          <span class="blue">{{detail.caiFaFsmc}}</span>
        </div>
        <div
          class="content-item"
          style="width:20%;margin-bottom:10px"
        >
          蓄积强度:
          <span class="blue">{{detail.xuJiQd}}</span>
        </div>
        <div
          class="content-item"
          style="width:20%;margin-bottom:10px"
        >
          株数强度:
          <span class="blue">{{detail.zhuShuQd}}</span>
        </div>
        <div
          class="content-item"
          style="width:20%;margin-bottom:10px"
        >
          采伐面积:
          <span class="blue">{{detail.caiFaMj}}</span>
        </div>
        <div
          class="content-item"
          style="width:20%;margin-bottom:10px"
        >
          采伐蓄积:
          <span class="blue">{{detail.caiFaXj}}</span>
        </div>
        <div
          class="content-item"
          style="width:20%;margin-bottom:10px"
        >
          采伐出材:
          <span class="blue">{{detail.caiFaCc}}</span>
        </div>
        <div
          class="content-item"
          style="width:20%;margin-bottom:10px"
        >
          采伐株数:
          <span class="blue">{{detail.caiFaZs}}</span>
        </div>
      </div>
      <div class="group-title">树种信息</div>
      <div class="content">
        <el-table
          :data="detail.shuZhong"
          style="width: 100%"
        >
          <el-table-column
            prop="shuZhongMc"
            label="树种"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="caiFaXjSpc"
            label="商品材蓄积"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="caiFaXjFspc"
            label="非商品材蓄积"
          ></el-table-column>
          <el-table-column label="总蓄积(m³)">
            <template slot-scope="scope">
              <div v-text="scope.row.caiFaXjSpc+scope.row.caiFaXjFspc"></div>
            </template>
          </el-table-column>
          <el-table-column
            prop="caiFaZs"
            label="株数"
          ></el-table-column>
          <el-table-column
            prop="chuCaiSpc"
            label="商品材出材"
          ></el-table-column>
          <el-table-column
            prop="chuCaiFspc"
            label="非商品材出材"
          ></el-table-column>
          <el-table-column label="总出材量(m³)">
            <template slot-scope="scope">
              <div v-text="scope.row.chuCaiFspc+scope.row.chuCaiSpc"></div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="group-title">其他信息</div>
      <div class="content base-info">
        <div
          class="content-item"
          style="width:100%;margin-bottom:20px"
        >
          采伐期限: 从
          <span class="blue">{{detail.caiFaQxq}}</span>至
          <span
            class="blue"
            style="margin:0 10px"
          >{{detail.caiFaQxz}}</span>
        </div>
        <div
          class="content-item"
          style="width:20%;padding:0"
        >
          更新树种:
          <span class="blue">{{detail.gengXingSz}}</span>
        </div>
        <div
          class="content-item"
          style="width:20%;padding:0"
        >
          更新方式:
          <span class="blue">{{detail.gengXingFsmc}}</span>
        </div>
        <div
          class="content-item"
          style="width:20%;padding:0"
        >
          更新期限:
          <span class="blue">{{detail.gengXingQx}}</span>
        </div>
        <div
          class="content-item"
          style="width:20%;padding:0"
        >
          更新面积:
          <span class="blue">{{detail.gengXingMjdw}}</span>
        </div>
        <div
          class="content-item"
          style="width:20%;padding:0;margin-bottom:20px"
        >
          更新株数:
          <span class="blue">{{detail.gengXingZs}}</span>
        </div>
        <div
          class="content-item"
          style="width:100%"
        >
          <!-- 备注: <span class="blue">{{getShuZhongInfo(detail.shuZhong)}}{{detail.beiZhu}}</span> -->
          备注:
          <span class="blue">{{detail.beiZhu}}</span>
        </div>
      </div>
      <div class="group-title">附件</div>
      <div class="content base-info">
        <el-table
          :data="detail.fuJianInfo"
          style="width: 100%"
        >
          <el-table-column
            prop="1"
            label="序号"
            width="180"
          >
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="2"
            label="材料类型"
            width="180"
          >
            <template slot-scope="scope">
              <span>{{scope.row.attrname}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="3"
            label="收取方式"
          >
            <template slot-scope="scope">
              <span>{{scope.row.taketype}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="4"
            label="附件名称"
          >
            <template slot-scope="scope">
              <div
                @click="downloadFile(scope.row.fileurl,scope.row.filename)"
                class="blue"
                style="cursor: pointer;"
              >{{scope.row.filename}}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="group-title">环节信息</div>
      <div
        class="sl-content base-info"
        style="padding-top:20px"
      >
        <div class="table-row-div">
          <div class="table-td-div">
            时间
          </div>
          <div class="table-td-div">
            环节
          </div>
          <div class="table-td-div">
            姓名
          </div>
          <div class="table-td-div">
            意见
          </div>
        </div>
        <div class="table-row-div">
          <div class="table-td-div">
            {{detail.shenQingSj}}
          </div>
          <div class="table-td-div">
            申报
          </div>
          <div class="table-td-div">
            {{detail.shenQingCzr}}
          </div>
          <div class="table-td-div">

          </div>
        </div>

        <div class="table-row-div">
          <div class="table-td-div">
            {{detail.flowInfo && detail.flowInfo[0] && detail.flowInfo[0]['operatordate']}}
          </div>
          <div class="table-td-div">
            受理
          </div>
          <div class="table-td-div">
            {{detail.flowInfo && detail.flowInfo[0] && detail.flowInfo[0]['operatorname']}}
          </div>
          <div class="table-td-div">
            {{detail.flowInfo && detail.flowInfo[0] && detail.flowInfo[0]['opinion']}}
          </div>
        </div>

        <div class="table-row-div">
          <div class="table-td-div">
          </div>
          <div class="table-td-div">
            会签
          </div>
          <div class="table-td-div">
            {{detail.flowInfo && detail.flowInfo[4] && detail.flowInfo[4]['operatorname']}}
          </div>
          <div class="table-td-div">

          </div>
        </div>

        <div class="table-row-div">
          <div class="table-td-div">
            {{detail.flowInfo && detail.flowInfo[1] && detail.flowInfo[1]['operatordate']}}
          </div>
          <div class="table-td-div">
            县科室初审
          </div>
          <div class="table-td-div">
            {{detail.flowInfo && detail.flowInfo[1] && detail.flowInfo[1]['operatorname']}}
          </div>
          <div class="table-td-div">
            {{detail.flowInfo && detail.flowInfo[1] && detail.flowInfo[1]['opinion']}}
          </div>
        </div>

        <div class="table-row-div">
          <div class="table-td-div">
            {{detail.flowInfo && detail.flowInfo[2] && detail.flowInfo[2]['operatordate']}}
          </div>
          <div class="table-td-div">
            县局领导决定
          </div>
          <div class="table-td-div">
            {{detail.flowInfo && detail.flowInfo[2] && detail.flowInfo[2]['operatorname']}}
          </div>
          <div class="table-td-div">
            {{detail.flowInfo && detail.flowInfo[2] && detail.flowInfo[2]['opinion']}}
          </div>
        </div>

        <div class="table-row-div">
          <div class="table-td-div">
            {{detail.qianFaSj}}
          </div>
          <div class="table-td-div">
            发放
          </div>
          <div class="table-td-div">
            {{detail.qianFaRen}}
          </div>
          <div class="table-td-div">
          </div>
        </div>

      </div>
    </div>
    <!-- 珍贵树木 -->
    <div v-if="this.detail.timberType === '2'">
      <div class="title">林木采伐许可证</div>
      <div class="group-title">采伐许可证信息</div>
      <div class="content">
        <div class="content-item">
          林木采伐,
          <span class="blue">{{isXianeMc}} {{qiTaCfdmMc}}</span>
        </div>
      </div>
      <div class="content">
        <div class="content-item">
          申报号:
          <span class="blue">{{detail.projid}}</span>
        </div>
        <div class="content-item">
          采伐证类型:
          <span class="blue">{{timberTypeMc}}</span>
        </div>
        <div class="content-item">
          采伐单位或个人:
          <span class="blue">{{detail.shenQinRen}}</span>
        </div>
        <div class="content-item">
          编限单位:
          <span class="blue">{{detail.bianXianDwmc}}</span>
        </div>
        <div class="content-item">
          归口单位:
          <span class="blue">{{detail.guiKouDwmc}}</span>
        </div>
      </div>
      <div class="group-title">联系方式</div>
      <div class="content">
        <div class="content-item">
          统一社会信用代码或身份证号:
          <span class="blue">{{detail.applyCardnumber}}</span>
        </div>
        <div class="content-item">
          手机号:
          <span class="blue">{{detail.telphone}}</span>
        </div>
        <div class="content-item">
          地址:
          <span class="blue">{{detail.address}}</span>
        </div>
      </div>
      <div class="group-title">申请依据:</div>
      <div class="content">
        <div class="content-item">
          采伐申请依据:
          <span class="blue">{{detail.zuoYeHao}}</span>
        </div>
      </div>
      <div class="group-title">采伐地点</div>
      <div class="content">
        <div class="content-item">
          林场或乡镇:
          <span class="blue">{{detail.linChang}}</span>
        </div>
        <div class="content-item">
          林班或村:
          <span class="blue">{{detail.linBan}}</span>
        </div>
        <div class="content-item">
          工区或组:
          <span class="blue">{{detail.gongZuoQu}}</span>
        </div>
        <div class="content-item">
          小 地 名:
          <span class="blue">{{detail.xiaoDiMing}}</span>
        </div>
      </div>
      <div class="group-title">基本信息</div>
      <div class="content base-info">
        <div
          class="content-item"
          style="width:20%;margin-bottom:10px"
        >
          林木权属:
          <span class="blue">{{detail.linQuanMc}}</span>
        </div>
        <div
          class="content-item"
          style="width:20%;margin-bottom:10px"
        >
          林木起源:
          <span class="blue">{{detail.qiYuanMc}}</span>
        </div>
        <div
          class="content-item"
          style="width:20%;margin-bottom:10px"
        >
          森林类别:
          <span class="blue">{{detail.senLinLbmc}} {{detail.linZhongMc}}</span>
        </div>
        <div
          class="content-item"
          style="width:20%;margin-bottom:10px"
        >
          采伐类型:
          <span class="blue">{{detail.caiFaLxmc}}</span>
        </div>
        <div
          class="content-item"
          style="width:20%;margin-bottom:10px"
        >
          采伐蓄积:
          <span class="blue">{{detail.caiFaXj}}</span>
        </div>
        <div
          class="content-item"
          style="width:20%;margin-bottom:10px"
        >
          采伐出材:
          <span class="blue">{{detail.caiFaCc}}</span>
        </div>
        <div
          class="content-item"
          style="width:20%;margin-bottom:10px"
        >
          采伐株数:
          <span class="blue">{{detail.caiFaZs}}</span>
        </div>
      </div>
      <div class="group-title">树种信息</div>
      <div class="content">
        <el-table
          :data="detail.shuZhong"
          style="width: 100%"
        >
          <el-table-column
            prop="shuZhongMc"
            label="树种"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="shengZhangZk"
            label="生长状况"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="shu"
            label="属于"
          ></el-table-column>
          <el-table-column
            prop="shuLing"
            label="树龄"
          ></el-table-column>
          <el-table-column
            prop="shuGao"
            label="树高"
          ></el-table-column>
          <el-table-column
            prop="xiongJing"
            label="胸径"
          ></el-table-column>
          <el-table-column
            prop="guaPaiH"
            label="挂牌号"
          ></el-table-column>
          <el-table-column
            prop="caiFaXjSpc"
            label="商品材蓄积(m³)"
          ></el-table-column>
          <el-table-column
            prop="caiFaXjFspc"
            label="非商品材蓄积(m³)"
          ></el-table-column>
          <el-table-column
            prop="caiFaZs"
            label="株数"
          ></el-table-column>
          <el-table-column
            prop="chuCaiSpc"
            label="商品材出材量(m³)"
          ></el-table-column>
          <el-table-column
            prop="chuCaiFspc"
            label="非商品材出材量(m³)"
          ></el-table-column>
        </el-table>
      </div>
      <div class="group-title">其他信息</div>
      <div class="content base-info">
        <div
          class="content-item"
          style="width:100%"
        >
          申请原因:
          <span class="blue">{{detail.applyReason}}</span>
        </div>
        <div
          class="content-item"
          style="width:100%;margin-bottom:20px"
        >
          采伐期限: 从
          <span class="blue">{{detail.caiFaQxq}}</span>至
          <span
            class="blue"
            style="margin:0 10px"
          >{{detail.caiFaQxz}}</span>
        </div>
        <div
          class="content-item"
          style="width:100%"
        >
          <!-- 备注: <span class="blue">{{getShuZhongInfo(detail.shuZhong)}}{{detail.beiZhu}}</span> -->
          备注:
          <span class="blue">{{detail.beiZhu}}</span>
        </div>
      </div>
      <div class="group-title">附件</div>
      <div class="content base-info">
        <el-table
          :data="detail.fuJianInfo"
          style="width: 100%"
        >
          <el-table-column
            prop="1"
            label="序号"
            width="180"
          >
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="2"
            label="材料类型"
            width="180"
          >
            <template slot-scope="scope">
              <span>{{scope.row.attrname}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="3"
            label="收取方式"
          >
            <template slot-scope="scope">
              <span>{{scope.row.taketype}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="4"
            label="附件名称"
          >
            <template slot-scope="scope">
              <div
                @click="downloadFile(scope.row.fileurl,scope.row.filename)"
                class="blue"
                style="cursor: pointer;"
              >{{scope.row.filename}}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="group-title">环节信息</div>
      <div
        class="sl-content base-info"
        style="padding-top:20px"
      >

        <div class="table-row-div">
          <div class="table-td-div">
            时间
          </div>
          <div class="table-td-div">
            环节
          </div>
          <div class="table-td-div">
            姓名
          </div>
          <div class="table-td-div">
            意见
          </div>
        </div>

        <div class="table-row-div">
          <div class="table-td-div">
            {{detail.shenQingSj}}
          </div>
          <div class="table-td-div">
            申报
          </div>
          <div class="table-td-div">
            {{detail.shenQingCzr}}
          </div>
          <div class="table-td-div">
          </div>
        </div>

        <div class="table-row-div">
          <div class="table-td-div">
            {{detail.flowInfo && detail.flowInfo[0] && detail.flowInfo[0]['operatordate']}}
          </div>
          <div class="table-td-div">
            受理
          </div>
          <div class="table-td-div">
            {{detail.flowInfo && detail.flowInfo[0] && detail.flowInfo[0]['operatorname']}}
          </div>
          <div class="table-td-div">
            {{detail.flowInfo && detail.flowInfo[0] && detail.flowInfo[0]['opinion']}}
          </div>
        </div>

        <div class="table-row-div">
          <div class="table-td-div">

          </div>
          <div class="table-td-div">
            会签
          </div>
          <div class="table-td-div">
            {{detail.flowInfo && detail.flowInfo[4] && detail.flowInfo[4]['operatorname']}}
          </div>
          <div class="table-td-div">

          </div>
        </div>

        <div class="table-row-div">
          <div class="table-td-div">
            {{detail.flowInfo && detail.flowInfo[1] && detail.flowInfo[1]['operatordate']}}
          </div>
          <div class="table-td-div">
            县科室初审
          </div>
          <div class="table-td-div">
            {{detail.flowInfo && detail.flowInfo[1] && detail.flowInfo[1]['operatorname']}}
          </div>
          <div class="table-td-div">
            {{detail.flowInfo && detail.flowInfo[1] && detail.flowInfo[1]['opinion']}}
          </div>
        </div>

        <div class="table-row-div">
          <div class="table-td-div">
            {{detail.flowInfo && detail.flowInfo[2] && detail.flowInfo[2]['operatordate']}}
          </div>
          <div class="table-td-div">
            县局领导决定
          </div>
          <div class="table-td-div">
            {{detail.flowInfo && detail.flowInfo[2] && detail.flowInfo[2]['operatorname']}}
          </div>
          <div class="table-td-div">
            {{detail.flowInfo && detail.flowInfo[2] && detail.flowInfo[2]['opinion']}}
          </div>
        </div>

        <div class="table-row-div">
          <div class="table-td-div">

          </div>
          <div class="table-td-div">
            县转报附件
          </div>
          <div class="table-td-div">
            <span
              class="blue"
              @click="downloadFile(detail.flowInfo[4]['accessoryurl'],detail.flowInfo[4]['accessoryurl'])"
            >
              {{zhuanBaoFuJianName}}
            </span>
          </div>
          <div class="table-td-div">

          </div>
        </div>

        <div class="table-row-div">
          <div class="table-td-div">
            {{detail.qianFaSj}}
          </div>
          <div class="table-td-div">
            发放
          </div>
          <div class="table-td-div">
            {{detail.qianFaRen}}
          </div>
          <div class="table-td-div">

          </div>
        </div>

      </div>
    </div>

    <!-- 沿海树木 -->
    <div v-if="this.detail.timberType === '3'">
      <div class="title">林木采伐许可证</div>
      <div class="group-title">采伐许可证信息</div>
      <div class="content">
        <div class="content-item">
          林木采伐,
          <span class="blue">{{isXianeMc}} {{qiTaCfdmMc}}</span>
        </div>
      </div>
      <div class="content">
        <div class="content-item">
          申请编号:
          <span class="blue">{{detail.projid}}</span>
        </div>
        <div class="content-item">
          采伐证类型:
          <span class="blue">{{timberTypeMc}}</span>
        </div>
        <div class="content-item">
          采伐单位或个人:
          <span class="blue">{{detail.shenQinRen}}</span>
        </div>
        <div class="content-item">
          编限单位:
          <span class="blue">{{detail.bianXianDwmc}}</span>
        </div>
        <div class="content-item">
          归口单位:
          <span class="blue">{{detail.guiKouDwmc}}</span>
        </div>
      </div>
      <div class="group-title">联系方式</div>
      <div class="content">
        <div class="content-item">
          统一社会信用代码或身份证号:
          <span class="blue">{{detail.applyCardnumber}}</span>
        </div>
        <div class="content-item">
          手机号:
          <span class="blue">{{detail.telphone}}</span>
        </div>
        <div class="content-item">
          地址:
          <span class="blue">{{detail.address}}</span>
        </div>
      </div>
      <div class="group-title">申请依据:</div>
      <div class="content">
        <div class="content-item">
          采伐申请依据:
          <span class="blue">{{detail.zuoYeHao}}</span>
        </div>
      </div>
      <div class="group-title">采伐地点</div>
      <div class="content">
        <div class="content-item">
          林场或乡镇:
          <span class="blue">{{detail.linChang}}</span>
        </div>
        <div class="content-item">
          林班或村:
          <span class="blue">{{detail.linBan}}</span>
        </div>
        <div class="content-item">
          工区或组:
          <span class="blue">{{detail.gongZuoQu}}</span>
        </div>
        <div class="content-item">
          小 地 名:
          <span class="blue">{{detail.xiaoDiMing}}</span>
        </div>
      </div>
      <div class="group-title">基本信息</div>
      <div class="content base-info">
        <div class="content-item">
          GPS坐标: 东（X,Y）:（
          <span class="blue">{{detail.gpsDbx}}</span>,
          <span class="blue">{{detail.gpsDby}}</span>）；
          <span style="margin-right:50px" />
          南（X,Y）:（
          <span class="blue">{{detail.gpsDnx}}</span>,
          <span class="blue">{{detail.gpsDny}}</span>）
          <span style="margin-right:50px" />
          西（X,Y）:（
          <span class="blue">{{detail.gpsXnx}}</span>,
          <span class="blue">{{detail.gpsXny}}</span>）；
          <span style="margin-right:50px" />
          北（X,Y）:（
          <span class="blue">{{detail.gpsXbx}}</span>,
          <span class="blue">{{detail.gpsXby}}</span>）
        </div>
      </div>
      <div class="group-title">基本信息</div>
      <div class="content base-info">
        <div
          class="content-item"
          style="width:20%;margin-bottom:10px"
        >
          林木权属:
          <span class="blue">{{detail.linQuanMc}}</span>
        </div>
        <div
          class="content-item"
          style="width:20%;margin-bottom:10px"
        >
          林木起源:
          <span class="blue">{{detail.qiYuanMc}}</span>
        </div>
        <div
          class="content-item"
          style="width:20%;margin-bottom:10px"
        >
          林种:
          <span class="blue">{{detail.senLinLbmc}} {{detail.linZhongMc}}</span>
        </div>
        <div
          class="content-item"
          style="width:20%;margin-bottom:10px"
        >
          优势树种:
          <span class="blue">{{detail.shuZhongMc}}</span>
        </div>
        <div
          class="content-item"
          style="width:20%;margin-bottom:10px"
        >
          小班蓄积:
          <span class="blue">{{detail.xiaoBanXj}}</span>
        </div>
        <div
          class="content-item"
          style="width:20%;margin-bottom:10px"
        >
          林龄:
          <span class="blue">{{detail.linFenNl}}</span>
        </div>
        <div
          class="content-item"
          style="width:20%;margin-bottom:10px"
        >
          类别:
          <span class="blue">{{detail.leiBie}}</span>
        </div>
        <div
          class="content-item"
          style="width:20%;margin-bottom:10px"
        >
          生长状况:
          <span class="blue">{{ddlShengzhangZkMc}}</span>
        </div>
        <div
          class="content-item"
          style="width:20%;margin-bottom:10px"
        >
          采伐类型:
          <span class="blue">{{detail.caiFaLxmc}}</span>
        </div>
        <div
          class="content-item"
          style="width:20%;margin-bottom:10px"
        >
          采伐类型:
          <span class="blue">{{detail.caiFaLxmc}}</span>
        </div>
        <div
          class="content-item"
          style="width:20%;margin-bottom:10px"
        >
          采伐方式:
          <span class="blue">{{detail.caiFaFsmc}}</span>
        </div>
        <div
          class="content-item"
          style="width:20%;margin-bottom:10px"
        >
          采伐面积:
          <span class="blue">{{detail.caiFaMj}}</span>
        </div>
        <div
          class="content-item"
          style="width:20%;margin-bottom:10px"
        >
          采伐蓄积:
          <span class="blue">{{detail.caiFaxj}}</span>
        </div>
        <div
          class="content-item"
          style="width:20%;margin-bottom:10px"
        >
          采伐出材:
          <span class="blue">{{detail.caiFaCc}}</span>
        </div>
        <div
          class="content-item"
          style="width:20%;margin-bottom:10px"
        >
          采伐株数:
          <span class="blue">{{detail.caiFaZs}}</span>
        </div>
      </div>
      <div class="group-title">树种信息</div>
      <div class="content">
        <el-table
          :data="detail.shuZhong"
          style="width: 100%"
        >
          0
          <el-table-column
            prop="shuZhongMc"
            label="树种"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="caiFaXjSpc"
            label="商品材蓄积"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="caiFaXjFspc"
            label="非商品材蓄积"
          ></el-table-column>
          <el-table-column
            prop="caiFaZs"
            label="株数"
          ></el-table-column>
          <el-table-column
            prop="chuCaiSpc"
            label="商品材出材"
          ></el-table-column>
          <el-table-column
            prop="chuCaiFspc"
            label="非商品材出材"
          ></el-table-column>
        </el-table>
      </div>
      <div class="group-title">更新信息</div>
      <div class="content base-info">
        <div
          class="content-item"
          style="width:20%"
        >
          更新树种:
          <span class="blue">{{detail.gengXingSz}}</span>
        </div>
        <div
          class="content-item"
          style="width:20%"
        >
          更新方式:
          <span class="blue">{{detail.gengXingFsmc}}</span>
        </div>
        <div
          class="content-item"
          style="width:20%"
        >
          更新期限:
          <span class="blue">{{detail.gengXingQx}}</span>
        </div>
        <div
          class="content-item"
          style="width:20%"
        >
          更新面积:
          <span class="blue">{{detail.gengXingMjdw}}</span>
        </div>
      </div>
      <div class="group-title">其他信息</div>
      <div class="content base-info">
        <div
          class="content-item"
          style="width:100%"
        >
          申请原因:
          <span class="blue">{{detail.applyReason}}</span>
        </div>
        <div
          class="content-item"
          style="width:100%;margin-bottom:20px"
        >
          采伐期限: 从
          <span class="blue">{{detail.caiFaQxq}}</span>至
          <span
            class="blue"
            style="margin:0 10px"
          >{{detail.caiFaQxz}}</span>
        </div>
        <div
          class="content-item"
          style="width:100%"
        >
          <!-- 备注: <span class="blue">{{getShuZhongInfo(detail.shuZhong)}}{{detail.beiZhu}}</span> -->
          备注:
          <span class="blue">{{detail.beiZhu}}</span>
        </div>
      </div>
      <div class="group-title">附件</div>
      <div class="content base-info">
        <el-table
          :data="detail.fuJianInfo"
          style="width: 100%"
        >
          <el-table-column
            prop="1"
            label="序号"
            width="180"
          >
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="2"
            label="材料类型"
            width="180"
          >
            <template slot-scope="scope">
              <span>{{scope.row.attrname}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="3"
            label="收取方式"
          >
            <template slot-scope="scope">
              <span>{{scope.row.taketype}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="4"
            label="附件名称"
          >
            <template slot-scope="scope">
              <div
                @click="downloadFile(scope.row.fileurl,scope.row.filename)"
                class="blue"
                style="cursor: pointer;"
              >{{scope.row.filename}}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="group-title">环节信息</div>
      <div
        class="sl-content base-info"
        style="padding-top:20px"
      >

        <div class="table-row-div">
          <div class="table-td-div">
            时间
          </div>
          <div class="table-td-div">
            环节
          </div>
          <div class="table-td-div">
            姓名
          </div>
          <div class="table-td-div">
            意见
          </div>
        </div>

        <div class="table-row-div">
          <div class="table-td-div">
            {{detail.shenQingSj}}
          </div>
          <div class="table-td-div">
            申报
          </div>
          <div class="table-td-div">
            {{detail.shenQingCzr}}
          </div>
          <div class="table-td-div">

          </div>
        </div>

        <div class="table-row-div">
          <div class="table-td-div">
            {{detail.flowInfo && detail.flowInfo[0] && detail.flowInfo[0]['operatordate']}}
          </div>
          <div class="table-td-div">
            受理
          </div>
          <div class="table-td-div">
            {{detail.flowInfo && detail.flowInfo[0] && detail.flowInfo[0]['operatorname']}}
          </div>
          <div class="table-td-div">
            {{detail.flowInfo && detail.flowInfo[0] && detail.flowInfo[0]['opinion']}}
          </div>
        </div>

        <div class="table-row-div">
          <div class="table-td-div">
            {{detail.flowInfo && detail.flowInfo[1] && detail.flowInfo[1]['operatordate']}}
          </div>
          <div class="table-td-div">
            县科室初审
          </div>
          <div class="table-td-div">
            {{detail.flowInfo && detail.flowInfo[1] && detail.flowInfo[1]['operatorname']}}
          </div>
          <div class="table-td-div">
            {{detail.flowInfo && detail.flowInfo[1] && detail.flowInfo[1]['opinion']}}
          </div>
        </div>

        <div class="table-row-div">
          <div class="table-td-div">

          </div>
          <div class="table-td-div">
            县会签
          </div>
          <div class="table-td-div">
            {{detail.flowInfo && detail.flowInfo[4] && detail.flowInfo[4]['operatorname']}}
          </div>
          <div class="table-td-div">

          </div>
        </div>

        <div class="table-row-div">
          <div class="table-td-div">
            {{detail.flowInfo && detail.flowInfo[2] && detail.flowInfo[2]['operatordate']}}
          </div>
          <div class="table-td-div">
            县局领导决定
          </div>
          <div class="table-td-div">
            {{detail.flowInfo && detail.flowInfo[2] && detail.flowInfo[2]['operatorname']}}
          </div>
          <div class="table-td-div">
            {{detail.flowInfo && detail.flowInfo[2] && detail.flowInfo[2]['opinion']}}
          </div>
        </div>

        <div class="table-row-div">
          <div class="table-td-div">
            {{detail.qianFaSj}}
          </div>
          <div class="table-td-div">
            发放
          </div>
          <div class="table-td-div">
            {{detail.qianFaRen}}
          </div>
          <div class="table-td-div">

          </div>
        </div>
      </div>
    </div>
    <!-- 结束 -->
    <div v-if="Boolean(this.$route.query.isShouLi)===true &&Boolean(this.$route.query.isZhongZhi)!==true">
      <div
        class="group-title"
        style="margin-top:20px"
      >执行操作</div>
      <div style="padding:20px">
        <detail-cao-zuo></detail-cao-zuo>
      </div>
    </div>

    <div
      v-if="Boolean(this.$route.query.isZhongZhi)===true"
      style="margin-top:20px"
    >
      <div
        class="group-title"
        style="margin:20px 0"
      >执行操作</div>
      <xcy-form
        ref="zhongZhiForm"
        :config="zhongZhiConfig"
        :data="zhongZhiData"
        @input="zhongZhiUpdate"
      />
      <el-table
        :data="zhongZhiTableData"
        :span-method="objectSpanMethod"
        style="width: 100%"
      >
        <el-table-column label="树种">
          <template slot-scope="scope">
            <div
              v-if="scope.$index%2===0"
              style="color:red"
            >{{scope.row.shuZhongMc}}</div>
            <div v-if="scope.$index%2!==0">{{scope.row.shuZhongMc}}</div>
          </template>
        </el-table-column>
        <el-table-column label="分类">
          <template slot-scope="scope">
            <div
              v-if="scope.$index%2===0"
              style="color:red"
            >申请</div>
            <div v-if="scope.$index%2!==0">实际</div>
          </template>
        </el-table-column>
        <el-table-column label="蓄积(立方米)">
          <el-table-column label="商品材">
            <template slot-scope="scope">
              <div
                v-if="scope.$index%2===0"
                style="color:red"
              >{{scope.row.caiFaXjSpc}}</div>
              <div v-if="scope.$index%2!==0">
                <el-input v-model="scope.row.caiFaXjSpc" />
              </div>
            </template>
          </el-table-column>

          <el-table-column
            prop="caiFaXjFspc"
            label="非商品材"
          >
            <template slot-scope="scope">
              <div
                v-if="scope.$index%2===0"
                style="color:red"
              >{{scope.row.caiFaXjFspc}}</div>
              <div v-if="scope.$index%2!==0">
                <el-input v-model="scope.row.caiFaXjFspc" />
              </div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="株数">
          <template slot-scope="scope">
            <div
              v-if="scope.$index%2===0"
              style="color:red"
            >{{scope.row.caiFaZs}}</div>
            <div v-if="scope.$index%2!==0">
              <el-input v-model="scope.row.caiFaZs" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="出材(立方米)">
          <el-table-column label="商品材">
            <template slot-scope="scope">
              <div
                v-if="scope.$index%2===0"
                style="color:red"
              >{{scope.row.chuCaiSpc}}</div>
              <div v-if="scope.$index%2!==0">
                <el-input v-model="scope.row.chuCaiSpc" />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="非商品材">
            <template slot-scope="scope">
              <div
                v-if="scope.$index%2===0"
                style="color:red"
              >{{scope.row.chuCaiFspc}}</div>
              <div v-if="scope.$index%2!==0">
                <el-input v-model="scope.row.chuCaiFspc" />
              </div>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
      <div
        class="group-title"
        style="margin-top:20px"
      >说明</div>
      <div style="padding:10px 0 0 5px; color:red;font-size: 12px;">如果此证有采伐，请在实际填写栏里填写实际采伐量，终止成功之后用剩余采伐量返回到限额表里</div>
      <div style="margin:20px;text-align:center">
        <el-button
          size="mini"
          type="primary"
          @click="zhongZhiClick"
        >终止</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="goBack"
        >返回</el-button>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.issuance-detail {
  height: 100%;
  box-sizing: border-box;
  padding: 20px 20px 100px 20px;
  // border 1px solid #e6e6e6
}

.table-row-div {
  width: 100%;
  font-size:12px;
  border: 1px solid #ebeef5;
}

.table-td-div {
  display: inline-block;
  text-align: center;
  width: 25%;
  box-sizing: border-box;
  border-right: 1px solid #ebeef5;
}

.title {
  font-size: 20px;
  padding-bottom: 20px;
}

.content {
  padding: 20px;
  overflow: hidden;
}

.footer {
  padding: 35px 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  .footer-item {
    margin: 0 10px;
  }
}

.content-item {
  font-size: 14px;
  padding-right: 35px;
  float: left;
}

.base-info {
  flex-direction: row;
  flex-wrap: wrap;

  .content-item {
    padding-bottom: 10px;
  }
}

.blue {
  color: blue;
}

.sl-content {
  padding-bottom: 10px;
  padding-left: 20px;
  display: flex;
}
</style>
