<template>
  <div>
    <el-table-column
      v-for="(item,index) in list"
      :key="index+Math.random()"
      :label="item.label"
      align="center"
      :prop="item.prop||null"
      :width="item.width"
    >
     <template  v-if="item.returnHtml" slot-scope="scope">
        <div v-if="item.returnHtml">
            <div v-html="item.returnHtml(scope.row,scope.$index)"></div>
          </div>
    </template>

    <xrecursion-list v-if="item.option" :list="item.option"></xrecursion-list>

    </el-table-column>
  </div>
</template>
<script>
export default {
    name: 'xrecursionList',
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
        console.log('11');
    },
    created() {
    }
};

</script>
