<script setup lang="ts">

import { getMyFollowerList, getMyFollowingList, getUserInfoById } from '~/apis'
import type { FollowPageOption } from '~/models/follow'

enum TabModel {
  Following = 'following',
  Follower = 'follower',
}

enum FollowStatus {
  NotFollow = '关注',
  IsFollow = '已关注',
}

const route = useRoute()
const { success, data } = await getUserInfoById(Number(route.params.id as string))
const tabModelValue = ref<TabModel>(TabModel.Following)
const pageOption: FollowPageOption = {
  page: 1,
  pageSize: 10,
  listAll: false,
}
const followingData = await getMyFollowingList(pageOption)
const followerData = await getMyFollowerList(pageOption)

</script>

<template>
  <div v-if="success">
    <div class="flex-center flex-row p-10">
      <img class="w-50 rounded-full" :src="data?.avatarUrl">
      <div class="ml-10 flex flex-col">
        <div class="flex-center flex-row justify-start">
          <div class="text-2xl font-semibold">{{ data?.nickName }}</div>
          <div class="ml-4 flex-center text-lg">
            <ManOutlined v-if="data?.gender === 0" class="color-blue" />
            <WomanOutlined v-else class="color-[#ff7084]" />
          </div>
        </div>
        <div class="text-[#33333399]">ID: {{ data?.userId }}</div>
        <div class="my-4">{{ data?.slogan }}</div>
        <div class="flex flex-row gap-4">
          <UiDialog>
            <UiDialogTrigger as-child @click="tabModelValue = TabModel.Following">
              <div class="cursor-pointer">{{ data?.followingCount }} 关注</div>
            </UiDialogTrigger>
            <UiDialogTrigger as-child @click="tabModelValue = TabModel.Follower">
              <div class="cursor-pointer">{{ data?.followerCount }} 粉丝</div>
            </UiDialogTrigger>
            <UiDialogContent class="sm:max-w-[625px]">
              <UiTabs v-model:model-value="tabModelValue" class="w-full">
                <UiTabsList class="grid grid-cols-2 w-full">
                  <UiTabsTrigger value="following">
                    关注
                  </UiTabsTrigger>
                  <UiTabsTrigger value="follower">
                    粉丝
                  </UiTabsTrigger>
                </UiTabsList>
                <UiTabsContent class="h-full w-full" value="following">
                  <UiScrollArea class="border rounded-md">
                    <div class="p-4">
                      <div v-for="following in followingData.data.users" :key="following.userId">
                        <div class="flex-center justify-between">
                          <div class="flex-center flex-row justify-start">
                            <img :src="following.avatarUrl" class="w-60px rounded-full">
                            <div class="ml-2 flex flex-col">
                              <div class="mt-1 text-lg">{{ following.nickName }}</div>
                              <div class="text-[#33333399]">{{ following.slogan }}</div>
                            </div>
                          </div>
                          <UiButton v-if="following" variant="secondary">已关注</UiButton>
                        </div>
                        <UiSeparator class="my-2" />
                      </div>
                    </div>
                  </UiScrollArea>
                </UiTabsContent>
                <UiTabsContent value="follower">
                  <UiScrollArea class="border rounded-md">
                    <div class="p-4">
                      <div v-for="follower in followerData.data.users" :key="follower.userId">
                        <div class="flex-center justify-between">
                          <div class="flex-center flex-row justify-start">
                            <img :src="follower.avatarUrl" class="w-60px rounded-full">
                            <div class="ml-2 flex flex-col">
                              <div class="mt-1 text-lg">{{ follower.nickName }}</div>
                              <div class="text-[#33333399]">{{ follower.slogan }}</div>
                            </div>
                          </div>
                          <UiButton v-if="follower.isFollowing" variant="secondary">已关注</UiButton>
                          <UiButton v-else variant="outline">关注</UiButton>
                        </div>
                        <UiSeparator class="my-2" />
                      </div>
                    </div>
                  </UiScrollArea>
                </UiTabsContent>
              </UiTabs>
            </UiDialogContent>
          </UiDialog>
          <div>{{ data?.likeVideoCount }} 获赞</div>
        </div>
      </div>
    </div>

    <div class="border-grey mx-10 border-t-1 border-solid" />

    <div />
  </div>
  <div v-else>
    404
  </div>

</template>
