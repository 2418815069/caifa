<template>
  <div class="main">
        <vue-editor
            :disabled="prop.disabled"
            class="editor"
            id="xcy-editor"
            useCustomImageHandler
            :editor-toolbar="customToolbar"
            v-model="content">
        </vue-editor>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor';
import { cloneDeep } from 'lodash';
export default {
    name: 'xEdit',
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
    components: {
        VueEditor
    },
    mounted() {
    },
    data() {
        return {
            content: cloneDeep(this.value),
            customToolbar: this.prop.customToolbar || [
                ['bold', 'italic', 'underline'],
                [{ list: 'ordered' }, { list: 'bullet' }]
            ]
        };
    },
    computed: {
    },
    methods: {
    },
    watch: {
        content: function (val) {
            this.$emit('input', val);
            this.$emit('change', val);
        },
        value: function (val) {
            this.content = val;
        }
    }
};
</script>
<style scoped>
    .main {
        width: 100%;
    }
    .editor {
        min-width: 700px;
    }
</style>
