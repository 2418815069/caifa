<!--
 * @Description: 公共tooltab
 * @Version: 2.0
 * @Autor: wangyanan
 * @Date: 2019-09-14 22:00:00
 * @LastEditors: litesun
 * @LastEditTime: 2019-09-14 22:00:00
 -->

<template>
  <nav class="toolbar is-table-top">
    <div class="toolbar__button">
      <slot name="button"/>
    </div>
    <div class="toolbar__content">
      <slot/>
    </div>
  </nav>
</template>
<script type="text/ecmascript-6">

export default {
    name: 'toolbar'
};
</script>
<style>
  .toolbar {
    margin-bottom: 20px;
    box-sizing: border-box;
    flex-shrink: 0;
    height: 60px;
    display: flex;
    align-items: center;
    border-bottom: 2px solid #487367;
  }

  .toolbar__content {
      flex: 1;
      padding-left: 10px;
    }

    .toolbar__button {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-right: 10px;
    }
    .toolbar__button .el-button {
        margin-right: 10px;
    }

</style>
