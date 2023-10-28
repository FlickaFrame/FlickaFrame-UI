<script setup lang="ts">
import Player from '@oplayer/core'
import ui from '@oplayer/ui'

const props = withDefaults(defineProps<{
  active?: boolean
}>(), {
  active: true,
})

const emits = defineEmits<{
  (e: 'update:active', value: boolean): void
}>()

const active = computed({
  get() {
    return props.active
  },
  set(value) {
    emits('update:active', value)
  },
})

function useVideo(active: Ref<boolean>) {
  const player = shallowRef<null | Player>(null)
  const videoElement = ref<HTMLVideoElement | null>(null)

  onMounted(() => {
    if (!videoElement.value) return
    player.value = Player.make(videoElement.value, {
      source: {
        src: 'https://oplayer.vercel.app/君の名は.mp4',
        poster: 'https://oplayer.vercel.app/poster.png',
      },
    })
      .use([ui()])

    watch(active, (newVal) => {
      if (newVal) {
        player.value?.create()
      } else {
        player.value?.destroy()
      }
    }, { immediate: true })
  })

  onUnmounted(() => {
    player.value?.destroy()
  })

  return { videoElement }
}

const { videoElement } = useVideo(active)

</script>

<template>
  <div class="h-full w-full bg-black">

    <NuxtImg class="h-full w-full object-contain" src="https://oplayer.vercel.app/poster.png" />

    <div v-show="active" ref="videoElement" class="h-full w-full" />
  </div>

</template>
