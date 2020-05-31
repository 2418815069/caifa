<script>
import { filterConfig, listPropsConfig } from './config';
import {postHuiShou, getCaiFaXianEList } from './api';
import wenHaoComm from '@/components/common/wenHao';
import Storage from '@/common/storage';
export default {
    data() {
        const userInfo = Storage.get('userInfo') || {};
        return {
            listConfig: {
                hasSelection: true
            },
            filterConfig,
            filterData: {
                nianFen: new Date().getFullYear(),
                bianXianBm: userInfo.xzCode,
                page: 1,
                size: 10
            },
            nianFen: new Date().getFullYear(),
            listPropsConfig,
            listData: {
                list: [],
                total: 0
            },
            pagerInfo: {
                pageSize: 10,
                pageNo: 1
            },
            tableData: [],
            form: {},
            wenHao: '',
            guid: '',
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
    components: {
        wenHaoComm
    },
    computed: {
        splHeji: function () {
            const form = this.form;
            return (Number(form.splDg) + Number(form.splFyf) + Number(form.splQtcf) + Number(form.splZf)).toFixed(2);
        },
        gylHeji: function () {
            const form = this.form;
            return (Number(form.gylDg) + Number(form.gylFycf) + Number(form.gylGxcf) + Number(form.gylQtcf)).toFixed(2);
        }
    },
    async created() {
        this.search();
    },
    mounted() {

    },
    methods: {
        // 查询
        async  search(data) {
            let v = await getCaiFaXianEList(Object.assign({}, this.filterData, data));
            this.listData = {
                list: v.content,
                total: v.totalElements
            };
            this.nianFen = this.filterData.nianFen;
        },
        // 查询项变化
        async updateForm(data) {
            this.filterData = data;
        },
        // 分页触发
        updatePagerInfo(pageInfo) {
            let obj = {
                page: pageInfo.pageNo,
                size: pageInfo.pageSize
            };
            this.search(obj);
        },
        wenHaoChange(value) {
            this.wenHao = value;
        },
        actionClick(data) {
            if (data.action === 'huiShou') {
                // "wenHao": "--------",
                // 要回收的参数
                let obj = {
                    gylDg: data.data.sgylDgcf,
                    gylFycf: data.data.sgylFycf,
                    gylGxcf: data.data.sgylGxcf,
                    gylQtcf: data.data.sgylQtcf,
                    maoZhu: data.data.smaoZhu,
                    splDg: data.data.ssplDg,
                    splFyf: data.data.ssplFycf,
                    splQtcf: data.data.ssplQtcf,
                    splZf: data.data.ssplZf
                };
                this.form = obj;
                this.guid = data.data.guid;
                this.tableData = [data.data, this.form];
            }
        },
        // 回收按钮
        async huiShouClick() {
            if (!this.wenHao) {
                alert('请选择文号');
                return;
            }
            let v = await postHuiShou(Object.assign(this.form, {wenHao: this.wenHao}, {guid: this.guid}));
            if (v.code === 200) {
                this.$message({
                    type: 'success',
                    message: v.message
                });
                this.form = {};
                this.tableData = [];
                let res = await getCaiFaXianEList({nianFen: this.filterData.nianFen, bianXianBm: this.filterData.bianXianBm});
                this.listData = {
                    list: res.content,
                    total: res.totalElements
                };
            }
        }
    },
    watch: {
        filterData: {
            handler: async function (value, oldValue) {
                if (JSON.stringify(value) === JSON.stringify(oldValue)) {
                    return;
                }
                this.search();
            },
            deep: true
        }
    }
};
</script>

<template>
    <div>
        <div class="title-bck">第一步  选择单位</div>
        <xcy-form
            :config="filterConfig"
            :data="filterData"
            @input="updateForm"
        />
        <div class="title-bck">第二步  选择要收回的项</div>
        <div class="title-bck2">{{nianFen}}年编限单位已分配限额</div>
        <div class="table-title">单位: 立方米、株</div>
        <xcy-list
            :data="listData"
            :props="listPropsConfig"
            :pagerInfo="pagerInfo"
            :hasPager="true"
            @action="actionClick"
            @updatePagerInfo="updatePagerInfo"
        />
        <div class="title-bck2">第三部  收回限额</div>
        <div class="zhui-jia-input">
      <el-form label-width="46px" label-position="left">
        <el-form-item label="文号:">
          <wen-hao-comm v-bind="commBind" @change="wenHaoChange" />
        </el-form-item>
      </el-form>

<div class="table-title">单位: 立方米、株</div>
      <el-form :model="form">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column align="center" label="单位">
            <template slot-scope="scope">
              <div>{{scope.row.bianXianMc}}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="权属">
            <template slot-scope="scope">
              <div>{{scope.row.quanShuMc}}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="起源">
            <template slot-scope="scope">
              <div>{{scope.row.qiYuanMc}}</div>
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

          <el-table-column align="center" label="生态公益林">
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

          <el-table-column align="center" prop="sMaoZhu" label="毛竹">
            <template slot-scope="scope">
              <el-input v-model="form.maoZhu" v-if="scope.$index===1"></el-input>
              <div v-if="scope.$index!==1">{{scope.row.smaoZhu}}</div>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    <div style="text-align:center">
      <el-button size="small" type="primary" @click="huiShouClick">收回限额</el-button>
    </div>
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


.table-title {
  text-align: right;
  margin-bottom: 4px;
  font-size: 12px;
}
</style>
