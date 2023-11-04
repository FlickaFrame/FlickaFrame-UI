<script setup lang="ts">
import { getCagegory } from '~/apis'

const selectedId = defineModel({ default: 1 })

const { data } = useAsyncData(async () => {
  const res = await getCagegory()
  if (!res.success) message.error('获取分类失败')
  return res.success ? res.data.categoryList : []
})

</script>

<template>

  <div class="z-10 flex flex-wrap justify-start gap-6 overflow-hidden px-6 py-3">
    <UiButton
      v-for="item in data"
      :key="item.id" variant="outline"
      class="h-8 whitespace-nowrap border-accent/50 rounded-sm bg-accent/20 hover:bg-foreground/10"
      :class="{ selected: selectedId === item.id }"
      @click="selectedId = item.id"
    >
      {{ item.name }}
    </UiButton>
  </div>

</template>

<style scoped>
.selected {
  @apply bg-foreground/10
}
</style>
