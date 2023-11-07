<script setup lang="ts">

const value = defineModel({ default: 18 })

</script>

<template>
  <AInputNumber v-model:value="value" :precision="0" size="large" :min="1" :max="190" />

</template>
