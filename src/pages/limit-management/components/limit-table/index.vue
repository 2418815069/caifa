<template>
  <div class="main">
    <el-table
        :data="tableData"
        :border="true"
        style="width: 100%">
        <el-table-column
            align="center"
            v-for="(colum, key) in colums"
            :key="key"
            :prop="colum.prop"
            :label="colum.label"
            :width="colum.width">
            <template slot-scope="scope">
                <el-input v-model="scope.row[colum.prop]" placeholder="请输入内容"></el-input>
            </template>
        </el-table-column>
        <el-table-column
            align="center"
            prop="all"
            label="合计">
            <template slot-scope="scope">
               <span>
                   {{getAll(scope.row)}}
               </span>
            </template>
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash';
export default {
    name: 'XlimitTabel',
    props: {
        value: {
            type: [Array],
            default: () => {
                return null;
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
        let copyValue = cloneDeep(this.value);
        return {
            tableData: copyValue || [{}],
            colums: this.prop.colums || []
        };
    },
    watch: {
        tableData: {
            handler(value) {
                this.$emit('input', value);
                this.$emit('change', value);
            },
            deep: true
        }
    },
    methods: {
        getAll(datas) {
            if (JSON.stringify(datas) === '{}') {return;}
            /* eslint-disable*/
            return Object.values(datas).reduce((oVal, val ) => {
                let num=oVal + Number(val)
                if(String(num).includes('.')){
                    return (Number(oVal) + Number(val)).toFixed(2);
                }else{
                    return (Number(oVal) + Number(val));
                }
                
            }, 0);
            /* eslint-enable*/
        }
    },
    async created() {
    }
};
</script>

<style scoped>
</style>
