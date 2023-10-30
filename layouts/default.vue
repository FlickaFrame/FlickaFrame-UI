<script setup lang="ts">
import { ToastProvider } from 'radix-vue'

</script>

<template>
  <ToastProvider>
    <div class="default-layout h-screen w-screen">

      <BaseHeader class="col-span-2" />
      <BaseSidebar class="row-start-2 row-end-3" />
      <div class="col-span-1 row-span-1 overflow-y-scroll px-16 py-8">
        <slot />
      </div>

    </div>
    <UiToast />
  </ToastProvider>

</template>

<style scoped>
.default-layout {
  display: grid;
  grid-template-columns: 18rem minmax(0, 1fr);
  grid-template-rows: 6rem minmax(0, 1fr);
}

</style>
