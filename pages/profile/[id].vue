<script setup lang="ts">
import { FollowTab, UserGender } from '~/models'
import { getUserInfoById } from '~/apis'

const route = useRoute()

const store = useSessionStore()
const { success, data } = await getUserInfoById(route.params.id as string)
const selectedTab = ref<FollowTab>(FollowTab.Following)

const isFollowModalOpen = ref(false)
const isEditModalOpen = ref(false)

function handleOpenFollowing() {
  isFollowModalOpen.value = true
  selectedTab.value = FollowTab.Following
}

function handleOpenFollower() {
  isFollowModalOpen.value = true
  selectedTab.value = FollowTab.Follower
}

</script>

<template>
  <div v-if="success" class="relative flex-center p-4">
    <div class="backdrop-brightness flex border rounded-lg px-20 py-6 backdrop-blur brightness-90">
      <UiAvatar size="xl" class="relative">

        <div class="absolute inset-0 cursor-pointer bg-black opacity-0 transition-all hover:opacity-65">
          <div class="h-full w-full flex-center">
            <div class="i-mdi-image-edit text-4xl color-white" />
          </div>
        </div>
        <UiAvatarImage :src="data.avatarUrl" :alt="data.nickName" />
        <UiAvatarFallback>{{ data.nickName }}</UiAvatarFallback>
      </UiAvatar>
      <div class="ml-10 flex flex-col">
        <div class="flex items-center gap-4">
          <div class="text-2xl font-semibold">{{ data.nickName }}</div>
          <div class="flex-center text-xl">
            <div v-if="data.gender === UserGender.Male" class="i-mdi-gender-male color-blue" />
            <div v-else-if="data.gender === UserGender.Female" class="i-mdi-gender-female color-red" />
          </div>
          <UserFollowButton
            v-if="store.info.userId !== data.userId"
            :is-follow="data.isFollow"
            :user-id="data.userId"
          />
          <UiTooltipProvider v-if="store.info.userId === data.userId">
            <UiTooltip>
              <UiTooltipTrigger>
                <div
                  class="rounded-full p-1 transition-all hover:bg-foreground/10"
                  @click="isEditModalOpen = true"
                >
                  <div class="i-mdi-account-edit-outline" />
                </div>
              </UiTooltipTrigger>
              <UiTooltipContent>
                <p>编辑个人资料</p>
              </UiTooltipContent>
            </UiTooltip>
          </UiTooltipProvider>

        </div>
        <div class="text-foreground/50">ID: {{ data.userId }}</div>
        <div class="my-4">{{ data.slogan || '暂无个性签名～' }}</div>
        <div class="flex flex-row gap-4">
          <div class="cursor-pointer" @click="handleOpenFollowing">{{ data.followingCount }} 关注</div>
          <div class="cursor-pointer" @click="handleOpenFollower">{{ data.followerCount }} 粉丝</div>
          <div>{{ data.likeVideoCount }} 获赞</div>
        </div>
      </div>

    </div>
    <div class="absolute inset-0 overflow-hidden bg-sky/10 -z-1">
      <img src="https://www.notion.so/images/page-cover/woodcuts_1.jpg" class="h-full w-full object-cover">
    </div>
    <UserFollowModal v-model="isFollowModalOpen" v-model:tab="selectedTab" />
    <UserProfileModal v-model="isEditModalOpen" />
  </div>
  <div v-else>
    404
  </div>

</template>
