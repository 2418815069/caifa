<script>
export default {
    data() {
        return {
            breadcrumbs: []
        };
    },
    components: {
    },
    async created() {
    },
    methods: {
    }
};
</script>

<template>
  <div>
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item
        v-for="(matched, key) in $route.matched"
        :key="key"
        :to="{ path: matched.path }"
      >{{matched.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
</style>
