<template>
<div class="home">
  <el-container class="el-container">
<!--    自定义左侧的组件-->
    <common-aside/>
    <el-container>
      <el-header class="el-header">
        <common-header />
      </el-header>
      <el-main class="el-main">
        main
      </el-main>
    </el-container>

  </el-container>
</div>

</template>

<script setup>
import CommonAside from "@/components/Part/CommonAside.vue";

</script>

<style>
.el-container,.home {
  height: 100%;
}
.el-header{
  background-color: #333;
}
</style>