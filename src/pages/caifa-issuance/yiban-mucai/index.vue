
<script src="./yiban.js"></script>

<template>
  <div>
    <el-button
      type="primary"
      size="mini"
      v-if="!this.$route.query.guid"
      @click="caiFaZhengJiChengClick"
    >采伐证继承
    </el-button>
    <el-button
      type="primary"
      size="mini"
      v-if="!this.$route.query.guid"
      @click="daoRuZuoYe"
    >导入作业设计</el-button>
    <el-button
      type="primary"
      size="mini"
      v-if="!this.$route.query.guid"
      @click="relationZuoYe"
    >关联作业设计档</el-button>
    <div style="font-size: 22px;text-align: center;margin-bottom:30px ;">林木采伐许可证申请</div>
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
        <el-col
          :offset="1"
          :span="11"
          v-if="this.$root.isZheJiang"
        >
          <el-form-item
            label="事项子类:"
            label-width="90px"
            prop="shiXiangJbm"
          >
            <el-select
              :disabled="this.guid!==''"
              v-model="form.shiXiangJbm"
              class="width300"
              @change="shiXiangJbmChange"
            >
              <el-option
                value="许可-00344-001-01"
                label="非林地采伐许可"
              ></el-option>
              <el-option
                value="许可-00344-001-02"
                label="征占用林地采伐许可"
              ></el-option>
              <el-option
                value="许可-00344-001-03"
                label="自然灾害木清理采伐许可"
              ></el-option>
              <el-option
                value="许可-00344-001-04"
                label="省级以上林业工程项目采伐许可"
              ></el-option>
              <el-option
                value="许可-00344-001-05"
                label="其他一般木材采伐许可"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col
          :offset="1"
          :span="11"
        >
          <el-form-item
            label="采伐申请类型:"
            prop="isXiane"
            v-if="this.$root.isZheJiang"
          >
            <el-select
              class="width300"
              disabled
              v-model="form.isXiane"
            >
              <el-option
                value="2"
                label="仅占限额"
              ></el-option>
              <el-option
                value="3"
                label="不占限额计划"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="采伐申请类型:"
            prop="isXiane"
            v-else
          >
            <el-select
              class="width300"
              @change="isXianeChangeByQuanGuo"
              v-model="form.isXiane"
            >
              <el-option
                v-for="(item,index) in shenQingLeiXingArr"
                :key="index"
                :value="item.bianMa"
                :label="item.mingCheng"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col
          :offset="1"
          :span="11"
          v-if="!this.$root.isZheJiang &&this.form.isXiane==='3'"
        >
          <el-form-item
            label
            label-width="0px"
            prop="qiTaCfdm"
          >
            <el-radio-group v-model="form.qiTaCfdm">
              <el-radio label="1">房前屋后林木</el-radio>
              <el-radio label="2">非林地林木</el-radio>
              <el-radio label="5">征占用林地</el-radio>
              <el-radio label="3">其他</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col
          :offset="1"
          :span="11"
          v-if="!this.$root.isZheJiang &&this.form.isXiane==='4'"
        >
          <el-form-item
            label
            label-width="0px"
            prop="zhuiJiaLx"
          >
            <el-radio-group v-model="form.zhuiJiaLx">
              <el-radio label="1">省预留</el-radio>
              <el-radio label="2">国家</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :offset="1"
          :span="11"
        >
          <el-form-item
            label="材质:"
            label-width="90px"
            prop="muZhu"
          >
            <el-radio-group
              v-model="form.muZhu"
              class="width300"
              @change="caiZhiChange"
            >
              <el-radio
                :disabled="muZhudisabled"
                label="1"
              >林木</el-radio>
              <el-radio
                :disabled="muZhudisabled"
                label="2"
              >竹材</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col
          :offset="1"
          :span="11"
        >
          <el-form-item
            label="申请单位:"
            prop="shenQinRen"
          >
            <el-input
              v-model="form.shenQinRen"
              class="width300"
            ></el-input>
            <span style="color:#F56C6C;width:5%;margin-left:3%">*</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :offset="1"
          :span="23"
        >
          <el-form-item
            label="限额单位:"
            label-width="90px"
            prop="danWei"
          >
            <dan-wei-comm
              v-if="danWeiCommShow"
              v-bind="danWeiBind"
              @change="danWeiChange"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="title-bck">联系方式</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :offset="1"
          :span="24"
        >
          <el-col :span="12">
            <el-form-item
              label="证件类型"
              label-width="90px"
              prop="applyCardtype"
              v-if="this.$root.isZheJiang"
            >
              <el-select
                class="width300"
                v-model="form.applyCardtype"
              >
                <el-option
                  v-for="(item,index) in zhengJianArr"
                  :key="index"
                  :label="item.mingCheng"
                  :value="item.bianMa"
                ></el-option>
              </el-select>
              <span style="color:#F56C6C;width:5%;margin-left:3%">*</span>
            </el-form-item>

            <el-form-item
              label="申请人类型"
              label-width="90px"
              prop="applyType"
              v-else
            >
              <el-select
                class="width300"
                v-model="form.applyType"
              >
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
            <el-form-item
              label="证件号码:"
              prop="applyCardnumber"
            >
              <el-input
                class="width300"
                v-model="form.applyCardnumber"
              ></el-input>
              <span style="color:#F56C6C;width:5%;margin-left:3%">*</span>
                  <el-button
                  size="mini"
                  v-if="this.$root.isZheJiang"
                  @click="validApplyCardnumber(form.applyCardnumber)"
                >验证
                </el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="手机号:"
              label-width="90px"
              prop="telphone"
            >
              <el-input
                class="width300"
                v-model="form.telphone"
              ></el-input>
              <span style="color:#F56C6C;width:5%;margin-left:3%">*</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="邮寄地址:"
              prop="address"
            >
              <el-input
                class="width300"
                v-model="form.address"
              ></el-input>
              <span style="color:#F56C6C;width:5%;margin-left:3%">*</span>
            </el-form-item>
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :span="24"
          v-if="this.$root.isZheJiang && form.applyCardtype==='53'"
        >
          <div class="title-bck">法人信息</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :offset="1"
          :span="24"
          v-if="this.$root.isZheJiang && form.applyCardtype==='53'"
        >
          <el-col :span="12">
            <el-form-item
              label="法定代表人:"
              label-width="90px"
              prop="legalman"
            >
              <el-input
                class="width300"
                v-model="form.legalman"
              ></el-input>
              <span style="color:#F56C6C;width:5%;margin-left:3%">*</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="法定代表人身份证:"
              label-width="130px"
              prop="legalman1"
            >
              <el-input
                class="width300"
                v-model="form.legalman1"
              ></el-input>
              <span style="color:#F56C6C;width:5%;margin-left:3%">*</span>
              <el-button
                  size="mini"
                  v-if="this.$root.isZheJiang"
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
        <el-col
          :offset="1"
          :span="24"
        >
          <el-col :span="12">
            <el-form-item
              label="申请依据:"
              label-width="90px"
              prop="zuoYeHao"
            >
              <el-input
                class="width300"
                v-model="form.zuoYeHao"
              ></el-input>
              <span style="color:#F56C6C;width:5%;margin-left:3%">*</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="林权证号:"
              prop="linQuanZh"
            >
              <el-input
                class="width300"
                v-model="form.linQuanZh"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="宗地号:"
              label-width="90px"
              prop="zongDihao"
            >
              <el-input
                class="width300"
                v-model="form.zongDihao"
              ></el-input>
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
        <el-col
          :offset="1"
          :span="24"
        >
          <el-col :span="12">
            <el-form-item
              label="林场或乡镇:"
              label-width="90px"
              prop="linChang"
            >
              <el-input
                class="width300"
                v-model="form.linChang"
              ></el-input>
              <span style="color:#F56C6C;width:5%;margin-left:3%">*</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="林班或村:"
              prop="linBan"
            >
              <el-input
                class="width300"
                v-model="form.linBan"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="工区或组:"
              label-width="90px"
              prop="gongZuoQu"
            >
              <el-input
                class="width300"
                v-model="form.gongZuoQu"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="小班:"
              prop="xiaoBan"
            >
              <el-input
                class="width300"
                v-model="form.xiaoBan"
              ></el-input>
              <el-button
                primary
                v-if="this.$root.isZheJiang"
                @click="showMap"
              >地图标记</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="小地名:"
              label-width="90px"
              prop="xiaoDiMing"
            >
              <el-input
                class="width300"
                v-model="form.xiaoDiMing"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="title-bck">四边界</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :offset="1"
          :span="24"
        >
          <el-col :span="12">
            <el-form-item
              label="东至:"
              label-width="90px"
              prop="sbjDong"
            >
              <el-input
                class="width300"
                v-model="form.sbjDong"
              ></el-input>
              <span style="color:#F56C6C;width:5%;margin-left:3%">*</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="南至:"
              prop="sbjNan"
            >
              <el-input
                class="width300"
                v-model="form.sbjNan"
              ></el-input>
              <span style="color:#F56C6C;width:5%;margin-left:3%">*</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="西至:"
              label-width="90px"
              prop="sbjXi"
            >
              <el-input
                class="width300"
                v-model="form.sbjXi"
              ></el-input>
              <span style="color:#F56C6C;width:5%;margin-left:3%">*</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="北至:"
              prop="sbjBei"
            >
              <el-input
                class="width300"
                v-model="form.sbjBei"
              ></el-input>
              <span style="color:#F56C6C;width:5%;margin-left:3%">*</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="东(X):"
              label-width="90px"
              prop="gpsDbx"
            >
              <el-input
                class="width300"
                v-model="form.gpsDbx"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="东(Y):"
              prop="gpsDby"
            >
              <el-input
                class="width300"
                v-model="form.gpsDby"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="南(X):"
              label-width="90px"
              prop="gpsDnx"
            >
              <el-input
                class="width300"
                v-model="form.gpsDnx"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="南(Y):"
              prop="gpsDny"
            >
              <el-input
                class="width300"
                v-model="form.gpsDny"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="西(X):"
              label-width="90px"
              prop="gpsXnx"
            >
              <el-input
                class="width300"
                v-model="form.gpsXnx"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="西(Y):"
              prop="gpsXny"
            >
              <el-input
                class="width300"
                v-model="form.gpsXny"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="北(X):"
              label-width="90px"
              prop="gpsXbx"
            >
              <el-input
                class="width300"
                v-model="form.gpsXbx"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="北(Y):"
              prop="gpsXby"
            >
              <el-input
                class="width300"
                v-model="form.gpsXby"
              ></el-input>
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
        <el-col
          :offset="1"
          :span="24"
        >
          <el-col :span="12">
            <el-form-item
              label="林木权属:"
              label-width="90px"
              prop="linQuanDm"
            >
              <el-select
                v-model="form.linQuanDm"
                class="width300"
                :disabled="isShenHe"
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
            <el-form-item
              label="林木起源:"
              prop="qiYuanDm"
            >
              <el-select
                v-model="form.qiYuanDm"
                class="width300"
                :disabled="isShenHe"
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
            <el-form-item
              label="林种:"
              label-width="90px"
              prop="linZhongDm"
            >
              <el-row>
                <el-col :span="12">
                  <el-select
                    @change="senLinLbDmChange"
                    style="width:192px"
                    v-model="form.senLinLbDm"
                    placeholder="请选择"
                    :disabled="(!this.$root.isZheJiang && form.muZhu==='2')||isShenHe"
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
                    :disabled="(!this.$root.isZheJiang && form.muZhu==='2')||isShenHe"
                    style="width:192px"
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
                  <span
                    style="color:#F56C6C;width:5%;margin-left:3%"
                    v-if="form.muZhu==='1'"
                  >*</span>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="优势树种:"
              prop="shuZhongDm"
            >
              <el-row>
                <el-col :span="12">
                  <el-select
                    :disabled="isShenHe"
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
                    style="width:192px"
                    :disabled="isShenHe"
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
            <el-form-item
              label="龄组:"
              label-width="90px"
              prop="linFenNl"
            >
              <el-select
                style="width:192px"
                v-model="form.linFenNl"
                placeholder="请选择"
              >
                <el-option
                  v-for="(item,key) in lingZuArr"
                  :key="key"
                  :value="item.bianMa"
                  :label="item.mingCheng"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="小班蓄积:"
              prop="xiaoBanXj"
            >
              <el-input
                class="width300"
                v-model="form.xiaoBanXj"
              ></el-input>
              <span>立方米</span>
              <span
                style="color:#F56C6C;width:5%;margin-left:3%"
                v-if="form.muZhu==='1'"
              >*</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="郁闭度:"
              label-width="90px"
              prop="yuBiDu"
            >
              <el-input
                class="width300"
                v-model="form.yuBiDu"
              ></el-input>
              <span
                style="color:#F56C6C;width:5%;margin-left:3%"
                v-if="form.muZhu==='1'"
              >*</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="采伐类型:"
              prop="caiFaFsdm"
            >
              <el-row>
                <el-col :span="12">
                  <el-select
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
            <el-form-item
              label="蓄积强度:"
              label-width="90px"
              prop="xuJiQd"
            >
              <el-input
                class="width300"
                v-model="form.xuJiQd"
              ></el-input>
              <span>%</span>
              <span style="color:#F56C6C;width:5%;margin-left:3%">*</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="株数强度:"
              prop="zhuShuQd"
            >
              <el-input
                class="width300"
                v-model="form.zhuShuQd"
              ></el-input>
              <span>%</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="采伐面积:"
              label-width="90px"
              prop="caiFaMj"
            >
              <el-input
                class="width300"
                v-model="form.caiFaMj"
              ></el-input>
              <span>公顷</span>
              <span style="color:#F56C6C;width:5%;margin-left:3%">*</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="采伐蓄积:"
              prop="caiFaXj"
            >
              <el-input
                class="width300"
                disabled
                v-model="form.caiFaXj"
              ></el-input>
              <span>立方米</span>
              <span
                style="color:#F56C6C;width:5%;margin-left:3%"
                v-if="form.muZhu==='1'"
              >*</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="出材量:"
              label-width="90px"
              prop="caiFaCc"
            >
              <el-input
                class="width300"
                disabled
                v-model="form.caiFaCc"
              ></el-input>
              <span>立方米</span>
              <span
                style="color:#F56C6C;width:5%;margin-left:3%"
                v-if="form.muZhu==='1'"
              >*</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="采伐株数:"
              prop="caiFaZs"
            >
              <el-input
                class="width300"
                disabled
                v-model="form.caiFaZs"
              ></el-input>
              <span>株</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="采伐期限:"
              prop="caiFaQxz"
            >
              <el-row>
                <el-col :span="12">
                  <el-date-picker
                    style="width:200px"
                    v-model="form.caiFaQxq"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                  ></el-date-picker>
                </el-col>
                <el-col :span="12">
                  <el-date-picker
                    style="width:200px"
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
        <el-col
          :offset="1"
          :span="11"
        >
          <el-form-item
            label="更新方式:"
            label-width="90px"
            prop="gengXingFsdm"
          >
            <el-select
              class="width300"
              v-model="form.gengXingFsdm"
            >
              <el-option
                v-for="(item,key) in gengXinFangShiArr"
                :key="key"
                :value="item.bianMa"
                :label="item.mingCheng"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col
          :offset="1"
          :span="11"
        >
          <el-form-item
            label="更新面积:"
            prop="gengXingMjdw"
          >
            <el-input
              class="width300"
              v-model="form.gengXingMjdw"
            ></el-input>
            <span>公顷</span>
          </el-form-item>
        </el-col>
        <el-col
          :offset="1"
          :span="11"
        >
          <el-form-item
            label="更新树种:"
            label-width="90px"
            prop="gengXingSz"
          >
            <el-input
              class="width300"
              v-model="form.gengXingSz"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col
          :offset="1"
          :span="11"
        >
          <el-form-item
            label="更新期限:"
            prop="gengXingQx"
          >
            <el-date-picker
              v-model="form.gengXingQx"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col
          :offset="1"
          :span="11"
        >
          <el-form-item
            label="更新株数:"
            label-width="90px"
            prop="gengXingZs"
          >
            <el-input
              class="width300"
              v-model="form.gengXingZs"
            ></el-input>
            <span>株</span>
          </el-form-item>
        </el-col>
        <el-col
          :offset="1"
          :span="11"
          v-if="form.shiXiangJbm==='许可-00344-001-02'"
        >
          <el-form-item
            label="批文文号:"
            label-width="90px"
            prop="piWenWh"
          >
            <el-input
              class="width300"
              v-model="form.piWenWh"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col
          :offset="1"
          :span="11"
          v-if="form.shiXiangJbm==='许可-00344-001-02'"
        >
          <el-form-item
            label="批文文件名:"
            label-width="90px"
            prop="piWenWjm"
          >
            <el-input
              class="width300"
              v-model="form.piWenWjm"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col
          :offset="1"
          :span="11"
        >
          <el-form-item
            label="备注:"
            label-width="90px"
            prop="beiZhu"
          >
            <el-input
              class="width300"
              v-model="form.beiZhu"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="title-bck">材料上传</div>
        </el-col>
      </el-row>
      <el-row>
        <el-table
          :data="caiLiaoTableData"
          style="width:100%"
          border
        >
          <el-table-column
            align="center"
            prop="caiLiaoLeiBie"
            label="材料类别"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="caiLiaoMingXi"
            label="材料明细"
          ></el-table-column>
          <el-table-column
            align="center"
            label="附件上传"
          >
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
                >上传
                </el-button>
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
        <el-table
          v-if="shuZhongTableShow"
          :data="shuZhongTableData"
          width="100%"
          border
        >
          <el-table-column
            align="center"
            label="树种"
          >
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
                  <el-select
                    style="width:150px"
                    v-model="scope.row.shuZhongDm"
                  >
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
          <el-table-column
            align="center"
            label="积蓄(立方米)"
          >
            <el-table-column
              align="center"
              prop="name"
              label="商品材"
              width="150"
            >
              <template slot-scope="scope">
                <el-row>
                  <el-col :span="24">
                    <el-input
                      style="width:90%"
                      :disabled="form.muZhu==='2'"
                      v-model="scope.row.caiFaXjSpc"
                    ></el-input>
                    <span
                      style="color:#F56C6C;width:5%;margin-left:3%"
                      v-if="form.muZhu==='1'"
                    >*</span>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="name"
              label="非商品材"
              width="150"
            >
              <template slot-scope="scope">
                <el-row>
                  <el-col :span="24">
                    <el-input
                      style="width:90%"
                      :disabled="form.muZhu==='2'"
                      v-model="scope.row.caiFaXjFspc"
                    ></el-input>
                    <span
                      style="color:#F56C6C;width:5%;margin-left:3%"
                      v-if="form.muZhu==='1'"
                    >*</span>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            align="center"
            width="100"
            label="株数"
          >
            <template slot-scope="scope">
              <el-row :gutter="20">
                <el-col :span="24">
                  <el-input v-model="scope.row.caiFaZs"></el-input>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="出材(立方米)"
          >
            <el-table-column
              align="center"
              prop="name"
              label="商品材"
              width="150"
            >
              <template slot-scope="scope">
                <el-row>
                  <el-col :span="24">
                    <el-input
                      style="width:90%"
                      v-model="scope.row.chuCaiSpc"
                      :disabled="form.muZhu==='2'"
                    ></el-input>
                    <span
                      style="color:#F56C6C;width:5%;margin-left:3%"
                      v-if="form.muZhu==='1'"
                    >*</span>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="name"
              label="非商品材"
              width="150"
            >
              <template slot-scope="scope">
                <el-row>
                  <el-col :span="24">
                    <el-input
                      style="width:90%"
                      v-model="scope.row.chuCaiFspc"
                      :disabled="form.muZhu==='2'"
                    ></el-input>
                    <span
                      style="color:#F56C6C;width:5%;margin-left:3%"
                      v-if="form.muZhu==='1'"
                    >*</span>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                :disabled="isShenHe"
                @click="shuZhongTableAdd(scope.$index, scope.row)"
              >增加树种
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 采伐作业设计树种 -->
        <div
          class="footer"
          style="padding-top:50px"
          v-if="zuoYeShuZhongTableData.length>0"
        >
          <el-table
            align="center"
            :data="zuoYeShuZhongTableData"
            style="width:100%"
            border
          >
            <el-table-column
              align="center"
              prop="shuZhongMc"
              label="树种"
            >
              <template slot-scope="scope">
                <div>{{scope.row.shuZhongMc}}</div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="caiFaXjSpc"
              label="商品材蓄积(m³)"
            >
              <template slot-scope="scope">
                <el-input v-model="scope.row.caiFaXjSpc"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="caiFaXjFspc"
              label="非商品材蓄积(m³)"
            >
              <template slot-scope="scope">
                <el-input v-model="scope.row.caiFaXjFspc"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="caiFaZs"
              label="株数"
              width="130"
            >
              <template slot-scope="scope">
                <el-input v-model="scope.row.caiFaZs"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="chuCaiSpc"
              label="商品材出材量(m³)"
            >
              <template slot-scope="scope">
                <el-input v-model="scope.row.chuCaiSpc"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="chuCaiFspc"
              label="非商品材出材量(m³)"
            >
              <template slot-scope="scope">
                <el-input v-model="scope.row.chuCaiFspc"></el-input>
              </template>
               </el-table-column>
          </el-table>
        </div>

      </el-row>
      <el-row>
        <div
          class="footer"
          style="padding-top:50px"
          v-if="shuZhongTableSaveData.length>0"
        >
          <el-table
            align="center"
            :data="shuZhongTableSaveData"
            style="width:100%"
            border
          >
            <el-table-column
              align="center"
              prop="shuZhongMc"
              label="树种"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="caiFaXjSpc"
              label="商品材蓄积(m³)"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="caiFaXjFspc"
              label="非商品材蓄积(m³)"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="caiFaZs"
              label="株数"
              width="130"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="chuCaiSpc"
              label="商品材出材量(m³)"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="chuCaiFspc"
              label="非商品材出材量(m³)"
            ></el-table-column>
            <el-table-column
              align="center"
              label="操作"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  :disabled="isShenHe"
                  @click="shuZhongTableDelete(scope.$index, scope.row)"
                >删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-row>
    </el-form>
    <!-- 测试结束 -->
    <!-- <xcy-form
          v-if="test"
          ref="xcyForm"
          :config="filterConfig"
          :data="filterData"
          @input="updateForm"
        ></xcy-form>-->
    <div style="width:300px;margin:0 auto">
      <el-button
        type="primary"
        size="mini"
        @click="saveApply"
        v-if="this.guid===''"
      >申请</el-button>
      <el-button
        type="primary"
        size="mini"
        @click="editApply"
        v-if="this.guid!==''"
      >修改</el-button>
    </div>
    <!-- 采伐证继承弹窗 -->
    <el-dialog
      :close-on-click-modal="false"
      width="85%"
      :visible.sync="jiChengDialogShow"
      custom-class="store-limit-edit-dialog"
    >
      <xcy-form-query
        v-if="jiChengDialogShow"
        ref="jiChengForm"
        :config="jiChengFormConfig"
        :data="jiChengFormData"
        @input="handleJiCheng"
        @query="jiChengQuery"
      />
      <xcy-list
        ref="jiChengTable"
        style="padding-top: 20px"
        :data="jiChengListData"
        :props="jiChengListProps"
        :pagerInfo="pagerInfo"
        @updatePagerInfo="updatePagerInfoTOJiCheng"
        @action="jiChengAction"
        :hasPager="true"
      />
    </el-dialog>
    <!-- 导入作业设计 -->
    <el-dialog
      :close-on-click-modal="false"
      width="50%"
      title="导入作业"
      :visible.sync="daoRuZuoYeDialog"
      custom-class="store-limit-edit-dialog"
    >
      <a
        :href="downloadMoBan"
        download="moBan.zip"
        target="_blank"
      >☆☆数据模版与标准下载☆☆</a>
      <!-- <a :href="downloadMoBan" download="caifazuoyeshejimodel.png" target="_blank">☆☆数据模版与标准下载☆☆</a> -->
      <el-upload
        class="upload-demo"
        :action="uploadUrl"
        :on-success="uploadSuccess"
        :headers="uploadHeader"
        :data="uploadData"
        :show-file-list="false"
        multiple
        :limit="3"
      >
        <el-button
          size="small"
          type="primary"
          @click="uploadClick"
        >提交作业设计</el-button>
      </el-upload>
    </el-dialog>
    <!--地图标记-->
    <el-dialog
      :close-on-click-modal="false"
      width="900px"
      title="选择小班"
      :visible.sync="mapDialog.show"
    >
      <div>
        <div
          style="width: 860px;height: 420px"
          id="map"
          class="map"
        ></div>
        <div style="margin-top: 10px;margin-bottom: 10px">
          市
          <el-select
            v-model="xingZheng.shi"
            @change="initXian"
            size="mini"
            class="xingzheng"
          >
            <el-option
              v-for="item in xingzhengOptions.shi"
              :key="item.xzCode"
              :value="item.xzCode"
              :label="item.xzName"
            ></el-option>
          </el-select>
          县
          <el-select
            v-model="xingZheng.xian"
            @change="initXiang"
            size="mini"
            class="xingzheng"
          >
            <el-option
              v-for="item in xingzhengOptions.xian"
              :key="item.xzCode"
              :value="item.xzCode"
              :label="item.xzName"
            ></el-option>
          </el-select>
          乡
          <el-select
            v-model="xingZheng.xiang"
            @change="initCun"
            size="mini"
            class="xingzheng"
          >
            <el-option
              v-for="item in xingzhengOptions.xiang"
              :key="item.xzCode"
              :value="item.xzCode"
              :label="item.xzName"
            ></el-option>
          </el-select>
          村
          <el-select
            v-model="xingZheng.cun"
            @change="locateMap"
            size="mini"
            class="xingzheng"
            style="margin-right: 9px"
          >
            <el-option
              v-for="item in xingzhengOptions.cun"
              :key="item.xzCode"
              :value="item.xzCode"
              :label="item.xzName"
            ></el-option>
          </el-select>
          <el-button
            size="mini"
            @click="removeXiaoBan"
            v-if="mapDialog.hasXiaoBan"
          >移除小班图层</el-button>
          <el-button
            size="mini"
            @click="addXiaoBan"
            v-else
          >添加小班图层</el-button>
        </div>
        <span>数据来源：浙江省森林资源"一张图"</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <span>小班编号：</span>
        <el-input
          size="mini"
          style="width: 180px"
          v-model="mapDialog.xianBanBh"
        ></el-input>
        <el-button
          size="mini"
          @click="searchXiaoBan"
        >查询</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button
          size="mini"
          @click="confirmXiaoBan"
        >确定</el-button>
        <el-button
          size="mini"
          @click="hideMapDialog"
        >取消</el-button>
        <el-button
          size="mini"
          @click="removeAllMarker"
        >重新标记</el-button>
        <div id="overLay"></div>
      </div>
    </el-dialog>
    <!--小班信息-->
    <el-dialog
      :close-on-click-modal="false"
      width="900"
      title="小班信息"
      :visible.sync="xiaoBanDialog.show"
    >
      <xcy-list
        :data="xiaoBanDialog.data"
        :props="xiaoBanDialog.xiaoBanList"
        :hasPager="false"
      />
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="mini"
          @click="xiaoBanDialog.show=false"
        >取 消</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="addMarker"
          v-if="xiaoBanDialog.xiaoBanArray.length ===0"
        >确认</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="addMarker"
          v-if="xiaoBanDialog.xiaoBanArray.length >0"
        >继续添加</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="clearaddMarker"
          v-if="xiaoBanDialog.xiaoBanArray.length >0"
        >新增</el-button>
      </span>
    </el-dialog>
    <!-- 关联作业设计档 -->
    <el-dialog
      :close-on-click-modal="false"
      width="85%"
      :visible.sync="guanLianZuoYeDialogShow"
    >
      <xcy-form-query
        v-if="guanLianZuoYeDialogShow"
        ref="guanLianFormRef"
        :config="guanLianZuoYeFormConfig"
        :data="guanLianZuoYeFormData"
        @input="handleGuanLianZuoYe"
        @query="guanLianZuoYeQuery"
      />
      <xcy-list
        ref="jiChengTable"
        style="padding-top: 20px"
        :data="guanLianZuoYeListData"
        :props="guanLianZuoYeListProps"
        @action="guanLianZuoYeAction"
      />
      <div style="text-align:center;padding-top:10px">
        <el-button
          type="primary"
          size="mini"
          @click="prePage"
        >上一页</el-button>

        <el-button
          type="primary"
          size="mini"
          @click="nextPage"
          :disabled="nextPageDisabled"
        >下一页</el-button>
      </div>
    </el-dialog>

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

    <!-- 关联作业申请字段效验弹窗 -->
    <el-dialog
      :close-on-click-modal="false"
      width="85%"
      :visible.sync="zuoYeSaveValidShow"
    >
           <xcy-list
        style="padding-top: 20px"
        :data="zuoYeSaveData"
        :props="zuoYeSaveListProps"
      />
      <div style="text-align:center;padding-top:12px">
           <el-button
          type="primary"
          size="mini"
          @click="zuoYeSaveValidShow=false"
        >返回</el-button>
          <el-button
          type="primary"
          size="mini"
          @click="nextSaveApply"
        >跳过</el-button>
        </div>
    </el-dialog>
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

.xingzheng {
  width: 140px;
}
</style>
