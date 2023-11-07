<script setup lang="ts">
import type { FollowItem } from '~/models'

const props = defineProps<{
  list: FollowItem[]
}>()

</script>

<template>

  <div class="p-4">
    <div v-for="followItem in props.list" :key="followItem.userId">
      <div class="flex-center justify-between">
        <div class="flex-center flex-row justify-start">
          <img :src="followItem.avatarUrl" class="w-50px rounded-full">
          <div class="ml-4 flex flex-col">
            <div class="mt-1">{{ followItem.nickName }}</div>
            <div class="text-sm text-foreground/30">{{ followItem.slogan }}</div>
          </div>
        </div>

        <UserFollowButton
          :is-follow="followItem.isFollow"
          :user-id="followItem.userId"
        />
      </div>
      <UiSeparator class="my-2" />
    </div>
  </div>

</template>
