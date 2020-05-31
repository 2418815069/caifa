<!--
 * @Description: 公共基于table的组件
 * @Version: 2.0
 * @Autor: xiongchuanyu
 * @Date: 2019-06-22 14:14:49
 * @LastEditors: xiongchuanyu
 * @LastEditTime: 2019-07-20 22:23:28
 -->

<template>
  <div class="container">
    <el-button v-if="prop.showAddBtn" class="addBtn" type="primary" @click="handleAdd">添加</el-button>
    <el-table :data="list" element-loading-text="Loading" border v-if="forceUpdateTable">
      <el-table-column
        :width="tableProp.width|| '100'"
        :label="tableProp.label"
        :key="key"
        v-for="(tableProp, key) in tableProps"
        align="center"
      >
        <template slot-scope="scope">
          <el-form :model="scope.row" :rules="rules">
            <el-form-item prop="login">
              <!-- 常用五类  -->
              <el-input
                :disabled="prop.disabled"
                v-if="tableProp.type === 'input'"
                v-model="scope.row[tableProp.prop]"
                :placeholder="tableProp.placeholder"
              />
              <el-select
                :disabled="prop.disabled"
                filterable
                @change="tableProp.change(scope.row, tableProp.prop, tableProps, list, scope, setListData)"
                v-if="tableProp.type === 'select'"
                v-model="scope.row[tableProp.prop]"
                :placeholder="tableProp.placeholder"
              >
                <el-option
                  v-for="(item, key) in tableProp.options"
                  :key="key"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-autocomplete
                :disabled="prop.disabled"
                class="inline-block"
                v-if="tableProp.type === 'autocomplete'"
                v-model="scope.row[tableProp.prop]"
                :fetch-suggestions="tableProp.querySearch"
                placeholder="请输入"
              ></el-autocomplete>
              <span v-if="tableProp.type === 'text'">{{scope.row[tableProp.prop]}}</span>
              <el-button
                v-if="tableProp.type === 'button'"
                type="primary"
                @click="prop.btnEvent(scope,tableProp, list) || null"
              >{{scope.row[tableProp.prop]}}</el-button>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash';
export default {
    name: 'xTable',
    props: {
        value: {
            type: [Array],
            default() {
                // 默认给申请的数据
                return [];
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
    mounted() {
    },
    data() {
        return {
            forceUpdateTable: true,
            list: cloneDeep(this.value),
            tableProps: cloneDeep(this.prop.tableProps),
            rules: {}
        };
    },
    computed: {
    },
    methods: {
        handleAdd() {
            let copyList = cloneDeep(this.list);
            copyList.push({
                id: Math.random() + 1,
                caozuo: '删除'
            });
            this.list = copyList;
        },
        setTableProps(tableProps) {
            // 有卡顿先注释掉部分
            this.tableProps = tableProps;
            this.forceUpdateTable = false;
            this.$nextTick(() => { this.forceUpdateTable = true; });
        },
        setListData(list) {
            this.list = list;
        }
    },
    watch: {
        value: {
            handler(value) {
                // 如果数据完全相同就不用更新数据流，避免死循环(后台数据不能重复)
                if (JSON.stringify(this.list) === JSON.stringify(value)) { return; }
                this.list = value;
            },
            deep: true
        },
        list: {
            handler(value) {
                this.$emit('input', value);
                this.$emit('change', value);
            },
            deep: true
        },
        prop: {
            handler(value) {
                this.setTableProps(value.tableProps);
            },
            deep: true
        }
    }
};
</script>
<style scoped lang='stylus'>
.container
  width 100%
.addBtn
  margin-bottom 20px
  margin-top 20px
.inline-block
  display inline-block
</style>
