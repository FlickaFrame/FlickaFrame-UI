<script setup lang="ts">

import { followUser, getMyFollowerList, getMyFollowingList, getUserInfoById, unfollowUser } from '~/apis'
import type { Follow, FollowListResponse, FollowPageOption } from '~/models/follow'

enum TabModel {
  Following = 'following',
  Follower = 'follower',
}

const route = useRoute()
const { success, data } = await getUserInfoById(Number(route.params.id as string))
const tabModelValue = ref<TabModel>(TabModel.Following)
const pageOption: FollowPageOption = {
  page: 1,
  pageSize: 10,
  listAll: false,
}

const { data: followingList } = useFollowList(getMyFollowingList)
const { data: followerList } = useFollowList(getMyFollowerList)

function useFollowList(requestFn: (pageOption: FollowPageOption) => Promise<ApiResult<FollowListResponse>>) {
  return useAsyncData(async () => {
    const res = await requestFn(pageOption)
    if (!res.success) message.error('获取关注列表失败')
    return res.success ? res.data.users : []
  })
}

async function changeFollowStatus(type: TabModel, idx: number) {
  let followList = null
  if (type === TabModel.Follower) followList = followerList
  else followList = followingList

  if (!followList.value) return
  if (followList.value[idx].isFollowing) {
    const res = await unfollowUser(followList.value[idx].userId)
    if (!res.success) {
      message.error('取消关注失败')
    } else {
      followList.value[idx].isFollowing = false
      message.info('取消关注成功')
    }
  } else {
    const res = await followUser(followList.value[idx].userId)
    if (!res.success) {
      message.error('关注失败')
    } else {
      followList.value[idx].isFollowing = true
      message.info('关注成功')
    }
  }
}

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
            <UiDialogContent class="p-10 sm:max-w-[625px]">
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
                      <div v-for="following, idx in followingList" :key="following.userId">
                        <div class="flex-center justify-between">
                          <div class="flex-center flex-row justify-start">
                            <img :src="following.avatarUrl" class="w-60px rounded-full">
                            <div class="ml-2 flex flex-col">
                              <div class="mt-1 text-lg">{{ following.nickName }}</div>
                              <div class="text-[#33333399]">{{ following.slogan }}</div>
                            </div>
                          </div>
                          <UiButton v-if="following.isFollowing" variant="secondary" @click="changeFollowStatus(TabModel.Following, idx)">已关注</UiButton>
                          <UiButton v-else variant="outline" @click="changeFollowStatus(TabModel.Following, idx)">关注</UiButton>
                        </div>
                        <UiSeparator class="my-2" />
                      </div>
                    </div>
                  </UiScrollArea>
                </UiTabsContent>
                <UiTabsContent value="follower">
                  <UiScrollArea class="border rounded-md">
                    <div class="p-4">
                      <div v-for="follower, idx in followerList" :key="follower.userId">
                        <div class="flex-center justify-between">
                          <div class="flex-center flex-row justify-start">
                            <img :src="follower.avatarUrl" class="w-60px rounded-full">
                            <div class="ml-2 flex flex-col">
                              <div class="mt-1 text-lg">{{ follower.nickName }}</div>
                              <div class="text-[#33333399]">{{ follower.slogan }}</div>
                            </div>
                          </div>
                          <UiButton v-if="follower.isFollowing" variant="secondary" @click="handleUnFollow(TabModel.Follower, idx)">已关注</UiButton>
                          <UiButton v-else variant="outline" @click="handleFollow(TabModel.Follower, idx)">关注</UiButton>
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
