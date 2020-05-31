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
    },
    mounted() {
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
    <div :class="['container', {'padding0': $route.name !== '核发信息' || $route.name !== '采伐证'}]">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.container
  margin 20px 0
  padding 20px
.padding0
  padding 0
</style>
