<script>
export default {
    data() {
        return {
            breadcrumbs: [],
            activeName: this.$route.path
        };
    },
    components: {
    },
    async created() {
    },
    methods: {
        // 返回按钮（前端）
        goBack() {
            this.$router.go(-1);
        },
        handleClick() {
            this.$router.push({
                path: this.activeName,
                query: this.$route.query
            });
        }
    }
};
</script>

<template>
  <div>
      <el-tabs v-model="activeName" @tab-click="handleClick" class="not-print">
        <el-tab-pane label="采伐证" name="/common/integrated-query-detail2/caifazheng"></el-tab-pane>
        <el-tab-pane label="核发信息" name="/common/integrated-query-detail2/hefaxinxi"></el-tab-pane>
      </el-tabs>
      <router-view></router-view>
  </div>
</template>

<style lang="stylus" scoped>
.back {
    margin-top 20px
}
</style>
