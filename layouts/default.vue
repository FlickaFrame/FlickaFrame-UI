<script setup lang="ts">
import { ToastProvider } from 'radix-vue'

</script>

<template>

  <div class="default-layout h-screen w-screen">
    <AStyleProvider hash-priority="high">
      <ToastProvider>

        <BaseHeader class="col-span-2" />
        <BaseSidebar class="row-start-2 row-end-3" />
        <div class="col-span-1 row-span-1 overflow-y-scroll">
          <slot />
        </div>
        <UiToast root />
      </ToastProvider>
    </AStyleProvider>

  </div>

</template>

<style scoped>
.default-layout {
  display: grid;
  grid-template-columns: 18rem minmax(0, 1fr);
  grid-template-rows: 6rem minmax(0, 1fr);
}

</style>
