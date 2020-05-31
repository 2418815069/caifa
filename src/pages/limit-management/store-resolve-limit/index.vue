<script>
import { formConfigStep1, yuCunListProps } from './config';
import {
    getCaiFaXianEList,
    getZhuiJiaXianE,
    deleYuCunApi,
    fenJieXianE
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
                qiYuanComm: {value: '2'},
                page: 1,
                size: 10
            },
            wenHao: '',
            tableData: [],
            form: {
                qiYuan: 0,
                qiYuanMc: 0,
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
            yuCunListProps,
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
    },
    methods: {
        handleUpdateStep1(data) {
            this.formDataStep1 = data;
        },
        wenHaoChange(value) {
            this.wenHao = value;
        },
        updatePagerInfo(data) {
            let obj = {
                page: data.pageNo,
                size: data.pageSize
            };
            this.searchZhuiJiaXianE(obj);
        },
        // 删除
        deleYuCunApi(data) {
            this.$confirm('确定要删除当前限额', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let v = await deleYuCunApi({ guid: data.guid });
                if (v.code === 200) {
                    this.$message({
                        type: 'success',
                        message: v.message
                    });
                    // 删除成功从新查询预存限额列表
                    this.searchZhuiJiaXianE();
                }
            }).catch(() => {
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
                    if (this.formDataStep1.danWei && this.formDataStep1.danWei.value.length !== 12) {
                        alert('请选择归口单位');
                        return;
                    }
                    let isTrue = false;
                    let arr = [
                        'gylDg',
                        'gylFycf',
                        'gylGxcf',
                        'gylQtcf',
                        'maoZhu',
                        'splDg',
                        'splFyf',
                        'splQtcf',
                        'splZf'
                    ];
                    arr.map(x=>{
                        if (Number(this.form[x]) > 0) {
                            isTrue = true;
                        }
                    });
                    if (!isTrue) {
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
                        if (prop === 'danWei' && propValue) {
                            obj.shiBm = propValue.value.substr(0, 4);
                            obj.xianBm = propValue.value.substr(0, 6);
                            obj.bianXianBm = propValue.value.substr(0, 10);
                            obj.guiKouBm = propValue.value.substr(0, 12);
                            obj.bianXianMc = propValue.label[2];
                            obj.guiKouMc = propValue.label[3];
                        }
                    });
                    obj.wenHao = this.wenHao;
                    let v = await fenJieXianE(Object.assign(obj, this.form));
                    if (v.code === 200) {
                        this.$message({
                            type: 'success',
                            message: v.message
                        });
                        // 从新查询可用限额
                        this.init();
                        // 重新查询追加限额
                        this.searchZhuiJiaXianE();
                    }
                }
            });
        },
        async init() {
            let obj = {};
            this.formConfigStep1.map(x => {
                const prop = x.prop;
                const propValue = this.formDataStep1[prop];
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
                if (prop === 'qiYuanComm' || prop === 'quanShuComm') {
                    obj[x.allProps[0]] = propValue.value;
                }
            });
            let v = await getCaiFaXianEList(obj);
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
        // 查询追加限额
        async searchZhuiJiaXianE(data) {
            let copyFormDataStep1 = cloneDeep(this.formDataStep1);
            this.formConfigStep1.map(x => {
                const prop = x.prop;
                const propValue = this.formDataStep1[prop];
                if (prop === 'nianFen' && propValue) {
                    copyFormDataStep1[prop] = propValue;
                }
                if (prop === 'danWei' && propValue) {
                    copyFormDataStep1.bianXianBm = propValue.value.substr(0, 10);
                    if (propValue.value.length === 12) {
                        copyFormDataStep1.guiKouBm = propValue.value.substr(0, 12);
                    }
                    delete copyFormDataStep1[prop];
                }
                if (prop === 'quanShuComm' && propValue) {
                    delete copyFormDataStep1[prop];
                }
                if (prop === 'qiYuanComm' && propValue) {
                    delete copyFormDataStep1[prop];
                }
            });
            let v = await getZhuiJiaXianE(Object.assign({}, copyFormDataStep1, data));
            this.yuCunList = {
                list: v.content,
                total: v.totalElements
            };
        },
        // 操作区回调
        handleAction({ action, data }) {
            switch (action) {
                case 'deleYuCunApi':
                    this.deleYuCunApi(data);
                    break;
            }
        }
    },
    watch: {
        formDataStep1: {
            handler: function (value, oldValue) {
                if (JSON.stringify(value) === JSON.stringify(oldValue)) {
                    return;
                }
                this.$refs.xcyForm.resetFields();
                if (value.danWei) {
                    this.init();
                }
                this.searchZhuiJiaXianE();
            }
        }
    }
};
</script>

<template>
  <div>
    <div class="group-title">第一步  选择限额</div>

    <xcy-form
      ref="xcyForm"
      :config="formConfigStep1"
      :data="formDataStep1"
      @input="handleUpdateStep1"
    />

    <div class="group-title">第二部  分解限额</div>
    <div class="zhui-jia-input">
      <el-form label-width="46px" label-position="left">
        <el-form-item label="文号:">
          <wen-hao-comm v-bind="commBind" @change="wenHaoChange" />
        </el-form-item>
      </el-form>

      <el-form :model="form">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            align="center"
           label="分类">
            <template slot-scope="scope">
              <div v-if="scope.$index===0" style="color:red">可用限额</div>
              <div v-if="scope.$index===1">分解限额</div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="商品林">
            <el-table-column align="center" label="合计">
              <template slot-scope="scope">
                <el-input disabled v-model="splHeji" v-if="scope.$index===1"></el-input>
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

          <el-table-column  align="center" label="生态公益林">
            <el-table-column align="center" label="合计">
              <template slot-scope="scope">
                <el-input disabled v-model="gylHeji" v-if="scope.$index===1"></el-input>
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

          <el-table-column align="center" label="毛竹">
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

      <div class="group-title">{{this.formDataStep1.nianFen}}年归口单位预存限额</div>
      <div class="table-title">单位: 立方米、株</div>
        <xcy-list
        :data="yuCunList"
        :props="yuCunListProps"
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
  margin: 10px 0;
}

.table-title {
  text-align: right;
  margin-bottom: 4px;
  font-size: 12px;
}
</style>
