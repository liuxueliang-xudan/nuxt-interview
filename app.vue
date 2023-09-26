<script setup lang="ts">
// 用于设置页面的标题、关键字、描述等SEO信息
useSeoMeta({
  title: '黑马面经 - 找工作神器|笔试题库|面试经验',
  keywords: '黑马面经,笔试题库,面试经验,面试题库,面试题,面试',
  description:
    '求职之前，先上黑马面经，就业找工作一站解决。全面提升求职竞争力，找到好工作，拿到好offer。',
  author: '黑马程序员',
})
</script>

<template>
  <!-- NuxtPage 路由占位 相当于 router-view -->
  <NuxtPage :keepalive="{ max: 10 }" />
</template>

<style>
:root {
  --van-primary-color: #ff7d00 !important;
}
</style>
