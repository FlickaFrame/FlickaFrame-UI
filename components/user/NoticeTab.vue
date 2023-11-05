<script setup lang="ts">
import { NoticeTabKey } from '~/models'

const selectedTab = defineModel('tab', { default: NoticeTabKey.Comment })

const commentNoticeList = ref(
  [
    {
      id: 1,
      fromUserId: 1,
      avatarUrl: 'http://s2i8a2ssf.hn-bkt.clouddn.com/avatar/tos-cn-i-0813_ocOqHANxNnIABJeAAFgVE6fhmrAyAy5wzkAJC4~tplv-8yspqt5zfm-300x300.jpeg',
      fromUserNickName: '盐烤鱼2号',
      content: '你好啊',
      time: '2023-11-05',
      videoId: 1,
      videoTitle: '《视频00001》',
    },
    {
      id: 2,
      fromUserId: 2,
      avatarUrl: 'http://s2i8a2ssf.hn-bkt.clouddn.com/avatar/tos-cn-i-0813_ocOqHANxNnIABJeAAFgVE6fhmrAyAy5wzkAJC4~tplv-8yspqt5zfm-300x300.jpeg',
      fromUserNickName: '盐烤鱼3号',
      content: '你的视频很好看',
      time: '2023-11-05',
      videoId: 1,
      videoTitle: '《视频00002》',
    },
  ],
)

const likeNoticeList = ref(
  [
    {
      id: 1,
      fromUserId: 1,
      avatarUrl: 'http://s2i8a2ssf.hn-bkt.clouddn.com/avatar/tos-cn-i-0813_ocOqHANxNnIABJeAAFgVE6fhmrAyAy5wzkAJC4~tplv-8yspqt5zfm-300x300.jpeg',
      fromUserNickName: '盐烤鱼2号',
      content: '赞了你的视频',
      time: '2023-11-05',
      videoId: 1,
      videoTitle: '《视频00001》',
    },
  ],
)

const followNoticeList = ref(
  [
    {
      id: 1,
      fromUserId: 1,
      avatarUrl: 'http://s2i8a2ssf.hn-bkt.clouddn.com/avatar/tos-cn-i-0813_ocOqHANxNnIABJeAAFgVE6fhmrAyAy5wzkAJC4~tplv-8yspqt5zfm-300x300.jpeg',
      fromUserNickName: '盐烤鱼2号',
      content: '关注了你',
      time: '2023-11-05',
      videoId: 1,
    },
  ],
)

const columnData = computed(() => {
  return [
    {
      name: '评论和@',
      key: NoticeTabKey.Comment,
      list: commentNoticeList.value,
    },
    {
      name: '赞和收藏',
      key: NoticeTabKey.Like,
      list: likeNoticeList.value,
    },
    {
      name: '新增关注',
      key: NoticeTabKey.Follow,
      list: followNoticeList.value,
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
          <div class="absolute w-4 rounded-full bg-red text-xs text-white -right-4.5 -top-1">1</div>
        </div>

      </UiTabsTrigger>

    </UiTabsList>
    <UiSeparator class="my-2" />
    <UiTabsContent v-for="item in columnData" :key="item.key" :value="item.key">
      <UiScrollArea>
        <div class="p-4">
          <div v-for="noticeItem in item.list" :key="noticeItem.id">
            <div class="flex-center justify-between">
              <div class="flex-center flex-row justify-start">
                <img :src="noticeItem.avatarUrl" class="w-60px cursor-pointer rounded-full" @click="handleToProfile(noticeItem.fromUserId)">
                <div class="ml-2 flex flex-col">
                  <div class="mt-1 cursor-pointer text-lg" @click="handleToProfile(noticeItem.fromUserId)">{{ noticeItem.fromUserNickName }}</div>
                  <div class="text-[#33333399]">{{ noticeItem.content }} {{ noticeItem.time }}</div>
                </div>
              </div>
              <div v-if="item.key !== NoticeTabKey.Follow" class="text-[#33333399]">{{ noticeItem?.videoTitle }}</div>
            </div>
            <UiSeparator class="my-2 mr-2 mt-2" />
          </div>
        </div>
        <div class="flex-center text-[#33333399]">- The End -</div>
      </UiScrollArea>
    </UiTabsContent>

  </UiTabs>
</template>
