// 白名单列表，记录无需权限访问的所有页面
const whiteList = ['/login', '/register']
import {getToken} from '@/utils/token'

// 定义一个全局路由中间件
export default defineNuxtRouteMiddleware((to, from) => {
  // 如果去的是 / ，我们重定向道 /article
  if (to.path === '/') {
    return navigateTo('/article')
  }
  // 路由鉴权 - 如果去的页面不在白名单中，我们需要判断用户是否登录
  const token = getToken()
  if (!whiteList.includes(to.path) && !token) {
    // 如果没有登录，我们跳转到登录页面
    return navigateTo('/login')
  }
})
