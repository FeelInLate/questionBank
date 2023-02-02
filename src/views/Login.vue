<template>
 <div class="wrapper">
    <div style="margin: 200px auto; background-color: #fff; width: 350px; height: 300px; padding: 20px; border-radius: 10px">
      <div style="margin: 20px 0; text-align: center; font-size: 24px; color: #42b983"><b>登 录</b></div>
      <el-form :model="user" ref="userForm" :rules="rules">
        <el-form-item prop="username">
         <el-input  size="medium" style="margin: 10px 0" prefix-icon="el-icon-user" v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input  size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password v-model="user.password" @keydown.enter.native="login"></el-input>
        </el-form-item>
        <div style="margin: 10px 0; text-align: right">
          <el-button type="primary" size="small" autocomplete="off" @click="login" >登录</el-button>
        </div>
      </el-form>
    </div>
 </div>
</template>

<script>
export default {
  name: "Login",
  data(){
    return{
      user:{},
      rules:{
        username: [
          { required: true, message: '请输入用户姓名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在3到5个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在6到12个字符', trigger: 'blur'}
        ]

      }
    }
  },
  methods: {
    login() {
      this.$refs['userForm'].validate((valid) => {
        if (valid) {
          this.request.post("/User/login", this.user).then(res => {
            if ( res.username == null) {
              this.$message.error("用户名或密码错误")
            } else {
              localStorage.setItem("user",res.username) //存储用户信息到浏览器
              this.$router.push("/")
              this.$message.success("登录成功")
            }
          })
        } else
          return false;
      })
    },
  }
}
</script>

<style scoped>
  .wrapper{
    height: 100vh;
    background-image: linear-gradient(to bottom right, #42b983, #427ab9);
    overflow: hidden;
  }
</style>