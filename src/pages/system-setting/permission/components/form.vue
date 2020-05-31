<template>
  <el-container>
    <el-aside>
      <el-tree
        :default-expand-all='true'
        ref="tree"
        :data="menus"
        show-checkbox
        node-key="id"
        highlight-current
        :props="defaultProps">
      </el-tree>
    </el-aside>
    <el-main>
      <el-form
        :model="formData"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm">
        <el-form-item class="form-item" label="角色名称" prop="jiaoSeMc">
          <el-input class="w200" v-model="formData.jiaoSeMc"></el-input>
        </el-form-item>
        <el-form-item class="form-item" label="角色级别" prop="level">
          <el-select class="w200" v-model="formData.level" placeholder="请选择角色级别">
            <el-option label="省" value="省"></el-option>
            <el-option label="市" value="市"></el-option>
            <el-option label="县" value="县"></el-option>
            <el-option label="乡" value="乡"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form-item" label="描述" prop="jiaoSeMs">
          <el-input :autosize="{ minRows: 4, maxRows: 6}" class="w400" type="textarea" v-model="formData.jiaoSeMs"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button v-if="!isEdit" type="primary" @click="submitForm()">创建</el-button>
          <el-button v-if="isEdit" type="primary" @click="editForm()">修改</el-button>
          <el-button @click="resetForm()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import { getInternal } from './api';
import { cloneDeep } from 'lodash';
export default {
    props: {
        isEdit: {
            type: Boolean,
            default: false
        },
        record: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    mounted() {
        this.init();
    },
    data() {
        return {
            menus: [],
            formData: {
                jiaoSeMc: '',
                target: '',
                level: '',
                jiaoSeMs: ''
            },
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            rules: {
                jiaoSeMc: [
                    { required: true, message: '请输入角色名称', trigger: 'blur' }
                ],
                level: [
                    { required: true, message: '请选择角色级别', trigger: 'blur' }
                ],
                jiaoSeMs: [
                    { required: true, message: '请输入角色描述', trigger: 'blur' }
                ]
            }
        };
    },
    computed: {
    },
    async created() {
        let menus = await getInternal();
        let copyMenu = cloneDeep([menus]);
        menus = this.buildMenus(copyMenu);
        this.menus = menus;
    },
    methods: {
        init() {
            if (this.isEdit) {
                let copyRecord = cloneDeep(this.record);
                copyRecord.level = copyRecord.jiaoSeMc.slice(0, 1);
                copyRecord.jiaoSeMc = copyRecord.jiaoSeMc.slice(1, copyRecord.jiaoSeMc.length);
                this.formData = cloneDeep(copyRecord);
                this.$refs.tree.setCheckedKeys(this.formData.bms || []);
            } else {
                this.formData = {};
            }
        },
        buildMenus(menus) {
            for (let k in menus) {
                menus[k].id = menus[k].menuBm;
                menus[k].label = menus[k].menuMc;
                if (menus[k].children) {
                    this.buildMenus(menus[k].children);
                }
            }
            return menus;
        },
        submitForm() {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    const menu = this.$refs.tree.getCheckedNodes();
                    this.$emit('create', Object.assign({}, {menu}, this.formData));
                } else {
                    return false;
                }
                return true;
            });
        },
        editForm() {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    const menu = this.$refs.tree.getCheckedNodes();
                    this.$emit('edit', Object.assign({}, {menu}, this.formData));
                } else {
                    return false;
                }
                return true;
            });
        },
        setCheckedNodes(nodes = []) {
            this.$refs.tree.setCheckedNodes(nodes);
        },
        resetForm() {
            this.$refs.ruleForm.resetFields();
            this.formData = {};
            this.$emit('clear');
        }
    }
};
</script>
<style scoped>
  .el-header, .el-footer {
    border: 1px solid #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    width: 200px;
    border: 1px solid #D3DCE6;
    color: #333;
    text-align: center;
    padding: 15px;
    min-height: 500px;
  }

  .el-main {
    border: 1px solid #E9EEF3;
    border-left: 0;
    color: #333;
    text-align: center;
    line-height: 160px;
    padding: 30px 50px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .w200 {
    width: 200px;
  }
  .w400 {
    width: 400px;
  }
  .form-item {
    text-align: left
  }
</style>
