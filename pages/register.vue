<script setup lang="ts">
// nuxt 项目中，utils 的方法无需引入，直接使用即可
import request from '@/utils/request'

// 表单数据
const form = reactive({
  username: import.meta.env.DEV ? 'itheima' : '',
  password: import.meta.env.DEV ? '123456' : '',
})

// 表单提交
const onSubmit = async () => {
  // 发送 axios 请求 - utils 目录的方法自动导入
  await request({
    method: 'POST',
    url: '/user/register',
    data: form,
  })
  // vant 提示注册成功 - vant 组件库的方法自动导入
  showSuccessToast('注册成功')
  // 跳转到登录页面，相当于 router.push('/login')   router.replace('/login')
  navigateTo('/login', { replace: true })
}
</script>

<template>
  <div class="register-page">
    <!-- 导航栏部分 -->
    <van-nav-bar title="面经注册" />

    <!-- 一旦form表单提交了，就会触发submit，可以在submit事件中
        根据拿到的表单提交信息，发送axios请求
    -->
    <van-form @submit="onSubmit">
      <!-- 输入框组件 -->
      <!-- \w 字母数字_   \d 数字0-9 -->
      <van-field
        v-model="form.username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[
          { required: true, message: '请填写用户名' },
          { pattern: /^\w{5,}$/, message: '用户名至少包含5个字符' },
        ]"
      />
      <van-field
        v-model="form.password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[
          { required: true, message: '请填写密码' },
          { pattern: /^\w{6,}$/, message: '密码至少包含6个字符' },
        ]"
      />
      <div style="margin: 16px">
        <van-button block type="primary" native-type="submit">注册</van-button>
      </div>
    </van-form>
    <NuxtLink class="link" to="/login">已注册,去登录</NuxtLink>
  </div>
</template>

<style scoped>
.link {
  color: #069;
  font-size: 12px;
  padding-right: 20px;
  float: right;
}
</style>
