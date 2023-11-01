<script setup lang='ts'>

const selectedValue = defineModel<string>({ default: '' })
</script>

<template>
  <UiSelect v-model="selectedValue">

    <UiSelectTrigger>
      <UiSelectValue placeholder="为你的视频选择合适分类吧" default="动漫" />
    </UiSelectTrigger>

    <UiSelectContent>
      <UiSelectGroup>
        <UiSelectItem value="动漫">
          动漫
        </UiSelectItem>
        <UiSelectItem value="游戏">
          游戏
        </UiSelectItem>
        <UiSelectItem value="美食">
          美食
        </UiSelectItem>
      </UiSelectGroup>
    </UiSelectContent>
  </UiSelect>

</template>
