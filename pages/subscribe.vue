<script setup lang="ts">
import { getFollowingVideo } from '~/apis'

const { feedList, isEnd, addMore, pending } = useFeedData(ref('0'), {}, getFollowingVideo)

</script>

<template>
  <div class="flex gap-8 px-8">

    <div class="flex-1">
      <FeedActivity v-for="item in feedList" :key="item.id" :info="item" />
    </div>

    <div class="sticky top-8 h-100 w-100 rounded-lg bg-gray/90">

      推荐的博主
    </div>

  </div>

</template>
