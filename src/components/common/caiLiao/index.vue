<template>
  <div class="main">
    <el-table :data="tableData" style="width:100%" border>
      <el-table-column align="center" prop="caiLiaoLeiBie" label="材料类别"></el-table-column>
      <el-table-column align="center" prop="caiLiaoMingXi" label="材料明细"></el-table-column>
      <el-table-column align="center" label="附件上传">
        <template slot-scope="scope" >
          <el-upload
            v-if="!prop.seeFile"
            class="upload-demo"
            :action="fuJianUrl"
            :file-list="scope.row.fileList"
            :data="cLdata"
            :headers="uploadHeader"
            :before-upload="upFn"
            :on-success="successFn"
            :before-remove="deleBeforeFn"
            :on-preview="clickUpFile"
          >
            <el-button size="mini" type="primary" @click="handleSave(scope.$index, scope.row)">上传</el-button>
          </el-upload>
          <div v-text="scope.row.fileName" v-if="prop.seeFile"></div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getCaiLiao, deleteCaiLiao } from './api';
import Storage from '@/common/storage';
import { cloneDeep } from 'lodash';
import axios from 'axios';
export default {
    name: 'XLingZu',
    props: {
        value: {
            type: Array,
            default() {
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
            tableData: [],
            cLdata: {
                projId: '',
                file: '',
                attrName: '',
                xzCode: '',
                caiLiaoGuid: '',
                caiLiaoMingXi: ''
            },
            fuJianUrl: `${process.env.VUE_APP_BASE_API}/api/v1/fujian`,
            // 附件请求头
            uploadHeader: {
                Authorization: Storage.get('jwt')
            },
            isUnique: false
        };
    },
    methods: {
        async init() {
            if (!this.data.shiXiangJbm) {return;}
            let v = await getCaiLiao({shiXiangJbm: this.data.shiXiangJbm});
            this.tableData = v.content;
            if (!this.cLdata.projId) {
                this.cLdata.projId = this.prop.uuid;
            }
            if (!this.prop.uuid) { throw new Error('附件上传未找到uuid---  caiLiao 75 '); }
        },
        // 上传之前
        upFn(file) {
            this.cLdata.file = file.name;
        },
        clickUpFile(file) {
            let urlStr = '';
            urlStr = `${process.env.VUE_APP_BASE_API}/${file.response.data.fileUrl}`;
            axios.get(
                urlStr,
                {
                    headers: {
                        Authorization: Storage.get('jwt')
                    },
                    responseType: 'blob'
                }
            ).then(x=>{
                const blob = new Blob([x.data], { type: 'application/vnd.ms-excel'});
                const downloadElement = document.createElement('a');
                const href = window.URL.createObjectURL(blob);
                downloadElement.href = href;
                downloadElement.download = file.name;
                document.body.appendChild(downloadElement);
                downloadElement.click();
                document.body.removeChild(downloadElement); // 下载完成移除元素
                window.URL.revokeObjectURL(href); // 释放掉blob对象
            }).catch(x=>{
                console.error(x);
            });
        },
        handleSave(index, v) {
            let xzCode = Storage.get('userInfo').xzCode;
            let copyData = cloneDeep(this.cLdata);
            copyData.attrName = v.caiLiaoLeiBie;
            copyData.xzCode = xzCode;
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
            let v = await deleteCaiLiao({uuid: file.response.data.uuid});
            if (v) {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }
        },
        // 回显还需要修改时候
        editFuJian(data) {
            let copyTableData = cloneDeep(this.tableData);
            copyTableData.map((item, index)=>{
                let arr = [];
                if (data instanceof Array) {
                    data.map(x=>{
                        if (item.guid === x.caiLiaoGuid) {
                            arr.push({name: x.filename, response: {data: {fileUrl: x.fileurl, uuid: x.uuid} }});
                        }
                    });
                }
                copyTableData[index].fileList = arr;
            });
            return copyTableData;
        }
    },
    async created() {
        this.init();
    },
    watch: {
        'value': function (value) {
            let data = this.editFuJian(value);
            this.tableData = data;
        },
        'data.shiXiangJbm': async function (value) {
            if (this.value && this.value.length && this.prop.seeFile) {return;}
            let v = await getCaiLiao({shiXiangJbm: value});
            this.tableData = v.content;
        },
        'data.projid': {
            handler: function (value) {
                if (!value) {return;}
                let copyCldata = cloneDeep(this.cLdata);
                copyCldata.projId = value;
                this.cLdata = copyCldata;
            },
            immediate: true
        }
    }
};
</script>
<style scoped>
</style>
