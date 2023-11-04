<script setup lang="ts">
import Player from '@oplayer/core'
import ui from '@oplayer/ui'

const props = withDefaults(defineProps<{
  active?: boolean
  url: string
}>(), {
  active: true,
})

function useVideo() {
  const player = shallowRef<null | Player>(null)
  const videoElement = ref<HTMLVideoElement | null>(null)

  onMounted(() => {
    if (!videoElement.value) return
    player.value = Player.make(videoElement.value, {
      source: {
        src: props.url,
        poster: 'https://oplayer.vercel.app/poster.png',
      },
    })
      .use([ui({
        keyboard: {
          focused: false,
          global: false,
        },
      })])
      .create()

    watch(() => props.active, (newVal) => {
      if (newVal) {
        player.value?.play()
      } else {
        player.value?.pause()
      }
    })
  })

  onUnmounted(() => {
    player.value?.destroy()
  })

  return { videoElement }
}

const { videoElement } = useVideo()

</script>

<template>
  <div class="h-full w-full bg-black">
    <NuxtImg v-show="!props.active" class="h-full w-full object-contain" src="https://oplayer.vercel.app/poster.png" />
    <div v-show="props.active" ref="videoElement" class="h-full w-full" />
  </div>

</template>
