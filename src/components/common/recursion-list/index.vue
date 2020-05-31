<template>
  <div>
    <el-table-column
      v-for="(item,index) in list"
      :label="item.label"
      align="center"
      :key="index+Math.random()"
      :prop="item.prop||null"
      :width="item.width"
    >

    <recursion-list v-if="item.option" :list="item.option"></recursion-list>

    </el-table-column>
  </div>
</template>
<script>
export default {
    name: 'recursionList',
    props: {
        list: Array

    },
    data() {
        return {
        };
    },
    methods: {
    },
    mounted() {
        console.log(55);
    },
    created() {
    }
};

</script>
