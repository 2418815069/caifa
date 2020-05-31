<template>
  <div class="print-wrap is-print">
    <header class="print-wrap__title">
      <h1 class="print-wrap__title-h1 print-h1 col-red">林木采伐许可证</h1>
      <div class="print-text print-text--right" style="margin:8px 0;">
        编号：
        <span class="width-120">{{detail.yuLiu1}}</span>
      </div>
    </header>
    <main class="print-wrap__main">
      <section class="print-text print-text--right">
        <span class="active-text width-60">{{detail.caiZi}}</span>
        采字[{{new Date().getFullYear()}}]
        <span
          class="active-text width-60"
        >{{detail.daYinXh}}</span>
        号
      </section>
      <section class="print-text">
        <span class="active-text width-100">{{detail.shenQinRen}}</span>
      </section>
      <section class="print-text">
        根据
        <span class="active-text width-70">{{detail.zuoYeHao}}</span>
        提报的伐区调查设计(申请),经审核,批准在
        <span class="active-text width-70">{{detail.linChang}}</span>
        林场(乡镇)
        <span class="active-text width-70">{{detail.linBan}}</span>
        林班(村)
        <span class="active-text width-70">{{detail.gongZuoQu}}</span>
        作业区(组)
        <span class="active-text width-70">{{detail.xiaoBan}}</span>
        小班(地块)采伐。
      </section>
      <section class="print-text">
        <span class="print-text--lable">采伐四至:</span>
        东
        <span class="active-text width-80">{{detail.sbjDong}}</span>
        南
        <span class="active-text width-80">{{detail.sbjNan}}</span>
        西
        <span class="active-text width-80">{{detail.sbjXi}}</span>
        北
        <span class="active-text width-80">{{detail.sbjBei}}</span>
      </section>
      <section class="print-text">
        <span class="print-text--lable">GPS 定位:</span>
        <span class="active-text width-464">
          {{detail.gpsDbx}},{{detail.gpsDby}};
          {{detail.gpsDnx}},{{detail.gpsDny}};
          {{detail.gpsXnx}},{{detail.gpsXny}};
          {{detail.gpsXbx}},{{detail.gpsXby}};
        </span>
      </section>
      <section class="print-text">
        <span class="print-text--lable">林分起源:</span>
        <span class="active-text width-110">{{detail.qiYuanMc}}</span>
        林种：
        <span class="active-text width-110">{{detail.linZhongMc}}</span>
        树种：
        <span class="active-text width-110">{{detail.shuZhongMc}}</span>
      </section>
      <section class="print-text">
        <span class="print-text--lable">权 属:</span>
        <span class="active-text width-100">{{detail.linQuanMc}}</span>
        林权证号(证明)：
        <span class="active-text width-100">{{detail.linQuanZh}}</span>
      </section>
      <section class="print-text">
        <span class="print-text--lable">采伐类型:</span>
        <span class="active-text width-100">{{detail.caiFaLxmc}}</span>
        采伐方式:
        <span class="active-text width-100">{{detail.caiFaFsmc}}</span>
        采伐强度:
        <span class="active-text width-100">{{detail.xuJiQd}}</span>
      </section>
      <section class="print-text">
        <span class="print-text--lable">采伐面积:</span>
        <span class="active-text width-100">{{detail.caiFaMj}}</span>
        公顷（株数：
        <span class="active-text width-100">{{detail.caiFaZs}}</span>
        株）
      </section>
      <section class="print-text">
        <span class="print-text--lable">采伐蓄积:</span>
        <span class="active-text width-100">{{detail.caiFaXj}}</span>
        立方米（出材量:
        <span class="active-text width-100">{{detail.caiFaCc}}</span>
        立方米）
      </section>
      <section class="print-text">
        <span class="print-text--lable">采伐期限:</span>
        <span class="active-text width-50">{{handleDate(detail.caiFaQxq)[0]}}</span>
        年
        <span class="active-text width-40">{{handleDate(detail.caiFaQxq)[1]}}</span>
        月
        <span class="active-text width-40">{{handleDate(detail.caiFaQxq)[2]}}</span>
        日至
        <span class="active-text width-50">{{handleDate(detail.caiFaQxz)[0]}}</span>
        年
        <span class="active-text width-40">{{handleDate(detail.caiFaQxz)[1]}}</span>
        月
        <span class="active-text width-40">{{handleDate(detail.caiFaQxz)[2]}}</span>
        日
      </section>
      <section class="print-text">
        <span class="print-text--lable">更新期限:</span>
        <span class="active-text width-50">{{handleDate(detail.gengXingQx)[0]}}</span>
        年
        <span class="active-text width-40">{{handleDate(detail.gengXingQx)[1]}}</span>
        月
        <span class="active-text width-40">{{handleDate(detail.gengXingQx)[2]}}</span>
        日
      </section>
      <section class="print-text">
        <span class="print-text--lable">更新面积:</span>
        <span class="active-text width-80">{{detail.gengXingMjdw}}</span>
        公顷（株数：
        <span class="active-text width-80">{{detail.gengXingZs}}</span>
        株）
        更新树种：
        <span class="active-text width-80">{{detail.gengXingSz}}</span>
      </section>
      <section class="print-text">
        <span class="print-text__radio">
          <i :class="{'selected':isXiane}">
            <span />
          </i> 占限额
        </span>
        <span class="print-text__radio">
          <i :class="{'selected':!isXiane}">
            <span />
          </i> 不占限额
        </span>
      </section>
      <section class="print-text">
        <span class="print-text--lable" style="display: block;">备注:</span>
        <span class="active-text active-desc" style="padding-left:40px" v-html="detail.erWeiMaBeiZhu"></span>
      </section>
    </main>
    <footer class="print-wrap__footer">
      <div class="footer__ewm">
        <!-- <img :src='detail.erWeiMa'/> -->
        <div id="qrcode"></div>
      </div>
      <div class="footer__zhang print-text">发证机关（章）</div>
      <div class="footer__qz">
        <div class="print-text lh-50">发证人（章）：</div>
        <div class="print-text lh-50">领证人:{{detail.lingZhengRen}}</div>
        <div class="print-text lh-50">发证日期：{{detail.qianFaSj}}</div>
      </div>
    </footer>
    <div class="print-text lh-20">注：1.超过规定采伐期限，此证无效。</div>
    <div class="print-text lh-20" style="text-indent:28px">2.非国有林木采伐不填写GPS定位。</div>
  </div>
