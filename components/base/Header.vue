<script setup lang="ts">
import Logo from '~/assets/logo.png'

</script>

<template>

  <nav class="border-b border-slate flex gap-2 fixed h-20 w-full justify-between items-center top-0">
    <img :src="Logo" alt="logo" class="w-80">
    <input
      type="text" class="border border-blue rounded shadow flex-1 h-10 max-w-1/2"
      placeholder="这是搜索框"
    >
    <div>
      这是头像 个人信息
    </div>
  </nav>

</template>

<style scoped>
nav {
  background-image: radial-gradient(transparent 1px, white, 1px);
  background-size: 4px 4px;
  backdrop-filter: saturate(50%) blur(4px);
}

</style>
