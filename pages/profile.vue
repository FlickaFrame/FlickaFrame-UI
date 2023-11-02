<script setup lang="ts">

import { getUserInfo } from '~/apis'

const avatarUrl = ref('http://s2i8a2ssf.hn-bkt.clouddn.com/avatar/tos-cn-i-0813_ocOqHANxNnIABJeAAFgVE6fhmrAyAy5wzkAJC4~tplv-8yspqt5zfm-300x300.jpeg')
const nickName = ref('盐烤鱼')
const id = ref('123')
const slogan = ref('牛牛牛')
// const store = useSessionStore()
const { data } = await getUserInfo()

</script>

<template>
  <div ref="profileElement" class="flex-center flex-row p-10">
    <img ref="avatarElement" class="w-50 rounded-full" :src="avatarUrl">
    <div class="ml-10 flex flex-col">
      <div class="text-2xl font-semibold">{{ nickName }}</div>
      <div class="text-[#33333399]">ID: {{ id }}</div>
      <div class="my-4">{{ slogan }}</div>
      <div class="flex flex-row gap-4">
        <div>10 关注</div>
        <div>10 粉丝</div>
        <div>10 获赞</div>
      </div>
    </div>
  </div>

</template>
