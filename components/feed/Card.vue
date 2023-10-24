<script setup lang='ts'>
// 340px ~ 250px random
import { useCardHeight } from '~/composables/useFeedLayout'

const maxHeight = 500
const minHeight = 340
const height = Math.floor(Math.random() * (maxHeight - minHeight) + minHeight)
const { rootElement } = useCardHeight()
</script>

<template>
  <div
    ref="rootElement"
    class="card bg-gray-100 rounded-5 shadow flex flex-col w-full"
  >
    <div class="bg-slate-200 rounded-5" :style="{ height: `${height}px` }">
      this is picdsadsa

    </div>
    <div class="px-3 mt-4">
      这是标题这是标题这是标题这是标题
    </div>
    <div class="px-3 mb-4 flex justify-between">
      <div>博主名称</div>
      <div>点赞数量</div>
    </div>
  </div>

</template>

<style scoped>
.card {
  view-transition-name: var(--i);
}

</style>
