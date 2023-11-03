<script setup lang='ts'>
import { getCagegory } from '~/apis'
const selectedValue = defineModel<number>({ default: 1 })

const { data } = useAsyncData(async () => {
  const res = await getCagegory()
  return res.data.categoryList
})

</script>

<template>
  <UiSelect v-model="selectedValue">

    <UiSelectTrigger>
      <UiSelectValue :placeholder="pending ? '加载中' : '选择分类' " :default="1" />
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
