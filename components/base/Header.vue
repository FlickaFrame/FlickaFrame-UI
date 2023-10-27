<script setup lang="ts">
import Logo from '~/assets/logo.png'

</script>

<template>

  <nav class="flex items-center justify-between gap-2 border-b border-slate px-4">
    <img :src="Logo" alt="logo" class="w-80">

    <UiInput class="h-12 max-w-240 text-lg" placeholder="这是搜索框" />

    <UiButton variant="secondary" class="mr-4 flex-center gap-2 py-8 text-lg">
      <UiAvatar>
        <UiAvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
        <UiAvatarFallback>CN</UiAvatarFallback>
      </UiAvatar>

      测试用户
    </UiButton>
  </nav>

</template>

<style scoped>
nav {
  background-image: radial-gradient(transparent 1px, white, 1px);
  background-size: 4px 4px;
  backdrop-filter: saturate(50%) blur(4px);
}

</style>
