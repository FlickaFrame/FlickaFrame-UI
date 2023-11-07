<script setup lang="ts">

import type { VideoItem } from '~/models'

const props = defineProps<{
  info: VideoItem
}>()

const video = ref<HTMLVideoElement | null>(null)

</script>

<template>
  <div>
    <div class="flex border-b py-6">
      <UiAvatar size="base">
        <UiAvatarImage :src="info.author.avatarUrl" :alt="info.author.nickName" />
        <UiAvatarFallback>{{ info.author.nickName }}</UiAvatarFallback>
      </UiAvatar>
      <div class="w-full px-4 pl-3">
        <div class="flex items-center justify-between pb-0.5">

          <span class="cursor-pointer font-bold hover:underline">
            {{ info.author.nickName }}
          </span>

        </div>
        <div class="max-w-[300px] break-words pb-0.5 text-[15px] md:max-w-[400px]">{{ info.description }}</div>
        <div class="pb-0.5 text-[14px] text-gray-500">

          <span v-for="t in info.tags" :key="t.name">
            #{{ t.name }}
          </span>

        </div>
        <div class="flex items-center pb-0.5 text-[14px] font-semibold">

          <div class="i-mdi-music" />
          <div class="px-1">{{ info.title }}</div>
          <div class="i-mdi-heart" />

        </div>

        <div class="mt-2.5 flex">
          <div
            class="relative max-h-[580px] max-w-[260px] min-h-[480px] flex cursor-pointer items-center rounded-xl bg-black"
          >
            <video
              ref="video"
              loop
              muted
              class="mx-auto h-full rounded-xl object-cover"
              :src="info.playUrl"
              @click="video?.play()"
            />

          </div>
          <div class="relative mr-[75px]">
            <div class="absolute bottom-0 pl-2">
              <div class="pb-4 text-center">
                <button class="cursor-pointer rounded-full bg-gray-200 p-2">
                  <div class="i-mdi-heart" />
                </button>
                <span class="text-xs font-semibold text-gray-800">{{ info.favoriteCount }}</span>
              </div>
              <div class="pb-4 text-center">
                <div class="cursor-pointer rounded-full bg-gray-200 p-2">
                  <div class="i-mdi-comment" />
                </div>
                <span class="text-xs font-semibold text-gray-800">43</span>
              </div>
              <div class="text-center">
                <div class="cursor-pointer rounded-full bg-gray-200 p-2">
                  <div class="i-mdi-share" />
                </div>
                <span class="text-xs font-semibold text-gray-800">55</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>

</template>
