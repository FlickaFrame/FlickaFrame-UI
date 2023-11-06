<script setup lang="ts">
const props = defineProps<{
  liked: boolean
  likedCount: number

  showShare: boolean
}>()

const emit = defineEmits<{
  (e: 'like'): void
  (e: 'unlike'): void
  (e: 'reply'): void
  (e: 'share'): void
}>()

</script>

<template>
  <div class="flex items-center text-base">
    <div class="wrapper">
      <div
        class="icon"
        :class="props.liked ? 'i-iconamoon-like' : 'i-iconamoon-like-fill'"
        @click="() => props.liked ? emit('unlike') : emit('like')"
      />
      <div class="text">赞 {{ props.likedCount || '' }}</div>
    </div>

    <div class="wrapper" @click="() => emit('reply')">
      <div class="icon i-iconamoon-comment" />
      <div class="text">3</div>
    </div>
    <div class="flex-1" />

    <div v-if="props.showShare" class="wrapper" @click="() => emit('share')">
      <div class="icon i-mdi-share" />
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