</template>
<script type="text/ecmascript-6">
/**
 * 采伐证模版
 * 打印功能需在页面内调用window.print()
 * calss：is-print 待打印区域
 * calss：not-print 不打印区域
 * detail：父组件传入采伐证数据
 */
import QRCode from 'qrcodejs2';
export default {
    name: 'printTemp',
    props: {
        detail: {
            type: [Array, Object],
            default() {
                return {};
            }
        }
    },
    filters: {
        noResult(val) {
            if (val === 0 || val) {
                return val;
            }
            return '/';
        }
    },
    computed: {
        isXiane() {
            let result = ['1', '2', '4'].includes(this.detail.isXiane);
            return result;
        }
    },
    data() {
        return {};
    },
    created() {},
    mounted() {
        this.$nextTick(() => {
            this.qrcode();
        });
    },
    methods: {
        qrcode() {
            setTimeout(() => {
                new QRCode('qrcode', {
                    width: 100,
                    height: 100,
                    text: this.detail.erWeiMaStr
                });
            }, 3000);
        },
        handleDate(date) {
            if (date) {
                let arr = date.split('-');
                return arr;
            }
            return ['/', '/', '/'];
        }
    }
};
</script>
<style>
/* 大标题 */
.print-h1 {
  font-family: 微软雅黑;
  font-size: 36px;
  font-weight: bold;
}
/* 小标题 */
.print-h2 {
  font-family: 微软雅黑;
  font-size: 16px;
  font-weight: bold;
}
/* 正文 */
.print-text {
  /* text-indent:25px; */
  line-height: 35px;
  height: auto;
  font-family: 宋体;
  font-size: 14px;
}
.active-text {
  display: inline-block;
  text-align: center;
  border-bottom: 1px solid #333;
  line-height: 1;
  color: rgb(0, 0, 255);
}
.active-desc {
  /* text-decoration:underline; */
  border-bottom: none;
  line-height: 1.2;
  text-align: left;
  text-indent: 20px;
}
.width-10 {
  min-width: 10px;
}
.width-25 {
  width: 25px;
}
.width-40 {
  width: 40px;
}
.width-50 {
  width: 50px;
}
.width-60 {
  width: 60px;
}
.width-70 {
  width: 70px;
}

.width-80 {
  width: 80px;
}
.width-90 {
  width: 90px;
}
.width-100 {
  width: 100px;
}
.width-110 {
  width: 110px;
}
.width-120 {
  width: 120px;
}
.width-200 {
  width: 200px;
}
.width-464 {
  width: 464px;
}
.lh-20 {
  line-height: 20px;
}
.lh-50 {
  line-height: 50px;
}
.col-red {
  color: #ff0000;
  border-bottom: 2px double #ff0000;
}
.print-wrap {
  width: 578px;
  margin: 0 auto;
}
.print-wrap__title {
  text-align: center;
}
.print-wrap__title-h1 {
  cursor: pointer;
  display: inline-block;
  line-height: 1;
}
.print-text--right {
  text-align: right;
}

.print-text--center {
  text-align: center;
}
.print-text--lable {
  display: inline-block;
  width: 70px;
  vertical-align: top;
}
.print-text__radio {
  margin-right: 10px;
}
.print-text__radio i {
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 1px solid #333;
  vertical-align: middle;
  margin-bottom: 2px;
}
.print-text__radio i.selected {
  position: relative;
}
.print-text__radio i.selected span {
  display: inline-block;
  width: 4px;
  height: 12px;
  border-color: rgb(0, 0, 255);
  border-style: solid;
  border-width: 0 2px 2px 0;
  transform: rotate(38deg);
  position: absolute;
  top: -3px;
  left: 3px;
}
.print-wrap__main {
  border: 1px solid #333;
  padding: 15px;
}
.print-wrap__footer {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #333;
  border-top-width: 0;
  height: 160px;
  padding: 15px;
}
.footer__ewm {
  flex: 1;
}
.footer__ewm img {
  display: block;
  height: 120px;
  width: 120px;
}
.footer__qz {
  width: 40%;
}
.footer__zhang {
  flex: 1;
}
@media print {
  .is-print {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .print-wrap__title-h1 {
    border-bottom: 4px double #000000;
  }
  .print-text {
    font-weight: 900;
  }
  .active-text {
    color: #000000;
  }
  .col-red {
    color: #000000;
  }
}
</style>
