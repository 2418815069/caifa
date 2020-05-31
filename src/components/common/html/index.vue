<!--
 * @Description:自定义dom结构
 * @Version: 2.0
 * @Autor: xiongchuanyu
 * @Date: 2019-06-22 14:14:49
 * @LastEditors: xiongchuanyu
 * @LastEditTime: 2019-06-22 14:19:47
 -->

<template>
  <div class="main">
    <div v-html="prop.render && prop.render(value) || ''">
    </div>
  </div>
</template>

<script>
export default {
    name: 'xHtml',
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
    mounted() {
    },
    data() {
        return {};
    },
    computed: {
    },
    methods: {
    },
    watch: {
    }
};
</script>
<style scoped>
</style>
