<template>
<div class="home">
  <el-container class="el-container">
<!--    自定义左侧的组件-->
    <common-aside/>
    <el-container>
      <el-header class="el-header">
        <CommomHeader></CommomHeader>
      </el-header>
      <el-main class="el-main">
        <router-view></router-view>
      </el-main>
    </el-container>

  </el-container>
</div>

</template>

<script setup>
import CommonAside from "@/components/Part/CommonAside.vue";
import CommomHeader from "@/components/Part/CommomHeader.vue";

</script>

<style scoped lang="less">
.home,.el-container {
  height: 100%;
}
.el-header{
  background-color: #333;
}
</style>