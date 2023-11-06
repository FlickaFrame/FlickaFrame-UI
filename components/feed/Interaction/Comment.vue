<script setup lang="ts">

import type { Comment } from '~/models'

import dayjs from 'dayjs'

const props = defineProps<{
  authorId: string
  type?: 'top' | 'sub'
  comments: Comment[]
}>()

</script>

<template>
  <div>

    <div
      v-for="item in comments"
      :key="item.id"
      class="flex gap-4 py-2"
      :class="{ 'ml-14': props.type === 'sub' }"
    >
      <UiAvatar size="base">
        <UiAvatarImage :src="item.userInfo.avatarUrl" :alt="item.userInfo.nickName" />
        <UiAvatarFallback>{{ item.userInfo.nickName }}</UiAvatarFallback>
      </UiAvatar>
      <div class="flex-1">
        <div class="flex-1">
          <div class="mb-2 flex items-center gap-2 text-lg text-foreground/50"> {{ item.userInfo.nickName }}
            <UiBadge v-if="props.authorId === item.userInfo.userId" variant="outline">作者</UiBadge>
          </div>
          <div class="mb-2 whitespace-pre-wrap text-base"> {{ item.content }}</div>
          <div class="mb-1 text-foreground/50"> {{ dayjs(item.createTime).format('YYYY-MM-DD') }} </div>

          <FeedInteractionLine :liked="item.liked" :liked-count="item.likedCount" class="text-lg" />

        </div>

      </div>

    </div>

  </div>

</template>
