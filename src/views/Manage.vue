<template>
  <div style="height: 100%">
    <el-container style="min-height: 100vh;">
      <!--      box-shadow: 2px 0 6px rgb(0 21 41 / 35%)阴影效果-->
      <el-aside :width="sideWidth + 'px'" style="background-color: rgb(238, 241, 246); ">
        <Aside :isCollapse="isCollapse" :logoTextShow="logoTextShow" />
      </el-aside>

      <el-container>
        <el-header style="border-bottom: 1px solid #cccccc; ">
          <Header :collapseBtnClass="collapseBtnClass" @collapse="collapse" />
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

import Aside from "@/components/Aside";
import Header from "@/components/Header";

export default {
  name: 'Manage',
  data() {
    return {
      collapseBtnClass: 'el-icon-s-fold',
      isCollapse: false,
      sideWidth: 200,
      logoTextShow: true,

    }
  },
  components: {
    Aside,
    Header
  },
  methods: {
    collapse() {
      this.isCollapse = !this.isCollapse
      if (this.isCollapse) {
        this.sideWidth = 64
        this.collapseBtnClass = 'el-icon-s-unfold'
        this.logoTextShow = false
      } else {
        this.sideWidth = 200
        this.collapseBtnClass = 'el-icon-s-fold'
        this.logoTextShow = true
      }
    },
  }

}
</script>
