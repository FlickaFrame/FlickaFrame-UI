<script setup lang="ts">
defineProps<{
  value: number
}>()

function formatDuration(duration: number) {
  const min = String(Math.floor(duration / 60)).padStart(2, '0')
  const sec = String(Math.floor(duration % 60)).padStart(2, '0')
  return `${min}:${sec}`
}

</script>

<template>
  <span>{{ formatDuration(value) || '00:00' }}</span>
</template>
