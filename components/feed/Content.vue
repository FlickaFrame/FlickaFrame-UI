<script setup lang="ts">
const props = withDefaults(defineProps<{
  active?: boolean
}>(), {
  active: true,
})

</script>

<template>
  <div
    class="flex overflow-hidden border rounded-lg shadow-lg transition-all"
    :class="props.active ? '' : 'filter-blur-1 brightness-80 hover:cursor-pointer'"
  >
    <UiPlayer class="h-full flex-[2_2_0%]" />
    <FeedInteraction class="h-full max-w-300 flex-[1_1_0%] bg-background" />
  </div>
</template>
