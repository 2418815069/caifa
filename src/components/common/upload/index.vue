<template>
  <div class="main">
          <el-upload
            class="upload-demo"
            :action="fuJianUrl"
            :file-list="fileList"
            :data="cLdata"
            :headers="uploadHeader"
            :before-upload="upFn"
            :on-success="successFn"
            :before-remove="deleBeforeFn"
            :on-remove="deleRemoveFn"
          >
            <el-button size="mini" type="primary" @click="handleSave()">上传</el-button>
          <span :style="prop.endStyle?prop.endStyle:'color:red;'" v-text="prop.endText"></span>
          </el-upload>
  </div>
</template>

<script>
import {deleteCaiLiao } from './api';
import Storage from '@/common/storage';
import { cloneDeep } from 'lodash';
export default {
    name: 'XupLoad',
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
            fileList: [],
            fuJianUrl: `${process.env.VUE_APP_BASE_API}/api/v1/fujian`,
            // 附件请求头
            uploadHeader: {
                Authorization: Storage.get('jwt')
            }
        };
    },
    methods: {
        // 上传之前
        upFn(file) {
            this.cLdata.file = file.name;
        },
        handleSave() {
            let xzCode = Storage.get('userInfo').xzCode;
            let copyData = cloneDeep(this.cLdata);
            // copyData.attrName = v.caiLiaoLeiBie;
            copyData.xzCode = xzCode;
            // copyData.caiLiaoGuid = v.guid;
            // copyData.caiLiaoMingXi = v.caiLiaoMingXi;
            this.cLdata = copyData;
        },
        successFn(response, file, fileList) {
            if (response.code === 200) {
                this.$message({
                    type: 'success',
                    message: '上传成功'
                });
                this.fileList = fileList;
                this.$emit('input', fileList);
                this.$emit('change', fileList);
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
        async deleRemoveFn(file, fileList) {
            this.fileList = fileList;
            this.$emit('input', fileList);
            this.$emit('change', fileList);
        }
    },
    async created() {
    }
};
</script>
<style scoped>
</style>
