<script setup lang="ts">
import Player from '@oplayer/core'
import ui from 'oplayer-ui-plus'

const props = withDefaults(defineProps<{
  active?: boolean
  url: string
}>(), {
  active: true,
})

const expland = defineModel('expland', { default: false })

const oui = ui({
  keyboard: {
    focused: false,
    global: false,
  },
  rightController: {
    items: [
      {
        name: '评论',
        iconSvg: '<div class="i-mdi-comment" />',
        defaultText: '',
      },
    ],
    onClick: (name: string) => {
      if (name === '评论') {
        expland.value = !expland.value
      }
    },
  },
})

function useVideo() {
  const player = shallowRef<null | Player>(null)
  const videoElement = ref<HTMLVideoElement | null>(null)

  onMounted(() => {
    if (!videoElement.value) return
    player.value = Player.make(videoElement.value, {
      source: {
        src: props.url,
        // poster: 'https://oplayer.vercel.app/poster.png',
      },
    })
      .use([oui])
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
  <div class="bg-black">
    <div v-show="props.active" ref="videoElement" class="h-full w-full" />
  </div>

</template>
