<script setup lang="ts">
import type { NoticeListResponse } from '~/models'
import { NoticeType } from '~/models'
import { getNoticeList } from '~/apis'
import dayjs from 'dayjs'

const selectedTab = defineModel('tab', { default: NoticeType.Follow })

const { data: followNoticeList } = await getNoticeList(NoticeType.Follow)
const { data: likeNoticeList } = await getNoticeList(NoticeType.LikeVideo)

const columnData = computed(() => {
  return [
    {
      name: '新增关注',
      key: NoticeType.Follow,
      list: followNoticeList.list,
      content: '关注了你',
    },
    {
      name: '收到的赞',
      key: NoticeType.LikeVideo,
      list: likeNoticeList.list,
      content: '赞了你的视频',
    },
  ]
})

function handleToProfile(userId: number) {
  navigateTo(`/profile/${userId}`, {
    open: { target: '_blank' },
  })
}

</script>

<template>
  <UiTabs v-model:model-value="selectedTab" class="w-full">
    <UiTabsList class="flex flex-row justify-start gap-4 bg-white">
      <UiTabsTrigger v-for="item in columnData" :key="item.key" class="data-[state=active]:bg-[#f1f5f9] data-[state=active]:text-foreground" :value="item.key">
        <div class="relative">
          {{ item.name }}
          <div class="absolute w-4 rounded-full bg-red text-xs text-white -right-4.5 -top-1">{{ item.list.length }}</div>
        </div>

      </UiTabsTrigger>

    </UiTabsList>
    <UiSeparator class="my-2" />
    <UiTabsContent v-for="item in columnData" :key="item.key" :value="item.key">
      <UiScrollArea>
        <div class="p-4">
          <div v-for="noticeItem in item.list" :key="noticeItem.noticeId">
            <div class="flex-center justify-between">
              <div class="flex-center flex-row justify-start">
                <UiAvatar size="base" @click="handleToProfile(noticeItem.fromUserId)">
                  <UiAvatarImage :src="noticeItem.fromUserAvatarUrl" :alt="noticeItem.fromUserNickName" />
                  <UiAvatarFallback>{{ noticeItem.fromUserNickName }}</UiAvatarFallback>
                </UiAvatar>
                <div class="ml-2 flex flex-col">
                  <div class="mt-1 cursor-pointer text-lg" @click="handleToProfile(noticeItem.fromUserId)">{{ noticeItem.fromUserNickName }}</div>
                  <div class="text-[#33333399]">{{ item.content }} {{ dayjs(noticeItem.noticeTime).format("YYYY-MM-DD") }}</div>
                </div>
              </div>
            </div>
            <UiSeparator class="my-2 mr-2 mt-2" />
          </div>
        </div>
        <UiLoading is-end />
      </UiScrollArea>
    </UiTabsContent>

  </UiTabs>
</template>
