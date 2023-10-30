<script setup lang="ts">
import { ToastAction, ToastDescription, ToastRoot, ToastTitle, ToastViewport } from 'radix-vue'
import type { ToastContent } from './'

const props = defineProps<{
  root?: boolean
}>()

const count = ref(0)

const toastRecord = ref<Record<string, ToastContent>>({})

function publish(text: ToastContent | string) {
  if (typeof text === 'string') {
    text = { desc: text }
  }

  count.value++
  if (text) {
    text.type ??= 'notify'
    toastRecord.value[count.value] = text
  }
}

if (props.root) {
  toast.publish = publish
}

defineExpose({ publish })

</script>

<template>

  <ToastRoot
    v-for="index in count"
    :key="index"
    :duration="toastRecord[index].duration"
    class="toast [grid-template-areas:_'title_action'_'description_action'] grid grid-cols-[auto_max-content] items-center gap-x-[15px] rounded-md bg-background p-[15px] shadow-lg"
  >
    <ToastTitle class="[grid-area:_title] mb-[5px] text-[15px] text-lg text-foreground">
      <slot name="title">
        <div class="flex items-center gap-2">
          <div
            class="text-primary"
            :class="{
              'i-mdi-message': toastRecord[index].type === 'notify',
              'i-mdi-alert text-red': toastRecord[index].type === 'warning',
            }"
          />
          <div class="font-bold text-primary/80">
            {{ toastRecord[index].title }}
          </div>
        </div>
      </slot>
    </ToastTitle>
    <ToastDescription as-child>
      <slot name="desc">
        {{ toastRecord[index].desc }}
      </slot>
    </ToastDescription>
    <ToastAction class="[grid-area:_action]" as-child alt-text="toast-action">
      <slot name="action">
        <UiButton variant="outline" size="icon">
          <div class="i-mdi-close inline-block" />
        </UiButton>
      </slot>
    </ToastAction>
  </ToastRoot>

  <ToastViewport
    as="div"
    class="fixed right-6 top-6 z-[2147483647] m-0 w-390px flex flex-col list-none gap-10px outline-none"
  />

</template>

<style>
.toast {
  &[data-state=open] {
    @apply animate-slide-in-right animate-duration-200 animate-ease-in-out;
  }

  &[data-state=closed] {
    @apply animate-slide-out-right animate-duration-200 animate-ease-in-out;
  }

  &[data-state=cancel] {
    @apply animate-slide-out-right animate-duration-200 animate-ease-in-out;
  }

  &[data-state=end] {
    @apply animate-slide-out-right animate-duration-200 animate-ease-in-out;
  }

  &[data-state=move] {
    @apply translate-x-[var(--radix-toast-swipe-move-x)];
  }

}
</style>
