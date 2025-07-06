<template>
  <div class="home">
    <el-container class="el-container">
      <common-aside/>
      <el-container>
        <el-header class="el-header">
          <CommonHeader></CommonHeader>
        </el-header>
        <el-main class="el-main">
          <router-view></router-view> <!-- 确保这里能够渲染子路由 -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import CommonAside from "@/components/Part/CommonAside.vue";
import CommonHeader from "@/components/Part/CommonHeader.vue";
</script>

<style scoped lang="less">
.home, .el-container {
  height: 100%;
}
.el-header {
  background-color: #333;
}
</style>