<script setup lang="ts">
import type { VideoItem } from '~/models'
import { followUser, unfollowUser } from '~/apis'
import dayjs from 'dayjs'

const props = defineProps<{
  info: VideoItem
}>()

const emit = defineEmits<{
  (e: 'refresh'): void
}>()

function handleToProfile() {
  navigateTo(`/profile/${props.info.author.userId}`, {
    open: { target: '_blank' },
  })
}

async function changeFollowStatus(isFollow: boolean) {
  const res = isFollow ? (await unfollowUser(props.info.author.userId)) : (await followUser(props.info.author.userId))

  if (!res.success) {
    message.error(`${isFollow ? '取消' : ''}关注失败`)
  } else {
    message.info(`${isFollow ? '取消' : ''}关注成功`)
  }

  emit('refresh')
}
</script>

<template>
  <div class="w-10 flex flex-col">
    <!-- 博主 -->
    <div class="flex-center gap-2 px-6 py-8">

      <a class="flex-center cursor-pointer gap-2" @click="handleToProfile">
        <UiAvatar size="base">
          <UiAvatarImage :src="info.author.avatarUrl" :alt="info.author.nickName" />
          <UiAvatarFallback>{{ info.author.nickName }}</UiAvatarFallback>
        </UiAvatar>
        {{ info.author.nickName }}
      </a>
      <div class="flex-1" />
      <UiButton
        v-if="info.author.isFollow"
        variant="outline"
        class="px-6"
        @click="changeFollowStatus(true)"
      >
        已关注
      </UiButton>
      <UiButton
        v-else
        variant="outline"
        class="px-6"
        @click="changeFollowStatus(false)"
      >
        关注
      </UiButton>

    </div>
    <!-- post简介 -->
    <div class="px-6">
      <h1 class="pb-2 text-xl font-semibold tracking-tight"> {{ info.title }}</h1>

      <div class="whitespace-pre-wrap text-base"> {{ info.description }} </div>

      <div class="pb-2">
        <UiButton v-for="item in info.tags" :key="item.id" variant="link" size="lg" class="h-7 px-1"> #{{ item.name }}</UiButton>
      </div>
      <div class="text-foreground/50"> {{ dayjs(info.createdAt).format('YYYY-MM-DD') }} </div>
      <UiSeparator class="mt-6" />
    </div>
    <!-- post评论 -->
    <div class="flex-1 overflow-y-auto px-6 pt-6">
      <div class="mb-4 text-gray/90">
        共 {{ info.commentNum }} 条评论
      </div>
      <FeedInteractionComment :video-id="info.id" :author-id="info.author.userId" />

      <!-- <FeedInteractionComment class="ml-14" /> -->
      <!-- <FeedInteractionComment class="ml-14" /> -->

    </div>
    <UiSeparator />
    <!-- post 互动区域 -->
    <div>
      <FeedInteractionLine class="my-4 px-8 text-xl" />

      <FeedInteractionInput class="my-6 px-8" />

    </div>

  </div>

</template>
