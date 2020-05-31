<template>
  <div class="main">
    <div class="row">
      <div class="left">
        档案编号
      </div>
      <div class="right">
        {{data.no}}
      </div>
    </div>

    <div class="row">
      <div class="left">
        县市名称
      </div>
      <div class="right">
        {{data.xiangname}}
      </div>
      <div class="left">
        乡镇名称
      </div>
      <div class="right">
        {{data.xiangname}}
      </div>
    </div>

    <div class="row">
      <div class="left">
        村名称
      </div>
      <div class="right">
        {{data.cunname}}
      </div>
      <div class="left">
        组名称
      </div>
      <div class="right">
        {{data.groupName}}
      </div>
    </div>

    <div class="row">
      <div class="left">
        设计单位编号
      </div>
      <div class="right">
        {{data.unitId}}
      </div>
      <div class="left">
        设计单位名称
      </div>
      <div class="right">
        {{data.unitName}}
      </div>
    </div>

    <div class="row">
      <div class="left">
        林权证编号
      </div>
      <div class="right">
        {{data.lqCard}}
      </div>
      <div class="left">
        林权字
      </div>
      <div class="right">
        {{data.lqWord}}
      </div>
    </div>

    <div class="row">
      <div class="left">
        林权字号
      </div>
      <div class="right">
        {{data.lqCode}}
      </div>
      <div class="left">
        林权年
      </div>
      <div class="right">
        {{data.lqYear}}
      </div>
    </div>

    <div class="row">
      <div class="left">
        坐落
      </div>
      <div class="right">
        {{data.zl}}
      </div>
      <div class="left">
        土名
      </div>
      <div class="right">
        {{data.tm}}
      </div>
    </div>

    <div class="row">
      <div class="left">
        采伐东
      </div>
      <div class="right">
        {{data.cfeast}}
      </div>
      <div class="left">
        采伐南
      </div>
      <div class="right">
        {{data.cfsouth}}
      </div>
    </div>

    <div class="row">
      <div class="left">
        采伐西
      </div>
      <div class="right">
        {{data.cfwest}}
      </div>
      <div class="left">
        采伐北
      </div>
      <div class="right">
        {{data.cfnorth}}
      </div>
    </div>

    <div class="row">
      <div class="left">
        身份证
      </div>
      <div class="right">
        {{data.idcard}}
      </div>
      <div class="left">
        持证人
      </div>
      <div class="right">
        {{data.client}}
      </div>
    </div>

    <div class="row">
      <div class="left">
        联系电话
      </div>
      <div class="right">
        {{data.linkPhone}}
      </div>
      <div class="left">
        委托人地址
      </div>
      <div class="right">
        {{data.clientAdress}}
      </div>
    </div>

    <div class="row">
      <div class="left">
        林班
      </div>
      <div class="right">
        {{data.xiaoBan}}
      </div>
      <div class="left">
        林班名称
      </div>
      <div class="right">
        {{data.LinBalinBanNamenName}}
      </div>
    </div>

    <div class="row">
      <div class="left">
        林地试用期
      </div>
      <div class="right">
        {{data.syq}}
      </div>
      <div class="left">
        录入时间
      </div>
      <div class="right">
        {{data.dateTime}}
      </div>
    </div>

    <div class="row">
      <div class="left">
        状态
      </div>
      <div class="right">
        {{data.state}}
      </div>
      <div class="left">
        读取
      </div>
      <div class="right">
        {{data.isFz==='1'?"已读取":"未读取"}}
      </div>
    </div>

    <div class="row">
      <div class="left">
        小班
      </div>
      <div class="right">
        {{data.xiaoBan}}
      </div>
      <div class="left">
        地图编号
      </div>
      <div class="right">
        {{data.mobileNo}}
      </div>
    </div>

    <div class="title">
      树种信息
    </div>

    <div class="shuZhong">
      <div v-for="(item,key) in data.speciesdate" :key="key">
      <div class="shuZhong-row"> <span>树种</span> <span>采伐蓄积</span> <span>采伐株数</span> <span>采伐出材</span> </div>
      <div class="shuZhong-row"> <span>{{item.species}}</span> <span>{{item.cflxj?Number(item.cflxj).toFixed(2):0}}</span> <span>{{Number(item.cflzs).toFixed(2)}}</span> <span>{{item.CFLCC?Number(item.CFLCC).toFixed(2):0}}</span> </div>
      </div>
    </div>

    <div class="title">
      设计图
    </div>

    <div class="sheJiTu">
      <img
        :src="data.picURL"
        style="width:100%;height:500px"
        alt=""
      >
    </div>

  </div>
</template>

