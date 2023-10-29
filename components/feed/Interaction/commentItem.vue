<script setup lang="ts">
const props = defineProps<{
  type?: 'top' | 'sub'
}>()

const comment = '家人们，我去店里问，线只有一年的保修，所以我又买了一根，不过我买的c口的线，店员跟我说c口充电不影响，只要你正常使用官网的充电器就行'
</script>

<template>
  <div
    class="flex gap-4 py-2"
    :class="{
      'ml-14': props.type === 'sub',
    }"
  >
    <UiAvatar>
      <UiAvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
      <UiAvatarFallback>花无缺</UiAvatarFallback>
    </UiAvatar>
    <div class="flex-1">
      <div class="flex-1">
        <div class="mb-2 flex items-center gap-2 text-lg text-foreground/50"> 花无缺

          <UiBadge variant="outline">作者</UiBadge>
        </div>
        <div class="mb-2 whitespace-pre-wrap text-base"> {{ comment }}</div>
        <div class="mb-1 text-foreground/50"> 2023-10-31 东北 </div>

        <FeedInteractionLine class="text-lg" />

      </div>

    </div>

  </div>

</template>
