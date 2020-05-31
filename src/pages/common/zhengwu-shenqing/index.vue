
<script>
import caiLiaoConfig from './caiLiao';
import {
    getCaiLiao,
    deleteCaiLiao,
    corporation,
    individual,
    getXingZhengArr,
    zhengWuShenQing
} from './api';
import Storage from '@/common/storage';
import { getprovinceConfig } from '@/common/util';
import { cloneDeep } from 'lodash';
export default {
    data() {
        return {
            ruleForm: {},
            rules: {
                shenQinRen: [
                    { required: true, message: '此项不能为空', trigger: 'change' }
                ],
                telphone: [
                    { required: true, message: '此项不能为空', trigger: 'blur' },
                    {
                        pattern: /^1[345678]\d{9}$/,
                        message: '请输入正确手机号',
                        trigger: 'blur'
                    }
                ],
                applyCardnumber: [
                    {
                        required: true,
                        message: '此项不能为空',
                        trigger: 'blur'
                    },
                    {
                        pattern: /^[a-zA-Z0-9]{15,18}$/,
                        message: '请输入15位或者18位正确格式',
                        trigger: 'blur'
                    }
                ],
                address: [
                    {
                        required: true,
                        message: '此项不能为空',
                        trigger: 'blur'
                    }
                ],
                desensitizationApplyCardNumber: [
                    {
                        required: true,
                        message: '此项不能为空',
                        trigger: 'blur'
                    }
                ]
            },
            config: {},
            cLdata: {
                projId: this.getUuid(),
                file: '',
                attrName: '',
                xzCode: '',
                caiLiaoGuid: '',
                caiLiaoMingXi: ''
            },
            fuJianUrl: `${process.env.VUE_APP_BASE_API}/public/api/v1/fujian`,
            // 附件请求头
            uploadHeader: {
                Authorization: Storage.get('jwt')
            },
            caiLiaoTable: [],
            danWeiCode: '',
            provinceCode: '',
            shiArr: [],
            xianArr: [],
            userInfo: {},
            caiLiaoShow: true
        };
    },
    components: {},
    async created() {
        this.init();
    },
    methods: {
        async init() {
            const { type, dUserType, Ticket } = this.$route.query;
            if (type === '9' || type === '10') {
                let copyForm = cloneDeep(this.ruleForm);
                copyForm.treeIsDie = '0';
                this.ruleForm = copyForm;
            }
            if (type) {
                this.config = caiLiaoConfig[type];
                let c = await getCaiLiao({ shiXiangJbm: this.config.subTitle });
                this.caiLiaoTable = c.content;
            }
            let v = '';
            if (dUserType && dUserType === 'uuser') {
                v = await corporation({ ssotoken: Ticket });
                let obj = {
                    shenQinRen: v.CompanyName,
                    telphone: v.attnPhone,
                    applyCardnumber: v.CompanyRegNumber,
                    address: v.CompanyAddress
                };
                let copyForm = cloneDeep(this.ruleForm);
                this.ruleForm = Object.assign(copyForm, obj);
            } else {
                v = await individual({ ticket: Ticket });
                let obj = {
                    shenQinRen: v.username,
                    telphone: v.mobile,
                    applyCardnumber: v.idnum
                };
                let copyForm = cloneDeep(this.ruleForm);
                this.ruleForm = Object.assign(copyForm, obj);
            }
            if (!v) {
                console.error('政务信息获取失败：' + '信息:' + v);
                return;
            }
            let provinceConfig = await getprovinceConfig();
            let xzCode = provinceConfig.provinceCode;
            this.shiArr = await getXingZhengArr({ cParentcode: xzCode || '33' });
        },
        async tiJiao() {
            const uploadBoxCollection = document.getElementsByClassName('upload-box');
            let isUpload = true;
            for (let index = 1; index < uploadBoxCollection.length; index++) {
                const element = uploadBoxCollection[index];
                let liConllection = element.getElementsByTagName('li');
                if (!liConllection.length) {
                    isUpload = false;
                    break;
                }

            }
            if (!isUpload) {
                alert('所有材料不能为空');
                return;
            }
            if (!this.ruleForm.xian) {
                alert('请选择县');
                return;
            }
            this.$refs.ruleForm.validate(async valid=>{
                if (valid) {
                    let obj = cloneDeep(this.ruleForm);
                    obj.bianXianDwdm = obj.xian;
                    this.xianArr.map(x => {
                        if (x.cfrcode === obj.bianXianDwdm) {
                            obj.bianXianDwmc = x.cmc;
                        }
                    });
                    obj.uuid = this.cLdata.projId;
                    delete obj.shi;
                    delete obj.xian;
                    // 隐藏字段 网上申报
                    obj.systemType = '1';
                    obj.timberType = this.config.timber_type;
                    obj.shiXiangJbm = this.config.subTitle;
                    const {dUserType} = this.$route.query;
                    if (dUserType === 'puser') {
                        obj.applyCardtype = '31';
                    } else {
                        obj.applyCardtype = '53';
                    }


                    let v = await zhengWuShenQing(obj);
                    if (v) {
                        this.$message({
                            message: '申请成功',
                            type: 'success'
                        });
                        this.caiLiaoShow = false;
                        let c = await getCaiLiao({ shiXiangJbm: this.config.subTitle });
                        this.caiLiaoShow = true;
                        this.caiLiaoTable = c.content;

                        // this.$refs.upLoadRef.clearFiles();
                    }
                }
            });

        },
        danWeiChange(value) {
            this.danWeiCode = value;
        },
        // 上传之前
        upFn(file) {
            this.cLdata.file = file.name;
        },

        handleSave(index, v) {
            let copyData = cloneDeep(this.cLdata);
            copyData.attrName = v.caiLiaoLeiBie;
            copyData.caiLiaoGuid = v.guid;
            copyData.caiLiaoMingXi = v.caiLiaoMingXi;
            this.cLdata = copyData;
        },
        successFn(response) {
            if (response.code === 200) {
                this.$message({
                    type: 'success',
                    message: '上传成功'
                });
            }
        },
        async deleBeforeFn(file) {
            let v = await deleteCaiLiao({ uuid: file.response.data.uuid });
            if (v) {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }
        },
        getUuid() {
            function s4() {
                return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
            }
            return (
                s4() +
        s4() +
        '-' +
        s4() +
        '-' +
        s4() +
        '-' +
        s4() +
        '-' +
        s4() +
        s4() +
        s4()
            );
        },
        async shiChange(value) {
            let copyData = cloneDeep(this.ruleForm);
            copyData.xian = '';
            this.ruleForm = copyData;
            this.xianArr = await getXingZhengArr({ cParentcode: value });
        }
    },
    watch: {
        // 'ruleForm.shi': async function (value) {
        //     // this.ruleForm.xian = '';
        //     this.xianArr = await getXingZhengArr({ cParentcode: value });

        // }
    }
};
</script>

