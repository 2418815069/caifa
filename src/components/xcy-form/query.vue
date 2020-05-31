<template>
  <section class="main">
    <xcy-form
      ref="queryFrom"
      :config="config"
      :data="data"
      @input="handleUpdate"
    />
    <footer class="footer">
      <slot name="front-btn"></slot>
      <el-button @click="hanleQuery" size="mini" type="primary">{{queryTitle}}</el-button>
      <el-button @click="handleReset" size="mini" type="info" v-if="needResetBtn">清空</el-button>
      <slot name="moreAction"></slot>
    </footer>
  </section>
</template>

<script>

export default {
    name: 'xcyFormQuery',
    data() {
        return {};
    },
    props: {
        needResetBtn: {
            type: Boolean,
            default: false
        },
        queryTitle: {
            type: String,
            default: '查询'
        },
        config: {
            type: [Array, Object],
            default() {
                return [];
            }
        },
        data: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    computed: {},
    methods: {
        handleReset() {
            const restFunc = this.$refs.queryFrom.reset;
            restFunc();
            this.$emit('reset', restFunc);
        },
        async handleUpdate(query) {
            this.$emit('input', query);
            this.$emit('change', query);
        },
        hanleQuery() {
            this.$emit('query');
        }
    }
};
</script>

<style scoped>
.footer {
  padding-bottom: 20px;
  text-align: right;
  position: relative;
}
</style>
