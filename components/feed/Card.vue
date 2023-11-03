<script setup lang='ts'>
// 340px ~ 250px random
import { useCardHeight } from '~/composables/useFeedLayout'
import type { VideoItem } from '~/models'

const props = defineProps<{
  info: VideoItem
  active?: boolean
}>()

const emit = defineEmits<{
  (e: 'hover', info: VideoItem): void
}>()

const store = useSessionStore()

const maxHeight = 500
const minHeight = 340
const height = `${Math.floor(Math.random() * (maxHeight - minHeight) + minHeight)}px`
const { rootElement } = useCardHeight()

function useVideoCard() {
  const cardElement = ref<HTMLElement | null>(null)
  const videoElement = ref<HTMLVideoElement | null>(null)
  const _isCardHovered = useElementHover(cardElement)

  const isCardHovered = computed(() => _isCardHovered.value && props.active)

  watch(_isCardHovered, (newVal) => {
    if (newVal) {
      emit('hover', props.info)
    }
  })

  watch(isCardHovered, async (newVal) => {
    await nextTick()
    if (!newVal) {
      videoElement.value?.pause()
    } else if (videoElement.value) {
      videoElement.value.volume = 0
      videoElement.value.play()
    }
  })

  return { cardElement, videoElement, isCardHovered }
}

const { cardElement, videoElement, isCardHovered } = useVideoCard()
</script>

<template>

  <div
    ref="rootElement"
    class="card w-full flex flex-col overflow-hidden rounded-5 shadow"
  >
    <div
      ref="cardElement"
      class="card-main card-height relative rounded-5 transition-400 hover:brightness-94 hover:filter"
    >
      <img
        class="card-overlay card-height"
        :class="{ 'opacity-0': isCardHovered }"
        :src="props.info.thumbUrl || 'https://oplayer.vercel.app/poster.png'"
      >
      <video
        ref="videoElement"
        class="card-overlay card-height"
        :class="{ '-z-1 opacity-0': !isCardHovered }"
        autoplay
        loop
        playsinline
        preload="none"
        wdith="100%"
        :src="props.info.playUrl"
        mediatype="video"
      />
    </div>

    <div class="cursor-pointer p-3 text-14px">
      {{ props.info.title }}
    </div>
    <div class="mb-4 flex cursor-pointer justify-between px-3 text-sm">
      <div class="flex items-center gap-1">
        <UiAvatar size="sm">
          <UiAvatarImage src="https://github.com/radix-vue.png" :alt="store.info.nickName" />
          <UiAvatarFallback>{{ store.info.nickName }}</UiAvatarFallback>
        </UiAvatar>
        <span class="text-sm text-foreground/70">
          博主名称
        </span>
      </div>
      <div class="flex items-center gap-1">
        <div class="i-mdi-like" />
        908
      </div>
    </div>
  </div>

</template>

<style scoped>
.card-overlay {
  @apply absolute left-0 top-0 h-full w-full object-cover transition-all
}

.card-height {
  height: v-bind(height);
}
</style>
