<script>
import { formConfigStep1, zhuiJiaListProps} from './config';
import {
    getCaiFaXianEList,
    getZhuiJiaXianE,
    deleYuCunApi,
    addZhuiJiaXianE
} from './api';
import Storage from '@/common/storage';
import wenHaoComm from '@/components/common/wenHao';
import { cloneDeep } from 'lodash';
export default {
    data() {
        return {
            formConfigStep1,
            formDataStep1: {
                danWei: {value: Storage.get('userInfo').xzCode},
                nianFen: new Date().getFullYear(),
                quanShuComm: {value: '2'},
                qiYuanComm: {value: '1'},
                page: 1,
                size: 10
            },
            wenHao: '',
            tableData: [],
            form: {
                gylDg: 0,
                gylFycf: 0,
                gylGxcf: 0,
                gylQtcf: 0,
                maoZhu: 0,
                splDg: 0,
                splFyf: 0,
                splQtcf: 0,
                splZf: 0
            },
            yuCunList: {
                list: [],
                total: 0
            },
            zhuiJiaListProps,
            pagerInfo: {
                pageSize: 10,
                pageNo: 1
            },
            commBind: {
                prop: {
                    isAllShow: false,
                    rules: [
                        { required: true, message: '请选择文号', trigger: 'blur' }
                    ]
                }
            }
        };
    },
    computed: {
    // 商品林合计
        splHeji: function () {
            const { splDg, splFyf, splQtcf, splZf } = this.form;
            return (Number(splDg) + Number(splFyf) + Number(splQtcf) + Number(splZf)).toFixed(2);
        },
        // 工艺林合计
        gylHeji: function () {
            const { gylDg, gylFycf, gylGxcf, gylQtcf } = this.form;
            return (
                Number(gylDg) + Number(gylFycf) + Number(gylGxcf) + Number(gylQtcf)
            ).toFixed(2);
        }
    },
    components: {
        wenHaoComm
    },
    async created() {
        this.init();
        this.searchZhuiJiaXianE();
    },
    methods: {
        handleUpdateStep1(data) {
            this.formDataStep1 = data;
        },
        wenHaoChange(value) {
            this.wenHao = value;
        },
        // 操作区回调
        handleAction({ action, data }) {
            switch (action) {
                case 'deleYuCunApi':
                    this.deleYuCunApi(data);
                    break;
            }
        },
        // 删除
        deleYuCunApi(data) {
            this.$confirm('确定要删除当前追加限额', '提示', {
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
                        // 删除成功从新查询预存限额列表
                        this.init();
                        this.searchZhuiJiaXianE();
                    }
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        },
        // 预存限额
        async addXianE() {
            let obj = {};
            // wenHao;
            this.$refs.xcyForm.validate(async (valid) => {
                if (valid) {
                    if (!this.wenHao) {
                        alert('请选择文号');
                        return;
                    }
                    if (!this.formDataStep1.danWei.label) {
                        alert('请选择编限单位');
                        return;
                    }
                    let isTure = false;
                    Object.keys(this.form).map(x=>{
                        if (Number(this.form[x]) > 0) {
                            isTure = true;
                        }
                    });
                    if (!isTure) {
                        alert('请输入正确限额');
                        return;
                    }
                    this.formConfigStep1.map(x => {
                        const prop = x.prop;
                        const propValue = this.formDataStep1[prop];

                        if (prop === 'nianFen' && propValue) {
                            obj[prop] = propValue;
                        }
                        // 起源 权属
                        if ((prop === 'quanShuComm' || prop === 'qiYuanComm' ) && propValue) {
                            x.allProps.map((y, index) => {
                                if (index === 0) {
                                    obj[y] = propValue.value;
                                }
                                if (index === 1) {
                                    obj[y] = propValue.label;
                                }
                            });
                        }
                        // 类别
                        if (prop === 'zhuiJiaLb') {
                            obj[prop] = propValue.value;
                        }
                        if (prop === 'danWei' && propValue) {
                            obj.shiBm = propValue.value.substr(0, 4);
                            obj.xianBm = propValue.value.substr(0, 6);
                            obj.bianXianBm = propValue.value;
                            obj.bianXianMc = propValue.label[2];
                        }
                    });
                    obj.wenHao = this.wenHao;
                    const isAllZero = Object.values(this.form).every(v => +v === 0);
                    if (isAllZero) {
                        this.$message({
                            type: 'error',
                            message: '预存限额不能全为0'
                        });
                        return;
                    }
                    let v = await addZhuiJiaXianE(Object.assign(obj, this.form));
                    if (v.code === 200) {
                        this.$message({
                            type: 'success',
                            message: v.message
                        });
                        // 重新查询追加限额
                        this.searchZhuiJiaXianE();
                        this.init();
                    }
                }
            });
        },
        async init() {
            let obj = {
                nianFen: this.formDataStep1.nianFen,
                qiYuan: this.formDataStep1.qiYuanComm.value,
                quanShu: this.formDataStep1.quanShuComm.value
            };
            let v = await getCaiFaXianEList(obj);
            this.tableData = [v, {}];
        },
        // 分页变化
        updatePagerInfo(data) {
            let obj = {
                page: data.pageNo,
                size: data.pageSize
            };
            // TODO
            this.searchZhuiJiaXianE(Object.assign({}, this.formDataStep1, obj));
        },
        // 查询追加限额
        async searchZhuiJiaXianE(data) {
            let copyFormDataStep1 = cloneDeep(this.formDataStep1);
            this.formConfigStep1.map(x => {
                const prop = x.prop;
                const propValue = this.formDataStep1[prop];
                if (prop === 'nianFen' && propValue) {
                    copyFormDataStep1[prop] = propValue;
                }
                if (prop === 'zhuiJiaLb' && propValue) {
                    delete copyFormDataStep1[prop];
                }
                if (prop === 'danWei') {
                    if (propValue) {
                        copyFormDataStep1.bianXianBm = propValue.value;
                    } else {
                        copyFormDataStep1.bianXianBm = Storage.get('userInfo').xzCode;
                    }
                    delete copyFormDataStep1[prop];
                }
                // 起源 权属
                if ((prop === 'quanShuComm' || prop === 'qiYuanComm' ) && propValue) {
                    x.allProps.map((y, index) => {
                        if (index === 0) {
                            copyFormDataStep1[y] = propValue.value;
                        }
                    });
                    delete copyFormDataStep1[prop];
                }
            });
            let v = await getZhuiJiaXianE(Object.assign({}, copyFormDataStep1, data));
            this.yuCunList = {
                list: v.content,
                total: v.totalElements
            };
        }
    },
    watch: {
        formDataStep1: {
            handler: function (value, oldValue) {
                if (JSON.stringify(value) === JSON.stringify(oldValue)) {
                    return;
                }
                // this.$refs.xcyForm.resetFields();
                this.init();
                this.searchZhuiJiaXianE();
            }
        }
    }
};
</script>

<template>
  <div>
    <div class="group-title">第一步 选择限额(包括省备用限额的权属、起源和追加编限单位,追加完成后，省备用相应指标进行相应扣减)</div>

    <xcy-form
      ref="xcyForm"
      :config="formConfigStep1"
      :data="formDataStep1"
      @input="handleUpdateStep1"
    />

    <div class="group-title">输入追加限额</div>
    <div class="zhui-jia-input">
      <el-form label-width="46px" label-position="left">
        <el-form-item label="文号:">
          <wen-hao-comm v-bind="commBind" @change="wenHaoChange" />
        </el-form-item>
      </el-form>

      <el-form :model="form">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="分类">
            <template slot-scope="scope">
              <div v-if="scope.$index===0" style="color:red">可用限额</div>
              <div v-if="scope.$index===1">追加限额</div>
            </template>
          </el-table-column>
          <el-table-column label="商品林">
            <el-table-column prop="ssplHeji" label="合计">
              <template slot-scope="scope">
                <el-input disabled v-model="splHeji" v-if="scope.$index===1"></el-input>
                <div v-if="scope.$index!==1">{{scope.row.sSplHj}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="ssplZf" label="主伐">
              <template slot-scope="scope">
                <el-input v-model="form.splZf" v-if="scope.$index===1"></el-input>
                <div v-if="scope.$index!==1">{{scope.row.ssplZf}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="ssplFycf" label="抚育采伐">
              <template slot-scope="scope">
                <el-input v-model="form.splFyf" v-if="scope.$index===1"></el-input>
                <div v-if="scope.$index!==1">{{scope.row.ssplFycf}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="ssplDg" label="低产林改造">
              <template slot-scope="scope">
                <el-input v-model="form.splDg" v-if="scope.$index===1"></el-input>
                <div v-if="scope.$index!==1">{{scope.row.ssplDg}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="ssplQtcf" label="其他采伐">
              <template slot-scope="scope">
                <el-input v-model="form.splQtcf" v-if="scope.$index===1"></el-input>
                <div v-if="scope.$index!==1">{{scope.row.ssplQtcf}}</div>
              </template>
            </el-table-column>
          </el-table-column>

          <el-table-column label="生态公益林">
            <el-table-column prop="gylHeji" label="合计">
              <template slot-scope="scope">
                <el-input disabled v-model="gylHeji" v-if="scope.$index===1"></el-input>
                <div v-if="scope.$index!==1">{{scope.row.sGylHj}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="sgylGxcf" label="更新采伐">
              <template slot-scope="scope">
                <el-input v-model="form.gylGxcf" v-if="scope.$index===1"></el-input>
                <div v-if="scope.$index!==1">{{scope.row.sgylGxcf}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="sgylFycf" label="抚育采伐">
              <template slot-scope="scope">
                <el-input v-model="form.gylFycf" v-if="scope.$index===1"></el-input>
                <div v-if="scope.$index!==1">{{scope.row.sgylFycf}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="sgylDgcf" label="低产林改造">
              <template slot-scope="scope">
                <el-input v-model="form.gylDg" v-if="scope.$index===1"></el-input>
                <div v-if="scope.$index!==1">{{scope.row.sgylDgcf}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="sgylQtcf" label="其他采伐">
              <template slot-scope="scope">
                <el-input v-model="form.gylQtcf" v-if="scope.$index===1"></el-input>
                <div v-if="scope.$index!==1">{{scope.row.sgylQtcf}}</div>
              </template>
            </el-table-column>
          </el-table-column>

          <el-table-column prop="sMaoZhu" label="毛竹">
            <template slot-scope="scope">
              <el-input v-model="form.maoZhu" v-if="scope.$index===1"></el-input>
              <div v-if="scope.$index!==1">{{scope.row.smaoZhu}}</div>
            </template>
          </el-table-column>
        </el-table>
      </el-form>

      <div style="text-align:center;margin:20px 0">
        <el-button type="primary" size="mini" @click="addXianE">预存限额</el-button>
      </div>

      <div class="group-title">{{this.formDataStep1.nianFen}}年单位追加预存限额</div>
      <div class="table-title">单位: 立方米、株</div>
          <xcy-list
        :data="yuCunList"
        :props="zhuiJiaListProps"
        :pagerInfo="pagerInfo"
        @action="handleAction"
        @updatePagerInfo="updatePagerInfo"
        :hasPager="true"
      />
      <div></div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.container {
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #e6e6e6;
  overflow-y: scroll;
}

.group-title {
  color: #88b780;
  margin: 20px 0;
}

.zhui-jia-input {
  margin: 10px 0 10px 0px;
}
.table-title {
  text-align: right;
  margin-bottom: 4px;
  font-size: 12px;
}
</style>
