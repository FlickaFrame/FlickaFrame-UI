<template>
  <div class="flex items-center">
    <div class="wrapper like text-xl">
      <div class="icon i-iconamoon-like" />
      <div class="text">赞</div>
    </div>

    <div class="wrapper text-xl">
      <div class="icon i-iconamoon-comment" />
      <div class="text">3</div>
    </div>

  </div>

</template>

<style scoped>
.wrapper {
  @apply flex-center;
  &:hover {
    @apply font-semibold cursor-pointer;
    & > .icon {
      @apply scale-115;
    }
  }
  & > .icon {
    @apply transition-all;
  }
  & > .text {
    @apply ml-1 mr-4 text-[0.9em];
  }
}

</style>