<script>
export default {
    name: 'XmingXi',
    props: {
        data: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data() {
        return {

        };
    },
    mounted() {
    },
    async created() {
        console.log(99);
        console.log(this.data);


    },
    computed: {
    },
    watch: {
    },
    methods: {


    }
};
</script>

<style lang="css" scoped>
.row{
overflow :hidden;
 border: 1px solid #d0d0d0;
}

.row .left{
float :left;
background: #e2e2e2;
border-right: 1px solid #d0d0d0;
line-height: 30px;
height: 30px;
width: 150px;
padding-left: 10px
}


.row .right{
float: left;
line-height: 30px;
height: 30px;
width: 300px;
padding-left: 10px
}

.shuZhong .shuZhong-row{
   border: 1px solid #d0d0d0;
}

.shuZhong .shuZhong-row span{
  display: inline-block;
   width: 250px;
 border-right: 1px solid #d0d0d0;
 text-align: center;
  line-height: 30px;
}
.title{
  line-height: 30px;
  background-color:#e2e2e2;
}
.border-none{
  border: none;
}
</style>
// Client //申请单位
// //身份证
// IDCard //身份证号
// LinkPhone //手机号
// ClientAdress //地址
// LqCard //林权证号
//  LIN_CHANG//林场 或者乡镇
//  CUNName //村
//  GroupName //组
//  XiaoBan //小班
//  TM //小地名
//  CFEast // 东
//  CFSouth // 南
//  CFWest //西
//  CFNorth //北
//  Cai_Fa_MJ //采伐面积

//  XBdate[0].QI_YUAN //起源

//  XBdate[0].SEN_LIN_LB == "公益林" ? "1" : "2"
// XBdate[0].LIN_ZHONG //林种二级

// Speciesdate[0].Species //优势树种二级
//   $("#pri_daids").val(data.data.MobileNo);

//                     //隐藏面板
//                     if (isNullOrEmpty(data.data.Sen_Lin_LB_DM) != 0) {
//                         $("#SEN_LIN_LBMC").val(data.data.Sen_Lin_LB_DM == "2" ? "2" : "1").change() //森林类别;
//                         $("#CAI_FA_LXMC").val(data.data.Cai_Fa_Lxdm).trigger("change"); //采伐类型
// //                        $("#CAI_FA_LXMC1 option").filter(function() {
// //                         return $(this).text() == data.data.Cai_Fa_Fsmc;
// //                        }).attr("selected", true);
//                         //$("#CAI_FA_LXMC1").val(data.data.Cai_Fa_Fsdm);

//                         //使用定时器3秒后为采伐方式赋值
//                         var st= setTimeout(function(){
//                            $("#CAI_FA_LXMC1 option").filter(function() {
//                              return $(this).text() == data.data.Cai_Fa_Fsmc;
//                         }).attr("selected", true);
//                         //赋值后移除定时器
//                         clearTimeout(st);
//                         },3000)
//                     }


//                     if (data.data.XBdate.length > 0) {
//                         $("#QI_YUAN_MC option").filter(function() {
//                             return $(this).text() == data.data.XBdate[0].QI_YUAN;
//                         }).attr("selected", true); //起源

//                         //$("#SEN_LIN_LBMC").val(data.data.XBdate[0].SEN_LIN_LB == "公益林" ? "1" : "2").change();
//                         $("#LIN_ZHONG_MC option").filter(function() {
//                             return $(this).text() == data.data.XBdate[0].LIN_ZHONG;
//                         }).attr("selected", true);
//                     }

//                     if (data.data.Speciesdate.length > 0) {
//                         $("#div_sqsz").hide();
//                         $("#div_xbzs").show();
//                         var sumcc = 0.00;
//                         var sumxj = 0.00;
//                         var sumzs = 0;
//                         $("#SHU_ZHONG_MC option").filter(function() {
//                             return $(this).text() == data.data.Speciesdate[0].Species;
//                         }).attr("selected", true); //优势树种
//                         var html_sz = "";
//                         var html_sz = "<table id=\"tab_sz\" style=\"width:100%;\">"
//                         html_sz += "<tr><th scope=\"col\">树种</th><th scope=\"col\">商品材蓄积(m³)</th><th scope=\"col\">非商品材蓄积(m³)</th><th scope=\"col\">株数</th><th scope=\"col\">商品材出材量(m³)</th><th scope=\"col\">非商品材出材量(m³)</th></tr>";
//                         $.each(data.data.Speciesdate, function(i, item) {
//                             var xj = parseFloat(parseFloat(isNullOrEmpty(item.CFLXJ)).toFixed(2));
//                             sumxj += xj;
//                             var zs = parseInt(isNullOrEmpty(item.CFLZS));
//                             sumzs += zs;
//                             var cc = parseFloat(parseFloat(isNullOrEmpty(item.CFLCC)).toFixed(2));
//                             sumcc += cc;
//                             html_sz += "<tr><td>" + item.Species + "</td><td><input type='text' value='" + xj + "' /></td><td><input type='text' value='0' /></td><td><input type='text' value='" + zs + "' /></td><td><input type='text' value='" + cc + "' /></td><td><input type='text' value='0' /></td></tr>";
//                         })
//                         html_sz += "</table>";
//                         $("#div_xbzs").html(html_sz);

//                         $("#CAI_FA_CC").val(sumcc.toFixed(2));
//                         $("#CAI_FA_ZS").val(sumzs.toFixed(2));
//                         $("#CAI_FA_XJ").val(sumxj.toFixed(2));
