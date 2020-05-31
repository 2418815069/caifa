<script>
import { yuCunApi, getyuCunListApi, deleYuCunApi, getKeFenJieXian } from './api';
import Storage from '@/common/storage';
import { addFormConfig, formList } from './config';
import wenHaoComm from '@/components/common/wenHao';
export default {
    data() {
        return {
            nianFen: new Date().getFullYear(),
            // 没有实际操作用于展示当前查询的年份
            tableNianFen: new Date().getFullYear(),
            addFormConfig,
            // 年份
            yearArr: this.getYearArr(),
            // 查询预存指标参数
            danWeiBind: {
                prop: {
                    guiKouShow: false
                }
            },
            // 预存指标的数据
            yuCunList: {
                list: [],
                total: 20
            },
            formData: {
                nianFen: new Date().getFullYear(),
                xianeLeiBie: '1',
                quanShuX: {value: '2'},
                qiYuanX: {value: '2'},
                danWei: {value: Storage.get('userInfo').xzCode}
            },
            pagerInfo: {
                pageSize: 10,
                pageNo: 1
            },
            formList,
            wenHao: '',
            form: {
                gylDg: 0,
                gylFycf: 0,
                gylGxcf: 0,
                gylQtcf: 0,
                maoZhu: 0,
                splDg: 0,
                splFyf: 10,
                splQtcf: 0,
                splZf: 0,
                xianeLeiBie: '2'
            },
            commBind: {
                prop: {
                    isAllShow: false,
                    rules: [
                        { required: true, message: '请选择文号', trigger: 'blur' }
                    ]
                }
            },
            tableData: []
        };
    },
    components: {
        wenHaoComm
    },
    async created() {
    },
    methods: {
        async  init() {
            let obj = {};
            this.addFormConfig.map(x => {
                const prop = x.prop;
                const propValue = this.formData[prop];
                if (prop === 'nianFen' && propValue) {
                    obj[prop] = propValue;
                }
                if (prop === 'danWei' && propValue) {
                    if (propValue.value.length === 12) {
                        obj.bianXianBm = propValue.value.substr(0, 10);
                    } else {
                        obj.bianXianBm = propValue.value;
                    }
                }
                // 起源 权属
                if (prop === 'qiYuanX' || prop === 'quanShuX') {
                    obj[x.allProps[0]] = propValue.value;
                }
            });
            let v = await getKeFenJieXian(obj);
            this.form = {
                gylDg: v.sgylDgcf,
                gylFycf: v.sgylFycf,
                gylGxcf: v.sgylGxcf,
                gylQtcf: v.sgylQtcf,
                maoZhu: v.smaoZhu,
                splDg: v.ssplDg,
                splFyf: v.ssplFycf,
                splQtcf: v.ssplQtcf,
                splZf: v.ssplZf
            };
            this.tableData = [v, this.form];
        },
        wenHaoChange(value) {
            this.wenHao = value;
        },
        updatePagerInfo(data) {
            let obj = {
                page: data.pageNo,
                size: data.pageSize
            };
            this.getyuCunList(Object.assign({}, this.formData, obj));
        },
        // 继承分页
        updatePagerInfoTOJiCheng(pageInfo) {
            let obj = {
                page: pageInfo.pageNo,
                size: pageInfo.pageSize
            };
            this.jiChengQuery(Object.assign({}, this.JiChengFormData, obj));
        },
        // 操作区回调
        handleAction({ action, data }) {
            switch (action) {
                case 'deleYuCunApi':
                    this.deleYuCunApi(data);
                    break;
            }
        },
        addXianE() {
            if (!this.wenHao) {
                return alert('请选择文号');
            }
            let obj = {
                nianFen: this.formData.nianFen,
                wenHao: this.wenHao,
                shiBm: this.formData.danWei.value.substring(0, 4),
                xianBm: this.formData.danWei.value.substring(0, 6),
                bianXianBm: this.formData.danWei.value,
                bianXianMc: this.formData.danWei.label[2],
                quanShu: this.formData.quanShuX.value,
                quanShuMc: this.formData.quanShuX.label,
                qiYuan: this.formData.qiYuanX.value,
                qiYuanMc: this.formData.qiYuanX.label,
                xianeLeiBie: this.formData.xianeLeiBie
            };

            this.$refs.addForm.validate(async valid => {
                if (valid) {
                    this.addSave(Object.assign({}, obj, this.form));
                }
            });
            return '';
        },
        // 新增预存
        async addSave(data) {
            let msg = '';
            if (!data.bianXianBm || data.bianXianBm.length !== 10) {
                msg = '单位至少选择到编限单位';
            }
            if (!data.wenHao) {
                msg = '请选择文号';
            }
            if (!data.qiYuan || !data.qiYuanMc) {
                msg = '请选择起源';
            }
            if (!data.quanShu || !data.quanShuMc) {
                msg = '请选择权属';
            }
            if (msg) {
                this.$notify({
                    title: '预存指标失败',
                    type: 'error',
                    message: msg
                });
                return;
            }
            let isTrue = false;
            Object.keys(this.form).map(x=>{
                if (Number(this.form[x]) > 0) {
                    isTrue = true;
                }
            });
            if (!isTrue) {
                alert('请输入正确指标');
                return;
            }
            // 过滤无用数据
            Object.keys(data).map(x => {
                // guid为唯一标识
                let arr = [
                    'guid',
                    'nianFen',
                    'wenHao',
                    'shiBm',
                    'xianBm',
                    'bianXianBm',
                    'bianXianMc',
                    'quanShu',
                    'quanShuMc',
                    'qiYuan',
                    'qiYuanMc',
                    'gylDg',
                    'gylFycf',
                    'gylGxcf',
                    'gylQtcf',
                    'maoZhu',
                    'splDg',
                    'splFyf',
                    'splQtcf',
                    'splZf',
                    'xianeLeiBie'
                ];
                if (!arr.includes(x)) {
                    delete data[x];
                }
            });
            let v = await yuCunApi(data);
            if (v.code === 200) {
                this.$message({
                    type: 'success',
                    message: v.message
                });
                // 新增成功从新查询预存指标列表
                this.getyuCunList();
                // 从新查询可用限额
                this.init();
            }
        },
        // 删除预存指标
        async deleYuCunApi(data) {
            if (this.formData.nianFen < new Date().getFullYear()) {
                this.$message({
                    type: 'error',
                    message: '只能删除当年及之后年的指标'
                });
                return;
            }
            this.$confirm('确定要删除当前指标', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(async () => {
                    let v = await deleYuCunApi({ guid: data.guid });
                    if (v.code === 200) {
                        this.$message({
                            type: 'success',
                            message: v.message
                        });
                        // 删除成功从新查询预存指标列表
                        this.getyuCunList();
                    }
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        },
        // 弹窗相关
        handleUpdate(formData) {
            this.formData = formData;
        },
        nianFenChange(value) {
            this.query.nianFen = value;
        },
        danWeiChange(value) {
            this.query.bianXianBm = value;
        },
        // 查询预存指标
        async getyuCunList(data) {
            let obj = {
                nianFen: this.formData.nianFen,
                bianXianBm: this.formData.danWei ? this.formData.danWei.value : Storage.get('userInfo').xzCode
            };
            let v = await getyuCunListApi(Object.assign({}, obj, data));
            this.yuCunList = {
                list: v.content,
                total: v.totalElements
            };
        },
        getYearArr() {
            let date = new Date();
            let year = Number(date.getFullYear()) - 4;
            let arr = [];
            for (let i = 0; i < 11; i++) {
                arr.push({ label: year + i, value: year + i });
            }
            return arr;
        }
    },
    watch: {
        formData: function (value) {
            if (value.danWei.value.length === 10) {
                this.init();
            } else {
                this.form = {
                    gylDg: 0,
                    gylFycf: 0,
                    gylGxcf: 0,
                    gylQtcf: 0,
                    maoZhu: 0,
                    splDg: 0,
                    splFyf: 0,
                    splQtcf: 0,
                    splZf: 0
                };
            }
            this.getyuCunList();
        }
    },
    computed: {
        gylHj: function () {
            const formObj = this.form;
            return Number(formObj.gylDg) + Number(formObj.gylFycf) + Number(formObj.gylGxcf) + Number(formObj.gylQtcf);
        },
        splHj: function () {
            const formObj = this.form;
            return Number(formObj.splDg) + Number(formObj.splFyf) + Number(formObj.splQtcf) + Number(formObj.splZf);
        }
    }
};
</script>

<template>
  <div>
    <div class="title-bck">选择限额</div>
<xcy-form
          ref="addForm"
          :config="addFormConfig"
          :data="formData"
          @input="handleUpdate"
        />
      <div class="title-bck">第二部 制定采伐限额</div>
      <div class="zhui-jia-input">
        <el-form label-width="46px" label-position="left">
          <el-form-item label="文号:">
            <wen-hao-comm v-bind="commBind" @change="wenHaoChange" />
          </el-form-item>
        </el-form>

        <el-form :model="form">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column align="center" label="分类">
              <template slot-scope="scope">
                <div v-if="scope.$index===0" style="color:red">可用限额</div>
                <div v-if="scope.$index===1">采伐指标</div>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="商品林">
              <el-table-column align="center" label="合计">
                <template slot-scope="scope">
                  <el-input disabled v-model="splHj" v-if="scope.$index===1"></el-input>
                  <div v-if="scope.$index!==1">{{scope.row.sSplHj}}</div>
                </template>
              </el-table-column>
              <el-table-column align="center" label="主伐">
                <template slot-scope="scope">
                  <el-input v-model="form.splZf" v-if="scope.$index===1"></el-input>
                  <div v-if="scope.$index!==1">{{scope.row.ssplZf}}</div>
                </template>
              </el-table-column>
              <el-table-column align="center" label="抚育采伐">
                <template slot-scope="scope">
                  <el-input v-model="form.splFyf" v-if="scope.$index===1"></el-input>
                  <div v-if="scope.$index!==1">{{scope.row.ssplFycf}}</div>
                </template>
              </el-table-column>
              <el-table-column align="center" label="低产林改造">
                <template slot-scope="scope">
                  <el-input v-model="form.splDg" v-if="scope.$index===1"></el-input>
                  <div v-if="scope.$index!==1">{{scope.row.ssplDg}}</div>
                </template>
              </el-table-column>
              <el-table-column align="center" label="其他采伐">
                <template slot-scope="scope">
                  <el-input v-model="form.splQtcf" v-if="scope.$index===1"></el-input>
                  <div v-if="scope.$index!==1">{{scope.row.ssplQtcf}}</div>
                </template>
              </el-table-column>
            </el-table-column>

            <el-table-column align="center" label="生态公益林">
              <el-table-column align="center" label="合计">
                <template slot-scope="scope">
                  <el-input disabled v-model="gylHj" v-if="scope.$index===1"></el-input>
                  <div v-if="scope.$index!==1">{{scope.row.sGylHj}}</div>
                </template>
              </el-table-column>
              <el-table-column align="center" label="更新采伐">
                <template slot-scope="scope">
                  <el-input v-model="form.gylGxcf" v-if="scope.$index===1"></el-input>
                  <div v-if="scope.$index!==1">{{scope.row.sgylGxcf}}</div>
                </template>
              </el-table-column>
              <el-table-column align="center" label="抚育采伐">
                <template slot-scope="scope">
                  <el-input v-model="form.gylFycf" v-if="scope.$index===1"></el-input>
                  <div v-if="scope.$index!==1">{{scope.row.sgylFycf}}</div>
                </template>
              </el-table-column>
              <el-table-column align="center" label="低产林改造">
                <template slot-scope="scope">
                  <el-input v-model="form.gylDg" v-if="scope.$index===1"></el-input>
                  <div v-if="scope.$index!==1">{{scope.row.sgylDgcf}}</div>
                </template>
              </el-table-column>
              <el-table-column align="center" label="其他采伐">
                <template slot-scope="scope">
                  <el-input v-model="form.gylQtcf" v-if="scope.$index===1"></el-input>
                  <div v-if="scope.$index!==1">{{scope.row.sgylQtcf}}</div>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </el-form>
      </div>

      <div style="text-align:center;margin:20px 0">
        <el-button type="primary" size="mini" @click="addXianE">预存采伐指标</el-button>
      </div>

      <div class="title-bck">{{tableNianFen}}年编限单位预存指标</div>
      <div class="table-title" style="font-size: 12px;">单位: 立方米、株</div>
      <xcy-list
        :data="yuCunList"
        :props="formList"
        :pagerInfo="pagerInfo"
        @action="handleAction"
        @updatePagerInfo="updatePagerInfo"
        :hasPager="true"
      />
  </div>
</template>

<style>
.maoZhuHeader {
  width: 300px;
  color: rgb(255, 0, 0);
}
.store-limit-edit-dialog .el-dialog__body {
  padding: 0 10px 10px 10px;
}
</style>

<style scoped>
.table-title {
  text-align: right;
  margin-bottom: 4px;
}
</style>
