<script>
import {
    yuCunApi,
    getyuCunListApi,
    deleYuCunApi,
    editYuCunApi,
    jiChengXianEApi
} from './api';
import Storage from '@/common/storage';
import {
    addFormConfig,
    editFormConfig,
    danWeiComm,
    daoRuConfig,
    JiChengConfig,
    formList,
    jiChengformList
} from './config';
import { cloneDeep } from 'lodash';
export default {
    data() {
        return {
            isAdd: true,
            nianFen: new Date().getFullYear(),
            // 没有实际操作用于展示当前查询的年份
            tableNianFen: new Date().getFullYear(),
            // 用于编辑和新增切换
            formConfig: [],
            addFormConfig,
            editFormConfig,
            // 年份
            yearArr: this.getYearArr(),
            // 查询预存限额参数
            query: {
                nianFen: new Date().getFullYear(),
                bianXianBm: Storage.get('userInfo').xzCode,
                page: 1,
                size: 10
            },
            danWeiBind: {
                prop: {
                    guiKouShow: false
                }
            },
            // 预存限额的数据
            yuCunList: {
                list: [],
                total: 20
            },
            // 弹窗相关 （编辑 新增）
            dialogShow: false,
            // 修改与新增弹窗数据   修改数据无(年份 文号 单位不可修改)
            formData: {},
            // 继承相关
            jiChengDialogShow: false,
            jiChengformList,
            needHasSelectionConfig: {
                hasSelection: true
            },
            jiChengnianFen: new Date().getFullYear(),
            jiChengYearArr: this.getYearArr(),
            JiChengConfig,
            JiChengFormData: {
                nianFen: new Date().getFullYear(),
                bianXianBm: Storage.get('userInfo').xzCode,
                isJiCheng:1,
                page: 1,
                size: 10
            },
            jiChengYuCunList: {
                list: [],
                total: 0
            },

            // 限额导入
            daoRuConfig,
            daoRuData: {
                nianFen: '',
                wenHao: ''
            },
            xianEDaoRuDialog: false,
            uploadUrl: `${process.env.VUE_APP_BASE_API}/api/v1/xianegc/daoru`,
            uploadData: {
                nianFen: '',
                wenHao: ''
            },
            uploadHeader: {
                Authorization: Storage.get('jwt')
            },
            pagerInfo: {
                pageSize: 10,
                pageNo: 1
            },
            formList,
            downloadMoBan: 'https://caifazhengchaxun.oss-cn-beijing.aliyuncs.com/moban.zip'
        };
    },
    components: {
        danWeiComm
    },
    async created() {
        this.getyuCunList();
    },
    computed: {},
    methods: {
    // 查询按钮
        async searchYuCun() {

            this.getyuCunList();
            // 给表格展示的年份赋值
            this.tableNianFen = this.query.nianFen;
        },
        //
        updatePagerInfo(data) {
            let obj = {
                page: data.pageNo,
                size: data.pageSize
            };
            this.getyuCunList(Object.assign({}, this.query, obj));
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
                case 'editXianE':
                    this.editXianE(data);
                    break;
                case 'deleYuCunApi':
                    this.deleYuCunApi(data);
                    break;
            }
        },
        // 打开新增弹窗
        addXianE() {
            this.dialogShow = true;
            this.isAdd = true;
            this.formConfig = this.addFormConfig;
            // 需要用到弹窗部分请先空数据 避免修改与新增数据混乱问题
            this.formData = {
                nianFen: new Date().getFullYear()
            };
        },
        // 打开编辑弹窗
        editXianE(data) {
            if (this.query.nianFen >= new Date().getFullYear()) {
                this.dialogShow = true;
                this.isAdd = false;
                this.formConfig = this.editFormConfig;
                // 编辑数据回显
                this.formData = this.editDataInit(data);
            } else {
                this.$message({
                    type: 'error',
                    message: '只能修改当年及之后年的限额'
                });
            }
        },
        // 继承查询条件变化
        handleJiCheng(data) {
            this.JiChengFormData = data;
        },
        // 继承弹窗
        async jiChengXianE() {
            this.jiChengDialogShow = true;
            // 继承限额相关数据
            this.jiChengQuery();
        },
        // 继承查询
        async jiChengQuery(data) {
            let v = await getyuCunListApi(
                Object.assign({}, this.JiChengFormData, data)
            );
            this.jiChengYuCunList = {
                list: v.content,
                total: v.totalElements
            };
        },
        onJiChengSelected() {

        },
        // 继承限额
        async jiChengSave() {
            const arr = this.$refs.jiChengTable.selection;
            if (!arr.length) {
                return;
            }
            let obj = {
                nianFen: this.nianFen,
                wenHao: this.nianFen,
                guids: []
            };
            arr.map(x => {
                obj.guids.push(x.guid);
            });
            let v = await jiChengXianEApi(obj);
            if (v.code === 200) {
                this.$message({
                    type: 'success',
                    message: v.message
                });
                // 关闭弹窗
                this.jiChengDialogShow = false;
                // 修改从新查询预存限额列表
                this.getyuCunList();
            }
        },
        // 确定按钮（编辑和新增）
        async saveApply() {
            let copyFormData = cloneDeep(this.formData);
            // 格式化要提交数据
            this.$refs.addForm.validate(async valid => {
                if (valid) {
                    this.formConfig.map(x => {
                        const prop = x.prop || '';
                        if (prop) {
                            // 起源 权属
                            if (prop === 'qiYuanX' || prop === 'quanShuX') {
                                x.allProps.map((y, index) => {
                                    if (index === 0) {
                                        copyFormData[y] = copyFormData[prop].value;
                                    }
                                    if (index === 1) {
                                        copyFormData[y] = copyFormData[prop].label;
                                    }
                                });
                            }

                            // 商品林 公益林
                            if (prop === 'splTable' || prop === 'gylTable') {
                                x.colums.map(y => {
                                    if (copyFormData[prop]) {
                                        copyFormData[y.prop] = Number(
                                            copyFormData[prop][0][y.prop]
                                        );
                                    }
                                });
                            }
                            // 单位（认为有单位字段为新增否则为编辑）
                            if (prop === 'danWei') {
                                const danWeiValue = copyFormData[prop];
                                if (danWeiValue) {
                                    copyFormData.shiBm = danWeiValue.value.substr(0, 4);
                                    copyFormData.xianBm = danWeiValue.value.substr(0, 6);
                                    copyFormData.bianXianBm = danWeiValue.value.substr(0, 10);
                                    copyFormData.bianXianMc = danWeiValue.label[2];
                                }
                            }
                            // 毛竹
                            if (copyFormData.maoZhu) {
                                copyFormData.maoZhu = Number(copyFormData.maoZhu);
                            }
                        }
                    });

                    // 新增
                    if (this.isAdd) {
                    // 调用新增函数
                        this.addSave(copyFormData);
                    }
                }

                // 根据编辑还是新增做不同的事情(新增Api 编辑Api 新增时候添加必填项限制)


                // 编辑
                if (!this.isAdd) {
                    // 过滤无用数据
                    Object.keys(copyFormData).map(x => {
                        // guid为唯一标识
                        let arr = [
                            'guid',
                            'quanShu',
                            'quanShuMc',
                            'qiYuan',
                            'qiYuanMc',
                            'gylFycf',
                            'gylGxcf',
                            'gylQtcf',
                            'gylDg',
                            'splZf',
                            'splFyf',
                            'splQtcf',
                            'splDg',
                            'maoZhu'
                        ];
                        if (!arr.includes(x)) {
                            delete copyFormData[x];
                        }
                    });
                    // 验证修改数据
                    let isYanzheng = false;
                    let yanZhengArr = [
                        'gylDg',
                        'gylFycf',
                        'gylQtcf',
                        'maoZhu',
                        'splDg',
                        'splZf',
                        'splQtcf',
                        'gylDg'
                    ];
                    for (let i = 0; i < yanZhengArr.length; i++) {
                        const element = copyFormData[yanZhengArr[i]];
                        if (element > 0) {
                            isYanzheng = true;
                            break;
                        }
                    }
                    if (!isYanzheng) {
                        this.$message({
                            type: 'error',
                            message: '请输入正确数据'
                        });
                        return;
                    }

                    // 修改预存限额
                    let v = await editYuCunApi(copyFormData);
                    if (v.code === 200) {
                        this.$message({
                            type: 'success',
                            message: v.message
                        });
                        // 关闭弹窗
                        this.dialogShow = false;
                        // 修改从新查询预存限额列表
                        this.getyuCunList();
                    }
                }
            });
        },
        handleUpdateByDaoRu(data) {
            this.daoRuData = data;
        },
        // 上传之前
        uploadBefore() {
            let msg = '';
            if (!this.daoRuData.nianFen) {
                msg = '导入年份不能为空';
            }
            if (!this.daoRuData.wenHao) {
                msg = '导入文号不能为空';
            }
            if (msg) {
                this.$message({
                    type: 'error',
                    message: msg
                });
                return false;
            }
            return true;
        },
        // 上传成功后
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
                // 新增成功从新查询预存限额列表
                this.getyuCunList();
            }
            this.uploadData = {};
            this.xianEDaoRuDialog = false;
        },
        // 上传按钮
        uploadClick() {
            this.uploadData = {
                nianFen: this.daoRuData.nianFen,
                wenHao: this.daoRuData.wenHao
            };
            this.uploadHeader = {
                Authorization: Storage.get('jwt')
            };
        },
        // 导入
        daoRuXianE() {
            this.xianEDaoRuDialog = true;
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
            let isYanzheng = false;
            let yanZhengArr = [
                'gylDg',
                'gylFycf',
                'gylQtcf',
                'gylGxcf',
                'maoZhu',
                'splDg',
                'splZf',
                'splQtcf',
                'splFyf'
            ];
            for (let i = 0; i < yanZhengArr.length; i++) {
                const element = data[yanZhengArr[i]];
                if (Number(element) > 0) {
                    isYanzheng = true;
                    break;
                }
            }
            if (msg) {
                this.$notify({
                    title: '预存限额失败',
                    type: 'error',
                    message: msg
                });
                return;
            }
            if (!isYanzheng) {
                this.$notify({
                    title: '预存限额失败',
                    type: 'error',
                    message: '请输入正确采伐限额'
                });
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
                    'splZf'
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
                // 关闭弹窗
                this.dialogShow = false;
                // 新增成功从新查询预存限额列表
                this.getyuCunList();
            }
        },
        // 删除预存限额
        async deleYuCunApi(data) {
            if (this.query.nianFen < new Date().getFullYear()) {
                this.$message({
                    type: 'error',
                    message: '只能删除当年及之后年的限额'
                });
                return;
            }
            this.$confirm('确定要删除当前限额', '提示', {
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

        // 编辑弹窗数据初始化（需要编辑的数据）
        editDataInit(data) {
            // 给弹窗要编辑的默认数据(需要满足弹窗数据格式)
            let obj = {
                splTable: [{}],
                gylTable: [{}],
                qiYuanX: { value: '', label: '' },
                quanShuX: { value: '', label: '' }
            };
            this.formConfig.map(x => {
                const prop = x.prop;
                // 商品林 公益林 table
                if (prop === 'splTable' || prop === 'gylTable') {
                    x.colums.map(y => {
                        obj[prop][0][y.prop] = data[y.prop];
                    });
                }
                // 起源 权属
                if (prop === 'qiYuanX' || prop === 'quanShuX') {
                    x.allProps.map((y, index) => {
                        if (index === 0) {
                            obj[prop].value = data[y];
                        }
                        if (index === 1) {
                            obj[prop].label = data[y];
                        }
                    });
                }
            });
            return Object.assign(obj, data);
        },
        nianFenChange(value) {
            this.query.nianFen = value;
        },
        danWeiChange(value) {
            this.query.bianXianBm = value;
        },
        // 查询预存限额
        async getyuCunList(data) {
            let v = await getyuCunListApi(Object.assign({}, this.query, data));
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
    }
};
</script>

<template>
  <div>
    <div class="title-bck">预存限额</div>
    <div class="form-query">
      <el-row :gutter="20">
        <el-form ref="form" label-position="left" label-width="50px">
          <el-col :span="4">
            <el-form-item label="年份:">
              <el-select style="width:100px" v-model="nianFen" size="small" @change="nianFenChange">
                <el-option
                  v-for="(item,key) in yearArr"
                  :key="key"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位:">
              <dan-wei-comm v-bind="danWeiBind" @change="danWeiChange" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button type="primary" size="mini" @click="searchYuCun">查询</el-button>
              <el-button type="primary" size="mini" @click="addXianE">新增</el-button>
              <el-button type="primary" size="mini" @click="jiChengXianE">继承</el-button>
              <el-button type="primary" size="mini" @click="daoRuXianE">导入</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>

      <div class="title-bck">{{tableNianFen}}年编限单位预存限额</div>
      <div class="table-title" style="font-size: 12px;">单位: 立方米、株</div>
      <xcy-list
        :data="yuCunList"
        :props="formList"
        :pagerInfo="pagerInfo"
        @action="handleAction"
        @updatePagerInfo="updatePagerInfo"
        :hasPager="true"
      />
      <!-- 编辑 新增 -->
      <el-dialog  :close-on-click-modal="false" width="85%" :visible.sync="dialogShow" custom-class="store-limit-edit-dialog">
        <xcy-form
          v-if="dialogShow"
          ref="addForm"
          :config="formConfig"
          :data="formData"
          @input="handleUpdate"
        />
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogShow = false">取 消</el-button>
          <el-button type="primary" @click="saveApply">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 继承限额弹窗 -->
      <el-dialog
       :close-on-click-modal="false"
        width="85%"
        :visible.sync="jiChengDialogShow"
        custom-class="store-limit-edit-dialog"
      >
        <xcy-form-query
          v-if="jiChengDialogShow"
          ref="jiChengForm"
          :config="JiChengConfig"
          :data="JiChengFormData"
          @input="handleJiCheng"
          @query="jiChengQuery"
        />
        <div class="title-bck" style="margin:20px 0">所选年份采伐限额</div>
        <xcy-list
        ref="jiChengTable"
          style="padding-top: 20px"
          :data="jiChengYuCunList"
          :props="jiChengformList"
          :pagerInfo="pagerInfo"
          :config="needHasSelectionConfig"
          @updatePagerInfo="updatePagerInfoTOJiCheng"
          @selectionChange='onJiChengSelected'
          :hasPager="true"
        />
        <span slot="footer" class="dialog-footer">
          <el-button @click="jiChengDialogShow = false">取 消</el-button>
          <el-button type="primary" @click="jiChengSave">继承限额</el-button>
        </span>
      </el-dialog>
      <!-- <限额导入> -->
      <el-dialog
       :close-on-click-modal="false"
        width="50%"
        title="限额导入"
        :visible.sync="xianEDaoRuDialog"
        custom-class="store-limit-edit-dialog"
      >
        <xcy-form
          v-if="xianEDaoRuDialog"
          ref="daoRuForm"
          :config="daoRuConfig"
          :data="daoRuData"
          @input="handleUpdateByDaoRu"
        />
        <a
          :href="downloadMoBan"
          download="xianMoBan.zip"
          target="_blank"
        >☆☆限额模板样式及其说明☆☆</a>
        <el-upload
          class="upload-demo"
          :before-upload="uploadBefore"
          :action="uploadUrl"
          :on-success="uploadSuccess"
          :headers="uploadHeader"
          :data="uploadData"
          :show-file-list="false"
          multiple
          :limit="3"
        >
          <el-button size="small" type="primary" @click="uploadClick">导入限额</el-button>
        </el-upload>
      </el-dialog>
    </div>
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
