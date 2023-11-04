<script setup lang='ts'>
const selectedValue = defineModel<number>({ default: 1 })
const radioOptions = [
  { label: '公开', value: 1 },
  { label: '私有', value: 2 },
]
</script>

<template>
  <div class="w-full border rounded-lg p-4">
    <ARadioGroup v-model:value="selectedValue">
      <ARadio v-for="item in radioOptions" :key="item.value" :value="item.value">{{ item.label }}</ARadio>
    </ARadioGroup>
  </div>
</template>
