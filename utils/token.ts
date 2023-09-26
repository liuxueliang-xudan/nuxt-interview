const KEY = 'hmmj-token'

// useCookie() 的返回值是一个 ref 对象，所以我们可以直接使用 .value 来获取和设置 cookie 的值

// 获取
export const getToken = () => {
  return useCookie(KEY).value
}

/**
 * 设置 token
 * @param newToken 新的 token
 */
export const setToken = (newToken: string) => {
  // 设置 cookie 的过期时间为 14 天
  useCookie(KEY, { maxAge: 60 * 60 * 24 * 14 }).value = newToken
}

// 删除
export const delToken = () => {
  useCookie(KEY).value = undefined
}
