<script setup lang="ts">
import type { VideoItem } from '~/models'
import { getVideoInfo } from '~/apis'

const route = useRoute()

const cardInfo = ref<VideoItem>()

if (route.params.id) {
  const { success, data } = await getVideoInfo(route.params.id as string)
  if (success) {
    cardInfo.value = data.video
  }
}

</script>

<template>
  <div>
    <FeedMain v-if="!route.params.id" />
    <div v-else class="mt-10 w-full flex-center">
      <FeedContent
        :info="cardInfo"
        :active="true"
      />
    </div>

  </div>

</template>
