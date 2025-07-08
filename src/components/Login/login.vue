<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2 class="login-title">登录</h2>
      <el-form :model="loginForm" :rules="rules" ref="loginFormRef" label-position="top">
        <el-form-item label="用户名" prop="username">
          <el-input
              v-model="loginForm.username"
              prefix-icon="el-icon-user"
              placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
              v-model="loginForm.password"
              prefix-icon="el-icon-lock"
              placeholder="请输入密码"
              type="password"
              show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import {getCurrentInstance, reactive, ref} from 'vue';
import { useRouter } from "vue-router";
import { useStore } from '@/stores/index.js';
const store = useStore();

const router = useRouter();
const loginFormRef = ref(null);

const loginForm = reactive({
  username: '',
  password: '',
});

const rules = {
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
    {min: 3, max: 20, message: '用户名长度在 3 到 20 个字符之间', trigger: 'blur'},
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 6, max: 20, message: '密码长度在 6 到 20 个字符之间', trigger: 'blur'},
  ],
};

const {proxy,} = getCurrentInstance();

const handleLogin = async () => {
  try {
    console.log("loginForm", loginForm); // 使用外部定义的 reactive 对象
    const response = await proxy.$api.Login(loginForm);
    console.log("dgaopcao", response);
    if (response && response.code === 200) {
      console.log("登录成功", response.message);
      store.setUser(response.data.user.username);
      store.setToken(response.data.token);
      console.log("setUser", response.data.user.username);
      console.log("setToken", response.data.token);
      router.push('/');
    } else {
      console.error("请检查用户与密码是否正确", response.message);
    }
  } catch (error) {
    console.error("提交数据时发生错误", error);
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}

.login-card {
  width: 400px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.login-title {
  text-align: center;
  margin-bottom: 20px;
}
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-size: cover;
  background-position: center;
}
</style>