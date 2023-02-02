<template>
  <el-menu :default-openeds="['1', '3']" style="min-height: 100% ; overflow-x: hidden"
           active-text-color="#42b883"
           :collapse-transition="false"
           :collapse="isCollapse"
           router
  >
    <div style="height: 60px; line-height: 60px; text-align: center">
      <img src="../assets/iocn.png" alt="" style="width: 20px; position: relative;top: 5px; margin-right: 5px">
      <b style="color: #42b983" v-show="logoTextShow">上载题库</b>
    </div>

    <el-menu-item index="/">
      <template slot="title">
        <i class="el-icon-house"></i>
        <span slot="title">主页</span>
      </template>
    </el-menu-item>

    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">系统管理</span>
      </template>
      <el-menu-item index="/quesbank">
        <i class="el-icon-s-custom"></i>
        <span slot="title">考卷管理</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "Aside",
  props:{
    isCollapse:Boolean,
    logoTextShow:Boolean
  }
}
</script>

<style scoped>

</style>