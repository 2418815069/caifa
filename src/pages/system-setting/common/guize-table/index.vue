<template>
  <div class="container">
    <div>
      <div style="color:red">{{prop.title}}<el-button type="primary" size="mini" @click="addTiaoJian()">增加</el-button></div>
      <el-table :data="list" width="100%" border>
        <el-table-column label="序号" type="index"/>
        <el-table-column label="验证项">
          <template slot-scope="scope">
            <el-select v-model="scope.row.field">
            <el-option v-for="option in yanZhengXiangOptions" :value="option.value" :label="option.label" :key="option.value"/>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column width="100" label="表达式">
           <template slot-scope="scope">
            <el-select v-model="scope.row.express">
              <el-option value="等于">等于</el-option>
              <el-option value="大于">大于</el-option>
              <el-option value="小于">小于</el-option>
              <el-option value="大于等于">大于等于</el-option>
              <el-option value="小于等于">小于等于</el-option>
              <el-option value="不等于">不等于</el-option>
              <el-option value="包含">包含</el-option>
            </el-select>
          </template>
        </el-table-column>
          <el-table-column prop="name" label="值" width="150">
             <template slot-scope="scope">
            <el-input v-model="scope.row.value"/>
          </template>
          </el-table-column>
          <el-table-column prop="name" label="关系" width="150">
            <template slot-scope="scope">
             <el-select v-model="scope.row.join">
              <el-option value="and" label="并且"></el-option>
              <el-option value="or" label="或者"></el-option>
            </el-select>
          </template>
          </el-table-column>
        <el-table-column  label="编辑" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="deleteTiaoJian(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {getYanzhengXiangOptions} from './api';

export default {
    name: 'XguiZeTable',
    props: {
        value: {
            type: [Array],
            default() {
                return [{id: 1}];
            }
        },
        data: {
            type: Object,
            default() {
                return {};
            }
        },
        prop: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data() {
        return {
            list: this.value,
            yanZhengXiangOptions: []
        };
    },
    created() {
        this.initOptions();
    },
    mounted() {
    },
    methods: {
        async initOptions() {
            this.yanZhengXiangOptions = await getYanzhengXiangOptions();
        },
        addTiaoJian() {
            this.list.push({id: this.list[this.list.length - 1].id + 1});
        },
        deleteTiaoJian(index) {
            this.list.splice(index, 1);
        }
    },
    computed: {
    },
    watch: {
        list: {
            handler: function (value) {
                this.$emit('input', value);
                this.$emit('change', value);
            },
            deep: true
        }
    }
};
</script>
<style scoped lang='stylus'>
.container
  width 100%
</style>
