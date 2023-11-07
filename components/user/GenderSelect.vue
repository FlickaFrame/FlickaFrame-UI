<script setup lang='ts'>
import { UserGender } from '~/models'

const selectedValue = defineModel<UserGender>({ default: UserGender.Unknown })
const radioOptions = [
  { label: '男', value: UserGender.Male },
  { label: '女', value: UserGender.Female },
  { label: '未知', value: UserGender.Unknown },
]
</script>

<template>
  <div class="w-full border rounded-lg p-4">
    <ARadioGroup v-model:value="selectedValue">
      <ARadio v-for="item in radioOptions" :key="item.value" :value="item.value">{{ item.label }}</ARadio>
    </ARadioGroup>
  </div>
</template>
