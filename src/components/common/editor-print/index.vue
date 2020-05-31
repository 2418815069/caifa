<template>
  <div class="main">
    <el-dialog
      :close-on-click-modal="false"
      class="not-print print-dialog"
      :visible.sync="dialogShow"
      :fullscreen="true"
    >
      <div style="height:100%">
        <div style="height:100%">
          <div class="button-box">
            <el-button size="mini" type="primary" @click="saveTongZhiShu">保存</el-button>
            <el-button size="mini" type="primary" @click="previewClick">打印预览</el-button>
            <el-button size="mini" type="primary" @click="printClick">打印</el-button>
          </div>
          <div class="button-box-footer" :style="boxFooter">
            <div class="ueditor-box" :style="ueditorBox">
              <vueUeditorWrap @ready="ready" v-model="content" :config="myConfig"></vueUeditorWrap>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash';
import vueUeditorWrap from 'vue-ueditor-wrap';
import { saveTongZhiShuHtml } from './api';
export default {
    name: 'xUEPrint',
    props: {
        value: {
            type: [String, Number],
            default: ''
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
            content: cloneDeep(this.value),
            dialogShow: false,
            editor: null,
            url: '',
            guid: '',
            myConfig: {
                // 编辑器不自动被内容撑高
                autoHeightEnabled: false,
                // 初始容器高度
                initialFrameHeight: '600',
                // 初始容器宽度
                initialFrameWidth: '100%',
                UEDITOR_HOME_URL: './UEditor/',
                serverUrl: ''
            },
            boxFooter: {
                'margin': '0 30px',
                'border-left': '1px solid skyblue',
                'border-right': '1px solid skyblue',
                'border-bottom': '1px solid skyblue',
                // self.innerHeight
                'height': '800px'
            },
            ueditorBox: {
                width: '650px',
                height: '800px',
                margin: '0 auto'
            }
        };
    },
    components: {
        vueUeditorWrap
    },
    mounted() {},
    computed: {},
    methods: {
        previewClick() {
            this.editor.execCommand('preview');
        },
        printClick() {
            this.editor.execCommand('print');
        },
        ready(editorInstance) {
            this.editor = editorInstance;
        },
        // 使用 this.$refs.setDialogShow 触发显示
        setDialogShow() {
            this.dialogShow = true;
        },
        setSaveTongZhiShu(url, guid) {
            this.url = url;
            this.guid = guid;
        },
        getUeDitorContentTxt() {
            return this.editor.getContentTxt();
        },
        getAllHtml() {
            return this.editor.getAllHtml();
        },
        getPlainTxt() {
            var arr = [];
            arr.push(
                '使用editor.getPlainTxt()方法可以获得编辑器的带格式的纯文本内容'
            );
            arr.push('内容为：');
            arr.push(this.editor.getPlainTxt());
            return arr.join('\n');
        },
        async saveTongZhiShu() {
            if (!this.url || !this.guid) {
                console.error('找不到url或者guid  editor-print.vue 86---');
            }
            this.$confirm('是否保存当前文本', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(async () => {
                    console.log(this.content);
                    let v = await saveTongZhiShuHtml(
                        this.url,
                        this.guid,
                        JSON.stringify(this.content)
                    );
                    if (v.code === 200) {
                        this.$message({
                            type: 'success',
                            message: v.message || '操作成功'
                        });
                    }
                })
                .catch(() => {});
        },
        insertHtml(value) {
            setTimeout(() => {
                this.editor.execCommand('insertHtml', value);
            }, 500);
        }
    },
    beforeDestroy() {
        this.editor.destroy();
    },
    watch: {
        content: function (value) {
            this.$emit('input', value);
            this.$emit('change', value);
        },
        value: function (value) {
            this.content = value;
        }
    }
};
</script>
<style lang="stylus">
.print-dialog .el-dialog__body {
  padding: 20px 0;
}

.print-dialog .edui-editor-breadcrumb {
  display: none;
}
</style>
<style scoped>
.main {
  width: 100%;
}
.button-box {
  text-align: center;
  padding: 5px 0;
  border: 1px solid skyblue;
  margin: 0 30px;
}
.button-box-footer{
      margin: 0 30px;
    border-left:  1px solid skyblue;
    border-right:  1px solid skyblue;
    border-bottom:  1px solid skyblue;
}
</style>
