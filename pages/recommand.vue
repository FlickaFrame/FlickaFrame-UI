<script setup lang="ts">

const { feedList, isEnd, addMore, pending } = useFeedData(ref('0'))
</script>

<template>

  <Swiper
    class="h-full"
    :modules="[SwiperAutoplay, SwiperVirtual]"
    :slides-per-view="1"
    :loop="true"
    effect="creative"
    direction="vertical"
    virtual
  >
    <!--  :virtual="true" -->
    <SwiperSlide v-for="feed in feedList" :key="feed.id">
      <UiPlayer :url="feed.playUrl" class="h-full w-full" />
    </SwiperSlide>
  </Swiper>

</template>
