<script setup lang="ts">

import { getUserInfoById } from '~/apis'

// const store = useSessionStore()
const route = useRoute()
// const { data } = await getUserInfo(store.infoid)
const { success, data } = await getUserInfoById(Number(route.params.id as string))

</script>

<template>
  <div>
    <div v-if="success" class="flex-center flex-row p-10">
      <img class="w-50 rounded-full" :src="`${data?.avatarUrl}`">
      <div class="ml-10 flex flex-col">
        <div class="flex-center flex-row justify-start">
          <div class="text-2xl font-semibold">{{ data?.nickName }}</div>
          <div class="ml-4 flex-center text-lg">
            <ManOutlined v-if="data?.gender === 0" class="color-blue" />
            <WomanOutlined v-else class="color-[#ff7084]" />
          </div>
        </div>
        <div class="text-[#33333399]">ID: {{ data?.userId }}</div>
        <div class="my-4">{{ data?.slogan }}</div>
        <div class="flex flex-row gap-4">
          <div>{{ data?.followingCount }} 关注</div>
          <div>{{ data?.followerCount }} 粉丝</div>
          <div>{{ data?.likeVideoCount }} 获赞</div>
        </div>
      </div>
    </div>

    <div class="border-grey mx-10 border-t-1 border-solid" />

    <div />
  </div>

</template>
