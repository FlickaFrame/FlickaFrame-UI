<script setup lang="ts">
import type { VideoItem } from '~/models'
const props = withDefaults(defineProps<{
  info: VideoItem
  active?: boolean
}>(), {
  active: true,
})

</script>

<template>
  <div
    class="flex overflow-hidden border rounded-lg shadow-lg"
    :class="props.active ? '' : 'filter-blur-1 brightness-80 hover:cursor-pointer'"
  >
    <UiPlayer :active="active" :url="info.playUrl" class="h-full flex-[2_2_0%]" />
    <FeedInteraction class="h-full max-w-300 flex-[1_1_0%] bg-background" />
  </div>
</template>
