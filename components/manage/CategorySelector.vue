<script setup lang='ts'>
const selectedValue = defineModel<number>({ default: 1 })

const { data, pending } = useFetch('/api/video/category')

</script>

<template>
  <UiSelect v-model="selectedValue">

    <UiSelectTrigger>
      <UiSelectValue :placeholder="pending ? '加载中' : '选择分类' " :default="1" />
    </UiSelectTrigger>

    <UiSelectContent>
      <UiSelectGroup v-for="item in data?.data.categoryList" :key="item.id">
        <UiSelectItem :value="item.id">
          {{ item.name }}
        </UiSelectItem>

      </UiSelectGroup>
    </UiSelectContent>
  </UiSelect>

</template>
