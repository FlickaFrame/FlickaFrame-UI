<script setup lang="ts">
import { FollowTab } from '~/models'
import { getMyFollowerList, getMyFollowingList } from '~/apis'
import type { FollowListResponse, FollowPageOption } from '~/models'

const open = defineModel({ default: false })
const selectedTab = defineModel('tab', { default: FollowTab.Following })

const route = useRoute()

const userId = computed(() => route.params.id as string)

const pageOption: FollowPageOption = {
  page: 1,
  pageSize: 10,
  listAll: false,
}

const { data: followingList } = useFollowList(getMyFollowingList)
const { data: followerList } = useFollowList(getMyFollowerList)

function useFollowList(requestFn: (pageOption: FollowPageOption, userId?: string) => Promise<ApiResult<FollowListResponse>>) {
  return useAsyncData(requestFn.name, async () => {
    const res = await requestFn(pageOption, userId.value)
    if (!res.success) message.error('获取关注/粉丝列表失败')
    return res.success ? res.data.users : []
  })
}

const columnData = computed(() => {
  return [
    {
      name: '关注',
      key: FollowTab.Following,
      list: followingList.value,
    },
    {
      name: '粉丝',
      key: FollowTab.Follower,
      list: followerList.value,
    },
  ]
})

</script>

<template>

  <UiDialog v-model:open="open">

    <UiDialogContent class="p-10 sm:max-w-[625px]">
      <UiTabs v-model:model-value="selectedTab" class="w-full">
        <UiTabsList class="grid grid-cols-2 w-full">
          <UiTabsTrigger v-for="item in columnData" :key="item.key" :value="item.key">
            {{ item.name }}
          </UiTabsTrigger>

        </UiTabsList>
        <UiTabsContent v-for="item in columnData" :key="item.key" :value="item.key">
          <UiScrollArea class="min-h-100 border rounded-md">
            <div class="p-4">
              <div v-for="followItem in item.list" :key="followItem.userId">
                <div class="flex-center justify-between">
                  <div class="flex-center flex-row justify-start">
                    <img :src="followItem.avatarUrl" class="w-60px rounded-full">
                    <div class="ml-2 flex flex-col">
                      <div class="mt-1 text-lg">{{ followItem.nickName }}</div>
                      <div class="text-[#33333399]">{{ followItem.slogan }}</div>
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
          </UiScrollArea>
        </UiTabsContent>

      </UiTabs>
    </UiDialogContent>
  </UiDialog>

</template>
