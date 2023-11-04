<script setup lang='ts'>
import { getCagegory } from '~/apis'
const selectedValue = defineModel<number>({ default: 1 })

const { data, pending } = useAsyncData(async () => {
  const { data, success } = await getCagegory()
  return success ? data.categoryList : []
})

</script>

<template>
  <UiSelect v-model="selectedValue">

    <UiSelectTrigger>
      <UiSelectValue :placeholder="pending ? '加载中' : '选择分类' " />
    </UiSelectTrigger>

    <UiSelectContent>
      <UiSelectGroup v-for="item in data" :key="item.id">
        <UiSelectItem :value="item.id">
          {{ item.name }}
        </UiSelectItem>

      </UiSelectGroup>
    </UiSelectContent>
  </UiSelect>

</template>
