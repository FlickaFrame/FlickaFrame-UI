<script setup lang="ts">

const tags = defineModel<string[]>({ default: [] })

</script>

<template>
  <div class="flex flex-wrap gap-2">

    <span
      v-for="item, idx in tags"
      :key="idx"
      class="inline-flex items-center rounded-sm bg-secondary/90 p-1.5 pl-2 text-nowrap text-sm text-foreground/80"
    >
      #{{ item }}
      <div
        class="ml-1 rounded-full p-1px text-black/50 transition-all hover:bg-black/10"
        @click="tags.splice(idx, 1)"
      >
        <div class="i-mdi-close" />
      </div>
    </span>

    <UiTagAddButton @select="(val: string) => tags.push(val)" />

  </div>

</template>
