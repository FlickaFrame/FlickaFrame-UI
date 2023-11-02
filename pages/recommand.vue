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
    <SwiperSlide v-for="slide in 1000" :key="slide">
      <UiPlayer />
    </SwiperSlide>
  </Swiper>

</template>
