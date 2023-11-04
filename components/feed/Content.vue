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
    <UiPlayer :active="active" :url="info.playUrl" class="h-full flex-[2_2_0%]" />
    <FeedInteraction
      :info="info"
      class="h-full max-w-300 flex-[1_1_0%] bg-background"
      @refresh="refreshVideoInfo"
    />
  </div>
</template>
