<template>
  <div class="flex gap-8 px-8">
    <div class="flex-1">
      <FeedActivity v-for="item in 10" :key="item" />
    </div>

    <div class="sticky top-8 h-100 w-100 rounded-lg bg-gray/90">

      推荐的博主
    </div>

  </div>

</template>
