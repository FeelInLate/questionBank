<template>
<div style="font-size: 12px;line-height: 60px;display: flex">
  <div style="flex: 1; font-size: 20px" >
    <span :class="collapseBtnClass" style="cursor: pointer" @click="collapse"></span>
  </div>
  <el-dropdown style="width: 70px; cursor: pointer">
    <span>{{ username }}</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>
        <span style="text-decoration: none" @click="logout">退出</span>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</div>
</template>

<script>
export default {
  name: "Header",
  props:{
    collapseBtnClass:String,
  },
  data(){
    return{
      username: localStorage.getItem("user")
    }
  },
  methods:{
    collapse(){
      this.$emit("collapse");
    },
    logout(){
      this.$router.push("/login")
      localStorage.removeItem("user")
      this.$message.success("退出成功")
    }
  }


}
</script>

<style scoped>

</style>