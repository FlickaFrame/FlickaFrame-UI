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
    class="card w-full flex flex-col overflow-hidden rounded-5 bg-gray-100 shadow"
  >

    <NuxtImg
      :style="{ height: `${height}px` }"
      class="origin-bottom rounded-5 object-cover transition-all hover:scale-110"
      src="https://oplayer.vercel.app/poster.png"
    />

    <div class="mt-4 px-3">
      这是标题这是标题这是标题这是标题
    </div>
    <div class="mb-4 flex justify-between px-3">
      <div>博主名称</div>
      <div>点赞数量</div>
    </div>
  </div>

</template>
