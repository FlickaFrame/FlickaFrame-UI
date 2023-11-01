<script setup lang='ts'>
const selectedValue = defineModel<number>({ default: 1 })

</script>

<template>
  <UiRadioGroup v-model="selectedValue" default-value="option-one" class="gap-8 border rounded-lg p-4">
    <div class="flex items-center space-x-2">
      <UiRadioGroupItem id="option-one" :value="1" />
      <UiLabel for="option-one">公开</UiLabel>
    </div>
    <div class="flex items-center space-x-2">
      <UiRadioGroupItem id="option-two" :value="2" />
      <UiLabel for="option-two">私有</UiLabel>
    </div>
  </UiRadioGroup>
</template>
