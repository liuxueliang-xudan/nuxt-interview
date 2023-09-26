<script setup lang="ts">
import { useRequest } from '@/composables/useRequest';
import type { ArticleItem } from 'types/article'

// 面经列表
const list = ref<ArticleItem[]>([])

// 分页查询参数
const pageParams = reactive({
  current: 1,
  pageSize: 10,
  sorter: 'weight_desc',
})

const loading = ref(false)
const finished = ref(false)

// 获取面经列表
const getList = async () => {
  // axios 问题，不会等服务端渲染完成，直接返回空页面，对 SEO 不友好
  // const res = await request({
  //   method: 'GET',
  //   url: '/interview/query',
  //   headers: {
  //     Authorization: `Bearer ${getToken()}`,
  //   },
  // })
  // list.value.push(...res.data.rows)

  // ✅ 通过 useFetch 获取数据，会等服务端渲染完成，再返回页面，并且前端不会再发送多余请求
  // const res = await useFetch<any>('/interview/query', {
  //   method: 'GET',
  //   baseURL: 'http://interview-api-t.itheima.net/h5/',
  //   headers: {
  //     Authorization: `Bearer ${getToken()}`,
  //   },
  // })
  // list.value.push(...res.data.value.data.rows)

  // ✅ 基于 useFetch 二次封装的 useRequest，更加简洁
  const res = await useRequest('/interview/query', {
    params: pageParams,
    watch: false,
  })
  // 数组追加
  list.value.push(...res.rows)

  // 页码累加
  pageParams.current++

  // 加载状态结束
  loading.value = false

  // 如果数据已经全部加载完毕
  if (pageParams.current > res.pageTotal) {
    finished.value = true
  }
}

getList()
</script>

<template>
  <NuxtLayout name="tabbar">
    <div class="article-page">
      <nav class="my-nav van-hairline--bottom">
        <a href="javascript:;">推荐</a>
        <a href="javascript:;">最新</a>
        <div class="logo"><img src="@/assets/logo.png" alt="" /></div>
      </nav>
      <!-- vant 列表组件 -->
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getList"
      >
        <ArticleItemCom v-for="item in list" :key="item.id" :item="item" />
      </van-list>
    </div>
  </NuxtLayout>
</template>

<style lang="less" scoped>
.article-page {
  margin-bottom: 50px;
  margin-top: 44px;
  .my-nav {
    height: 44px;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 999;
    background: #fff;
    display: flex;
    align-items: center;
    > a {
      color: #999;
      font-size: 14px;
      line-height: 44px;
      margin-left: 20px;
      position: relative;
      transition: all 0.3s;
      &::after {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        width: 0;
        height: 2px;
        background: #222;
        transition: all 0.3s;
      }
      &.active {
        color: #222;
        &::after {
          width: 14px;
        }
      }
    }
    .logo {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      > img {
        width: 64px;
        height: 28px;
        display: block;
        margin-right: 10px;
      }
    }
  }
}
.article-item {
  .head {
    display: flex;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
    }
    .con {
      flex: 1;
      overflow: hidden;
      padding-left: 10px;
      p {
        margin: 0;
        line-height: 1.5;
        &.title {
          width: 280px;
        }
        &.other {
          font-size: 10px;
          color: #999;
        }
      }
    }
  }
  .body {
    font-size: 14px;
    color: #666;
    line-height: 1.6;
    margin-top: 10px;
  }
  .foot {
    font-size: 12px;
    color: #999;
    margin-top: 10px;
  }
}
</style>
