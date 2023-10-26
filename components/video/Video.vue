<script setup lang="ts">
import videojs from 'video.js'
import video_zhCN from 'video.js/dist/lang/zh-CN.json'
import 'video.js/dist/video-js.min.css'

function useVideo() {
  const videoElement = ref<HTMLVideoElement | null>(null)
  let player = null as any
  const videoOptions = {
    autoplay: false,
    controls: true,
    language: 'zh-CN',
    fluid: true,
    sources: [
      {
        src: 'http://s2i8a2ssf.hn-bkt.clouddn.com/video/6d6c521d39d75d11122be3487982e20c_raw.mp4?e=1698298991&token=vD-nopq_rDM_3B0Q6Xn6i4AfqEf9CLkaY9LxUOL5:ZT1khoO7TiF2RnA-Jl-cW6HY6Ts=',
        type: 'video/mp4',
      },
    ],
  }
  onMounted(() => {
    if (!videoElement.value) return
    player = videojs(videoElement.value, videoOptions, () => {

    })
  })

  onUnmounted(() => {
    player && player.dispose()
  })

  return { videoElement }
}

const { videoElement } = useVideo()

</script>

<template>
  <div id="warp" class="player-wrap">
    <video ref="videoElement" class="video-js vjs-big-play-centered" />
  </div>
</template>
