<script setup lang="ts">
const text = `
姐妹们，马上要入职小红书啦📕 \n有没有近几天就可以入住的房子🏠推荐一下呀！`.trim()

</script>

<template>
  <div class="w-10 flex flex-col">
    <!-- 博主 -->
    <div class="flex-center gap-2 px-6 py-8">
      <UiAvatar>
        <UiAvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
        <UiAvatarFallback>CN</UiAvatarFallback>
      </UiAvatar>
      <div class="flex-1 text-lg">
        用户名
      </div>
      <UiButton size="lg">关注</UiButton>

    </div>
    <!-- post简介 -->
    <div class="px-6">
      <h1 class="pb-2 text-2xl font-semibold tracking-tight"> 这是标题这是标题</h1>

      <div class="whitespace-pre-wrap text-lg"> {{ text }} </div>

      <div class="pb-2">
        <UiButton v-for="item in 10" :key="item" variant="link" size="lg" class="h-7 px-1"> #小红书实习</UiButton>
      </div>
      <div class="text-foreground/50"> 2023-10-31 东北 </div>
      <UiSeparator class="mt-6" />
    </div>
    <!-- post评论 -->
    <div class="flex-1 overflow-y-scroll px-6 pt-6">
      <div class="mb-4 text-gray/90">
        共 13 条评论
      </div>
      <FeedInteractionCommentItem />

      <FeedInteractionCommentItem class="ml-14" />
      <FeedInteractionCommentItem class="ml-14" />

    </div>
    <UiSeparator />
    <!-- post 互动区域 -->
    <div>
      <FeedInteractionLine class="my-4 px-8 text-2xl" />

      <FeedInteractionInput class="my-6 px-8" />

    </div>

  </div>

</template>
