<script setup lang="ts">
import type { VideoItem } from '~/models'
import { getVideoInfo } from '~/apis'
const props = withDefaults(defineProps<{
  info: VideoItem
  active?: boolean
}>(), {
  active: true,
})
const info = ref(props.info)

const expland = ref(true)

async function refreshVideoInfo() {
  const { success, data } = await getVideoInfo(info.value.id)

  if (success) {
    info.value = data.video
  } else {
    message.error('获取视频信息失败')
  }
}

</script>

<template>
  <div
    class="flex overflow-hidden border rounded-lg shadow-lg"
    :class="props.active ? '' : 'filter-blur-1 brightness-80 hover:cursor-pointer'"
  >
    <UiPlayer
      v-model:expland="expland"
      :active="active"
      :url="info.playUrl"
      class="h-full min-w-200"
    />
    <FeedInteraction
      v-show="expland"
      :info="info"
      class="h-full bg-background md:hidden 2xl:w-120 lg:w-100 lg:flex"
      @refresh="refreshVideoInfo"
    />
  </div>
</template>
