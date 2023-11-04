<script setup lang="ts">
import { FollowTab } from '~/models'
import { getUserInfoById } from '~/apis'

const route = useRoute()
const { success, data } = await getUserInfoById(route.params.id as string)
const selectedTab = ref<FollowTab>(FollowTab.Following)

const isModalOpen = ref(false)

function handleOpenFollowing() {
  isModalOpen.value = true
  selectedTab.value = FollowTab.Following
}

function handleOpenFollower() {
  isModalOpen.value = true
  selectedTab.value = FollowTab.Follower
}

</script>

<template>
  <div v-if="success">
    <div class="flex-center flex-row p-10">
      <img class="w-50 rounded-full" :src="data.avatarUrl">
      <div class="ml-10 flex flex-col">
        <div class="flex-center flex-row justify-start">
          <div class="text-2xl font-semibold">{{ data.nickName }}</div>
          <div class="ml-4 flex-center text-lg">
            <ManOutlined v-if="data?.gender === 0" class="color-blue" />
            <WomanOutlined v-else class="color-red" />
          </div>
        </div>
        <div class="text-[#33333399]">ID: {{ data.userId }}</div>
        <div class="my-4">{{ data.slogan }}</div>
        <div class="flex flex-row gap-4">
          <div class="cursor-pointer" @click="handleOpenFollowing">{{ data.followingCount }} 关注</div>
          <div class="cursor-pointer" @click="handleOpenFollower">{{ data.followerCount }} 粉丝</div>
          <div>{{ data.likeVideoCount }} 获赞</div>
        </div>
      </div>
    </div>
    <UserFollowModal v-model="isModalOpen" v-model:tab="selectedTab" />
  </div>
  <div v-else>
    404
  </div>

</template>
