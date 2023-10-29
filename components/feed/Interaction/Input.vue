<script setup lang='ts'>
const text = ref('')
const atElement = ref<HTMLElement | null>(null)
const { width: atElementWidth } = useElementSize(atElement)

const inputFoucsed = ref(false)

const showAtBadge = ref(true)

onKeyStroke('Backspace', () => {
  if (text.value) return
  if (!inputFoucsed.value) return

  showAtBadge.value = false
})

</script>

<template>
  <div class="flex items-center gap-2 transition-all">

    <div class="relative flex-1">
      <UiInput
        v-model:is-focus="inputFoucsed"
        v-model="text"
        :style="{
          paddingLeft: showAtBadge ? `calc(${atElementWidth}px + 2.5rem)` : '0.75rem',
        }"
        class="input h-12 text-base"
        required
        aria-placeholder="说点什么吧..."
      />
      <div class="input-hint pointer-events-none absolute top-0 h-full w-full flex items-center pl-4 text-foreground/40">

        <template v-if="!showAtBadge && !text">
          <div class="i-mdi-pencil-plus-outline mr-2" />
          说点什么吧....
        </template>
        <template v-else-if="showAtBadge">
          <div ref="atElement" class="rounded bg-foreground/10 px-2 py-1 text-foreground/70">
            @花无缺
          </div>
        </template>

      </div>
    </div>

    <UiButton
      v-if="text"
      type="submit" class="h-12 rounded-sm text-base transition-all"
    >
      发送
    </UiButton>
  </div>

</template>
