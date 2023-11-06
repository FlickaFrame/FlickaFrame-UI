<script setup lang="ts">
import type { CommentTarget, VideoItem } from '~/models'
import { followUser, getCommnets, unfollowUser } from '~/apis'
import dayjs from 'dayjs'

const props = defineProps<{
  info: VideoItem
}>()

const emit = defineEmits<{
  (e: 'refresh'): void
}>()

const { data: comments, refresh: refreshComments } = useAsyncData(props.info.id, async () => {
  const { success, data } = await getCommnets(props.info.id)
  return success ? data.comments : []
})

const commentTarget = ref<CommentTarget>()

async function changeFollowStatus(isFollow: boolean) {
  const res = isFollow ? (await unfollowUser(props.info.author.userId)) : (await followUser(props.info.author.userId))

  if (!res.success) {
    message.error(`${isFollow ? '取消' : ''}关注失败`)
  } else {
    message.info(`${isFollow ? '取消' : ''}关注成功`)
  }

  emit('refresh')
}

async function handleReply(r: CommentTarget) {
  commentTarget.value = r
}

async function handleShare() {
  try {
    await navigator.clipboard.writeText(window.location.href)
    message.success('分享成功， 分享链接已写入剪切板')
  } catch (e) {
    message.error(`分享失败～${e}`)
  }
}

</script>

<template>
  <div class="w-10 flex flex-col">
    <!-- 博主 -->
    <div class="flex-center gap-2 px-6 py-8">

      <NuxtLink
        class="flex-center cursor-pointer gap-2"
        :to="`/profile/${props.info.author.userId}`"
        target="_blank"
      >
        <UiAvatar size="base">
          <UiAvatarImage :src="info.author.avatarUrl" :alt="info.author.nickName" />
          <UiAvatarFallback>{{ info.author.nickName }}</UiAvatarFallback>
        </UiAvatar>
        {{ info.author.nickName }}
      </NuxtLink>
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
      <UiSeparator class="mt-3" />
    </div>
    <!-- post评论 -->
    <div class="flex-1 overflow-y-auto px-6 pt-3">
      <div class="mb-2 text-gray/90">
        共 {{ info.commentNum }} 条评论
      </div>
      <FeedInteractionComment
        :author-id="info.author.userId"
        :comments="comments"
        @reply="handleReply"
        @delete="refreshComments"
      />

    </div>
    <UiSeparator />
    <!-- post 互动区域 -->
    <div>
      <FeedInteractionLine
        class="my-4 px-8 text-xl"
        show-share
        @share="handleShare"
      />

      <FeedInteractionInput
        v-model:target="commentTarget"
        :video-id="info.id"
        class="my-4 px-4"
        :loading="true"
        @send="refreshComments"
      />

    </div>

  </div>

</template>