<template>
  <div>
    <div style="text-align:center;padding:20px 0">{{config.title}}</div>
    <div class="form-box">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        label-position="left"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="采伐申请人:" prop="shenQinRen" label-width="170px">
              <el-input
                size="small"
                style="width:300px"
                v-model="ruleForm.shenQinRen"
                placeholder="请输入采伐申请人"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号:" prop="telphone" label-width="170px">
              <el-input
                size="small"
                style="width:300px"
                v-model="ruleForm.telphone"
                placeholder="请输入手机号"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              :label="this.$route.query.dUserType==='puser'?'身份证号:':'社会统一信用代码'"
              prop="applyCardnumber"
              label-width="170px"
            >
              <el-input
                size="small"
                style="width:300px"
                v-model="ruleForm.applyCardnumber"
                :placeholder="this.$route.query.dUserType==='puser'?'请输入身份证号':'请输入社会统一信用代码'"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="住址:" prop="address" label-width="170px">
              <el-input
                size="small"
                style="width:300px"
                v-model="ruleForm.address"
                placeholder="请输入地址"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="采伐所属行政单位:" label-width="170px">
              <el-select size="small" @change="shiChange" v-model="ruleForm.shi">
                <el-option
                  v-for="(item,key) in shiArr"
                  :key="key"
                  :value="item.cfrcode"
                  :label="item.cmc"
                ></el-option>
              </el-select>县
              <el-select size="small"  v-model="ruleForm.xian">
                <el-option
                  v-for="(item,key) in xianArr"
                  :key="key"
                  :value="item.cfrcode"
                  :label="item.cmc"
                ></el-option>
              </el-select>
              <span style="color:red">*市属单位请选择市辖区</span>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="String(this.$route.query.type)==='4'||String(this.$route.query.type)==='5'||String(this.$route.query.type)==='6'||String(this.$route.query.type)==='7'||String(this.$route.query.type)==='8'">
            <el-form-item label="小班:" label-width="170px">
                <el-input size="small" style="width:300px" placeholder="请输入小班" v-model="ruleForm.xiaoBan"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="this.$route.query.dUserType==='uuser'">
            <el-form-item
              label="企业投资项目统一代码:"
              prop="desensitizationApplyCardNumber"
              label-width="170px"
            >
              <el-input
                size="small"
                style="width:300px"
                v-model="ruleForm.desensitizationApplyCardNumber"
                placeholder="请输入企业投资项目统一代码"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col
            :span="24"
            v-if="this.$route.query.type&&String(this.$route.query.type)==='9'||String(this.$route.query.type)==='10'"
          >
            <el-form-item label="树木是否死亡:" prop="treeIsDie" label-width="170px">
              <el-radio-group v-model="ruleForm.treeIsDie">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 材料 -->
      <div class="caiLiao">
        <el-table :data="caiLiaoTable" style="width:100%" border  v-if="caiLiaoShow">
          <el-table-column align="center" prop="caiLiaoLeiBie" label="材料类别"></el-table-column>
          <el-table-column align="center" prop="caiLiaoMingXi" label="材料明细"></el-table-column>
          <el-table-column align="center" label="附件上传" class-name="upload-box">
            <template slot-scope="scope">
              <el-upload
              ref="upLoadRef"
                class="upload-demo"
                :action="fuJianUrl"
                :file-list="scope.row.fileList"
                :data="cLdata"
                :headers="uploadHeader"
                :before-upload="upFn"
                :on-success="successFn"
                :before-remove="deleBeforeFn"
              >
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleSave(scope.$index, scope.row)"
                >上传</el-button>
              </el-upload>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="text-align:center">
        <el-button size="mini" type="primary" @click="tiJiao">提交</el-button>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.container
  margin: 20px 0;
  padding: 20px;
.form-box
  padding 30px
</style>
