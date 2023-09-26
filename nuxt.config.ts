// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // 调试工具
  devtools: { enabled: false },
  // 模块
  modules: ['@vant/nuxt'],
  // 移动端适配
  postcss: {
    plugins: {
      'postcss-px-to-viewport': {
        viewportWidth: 375,
      },
    },
  },
})
