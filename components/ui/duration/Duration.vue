<script setup lang="ts">
function formatDuration(duration: number) {
  const min = String(Math.floor(duration / 60)).padStart(2, '0')
  const sec = String(Math.floor(duration % 60)).padStart(2, '0')
  return `${min}:${sec}`
}

 defineProps<{
   value: number
 }>

</script>

<template>
  <span>{{ formatDuration(value) || '00:00' }}</span>
</template>
