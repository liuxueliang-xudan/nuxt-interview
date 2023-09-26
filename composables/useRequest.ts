import type { UseFetchOptions } from 'nuxt/app'
import {getToken} from '@/utils/token'
/**
 * 请求封装
 * @param url 请求地址
 * @param options 请求配置
 */
export const useRequest = async <T = any>(
  url: string,
  options?: UseFetchOptions<any>,
) => {
  // data  是请求返回的数据(ref类型)
  // error 是错误对象(也是ref类型)
  const { data, error } = await useFetch<any>(url, {
    baseURL: 'https://interview-api-t.itheima.net/h5/',
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    ...options,
  })

  // 如果有错误对象，就抛出错误，返回 reject 防止 await 后续 代码执行
  if (error.value) {
    return Promise.reject(error.value)
  } else {
    // 通过 as 断言，告诉 ts data.value.data 是 T 类型
    return data.value.data as T
  }
}
