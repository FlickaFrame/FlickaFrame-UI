<script setup lang="ts">
import { ToastAction, ToastDescription, ToastRoot, ToastTitle, ToastViewport } from 'radix-vue'

type ToastType = 'notify' | 'warning'

interface ToastText {
  type?: ToastType
  title?: string
  desc: string
}

const count = ref(0)

const toastText = ref<Record<string, ToastText>>({})

function publish(text?: ToastText) {
  count.value++
  if (text) {
    text.type ??= 'notify'
    toastText.value[count.value] = text
  }
}

defineExpose({
  publish,
})

</script>

<template>

  <ToastRoot
    v-for="index in count" :key="index"
    class="[grid-template-areas:_'title_action'_'description_action'] grid grid-cols-[auto_max-content] items-center gap-x-[15px] rounded-md bg-background p-[15px] shadow-lg transition-all"
  >
    <ToastTitle class="[grid-area:_title] mb-[5px] text-[15px] text-lg text-foreground">
      <slot name="title">
        <div class="flex items-center gap-2">
          <div
            class="text-primary"
            :class="{
              'i-mdi-message': toastText[index].type === 'notify',
              'i-mdi-alert': toastText[index].type === 'warning',
            }"
          />
          <div class="font-bold text-primary/80">
            {{ toastText[index].title }}
          </div>
        </div>
      </slot>
    </ToastTitle>
    <ToastDescription as-child>
      <slot name="desc">
        {{ toastText[index].desc }}
      </slot>
    </ToastDescription>
    <ToastAction class="[grid-area:_action]" as-child alt-text="null">
      <slot name="action">
        <UiButton variant="outline" size="icon">
          <div class="i-mdi-close inline-block" />
        </UiButton>
      </slot>
    </ToastAction>
  </ToastRoot>

  <ToastViewport
    class="[--viewport-padding:_25px] fixed right-0 top-0 z-[2147483647] m-0 max-w-[100vw] w-[390px] flex flex-col list-none gap-[10px] p-[var(--viewport-padding)] outline-none"
  />

</template>
