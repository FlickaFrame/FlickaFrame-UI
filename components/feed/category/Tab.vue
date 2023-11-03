<script setup lang="ts">
import { getCagegory } from '~/apis'

const { data } = useAsyncData(async () => {
  const res = await getCagegory()
  if (!res.success) message.error('获取分类失败')
  return res.success ? res.data.categoryList : []
})

const currentSelected = ref(1)

</script>

<template>

  <div class="flex flex-wrap justify-start gap-6 overflow-hidden bg-background px-6 py-3">
    <UiButton
      v-for="item in data"
      :key="item.id" variant="outline"
      class="h-8 whitespace-nowrap border-accent/50 rounded-sm bg-accent/20 hover:bg-foreground/10"
      :class="{ selected: currentSelected === item.id }"
      @click="currentSelected = item.id"
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
