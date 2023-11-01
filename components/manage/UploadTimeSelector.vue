<script setup lang="ts">
import type { Dayjs } from 'dayjs'

const props = defineProps<{
  modelValue?: Dayjs
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val?: Dayjs): void
}>()
const dayjs = useDayjs()
const checked = ref(false)

const date = computed<Dayjs | undefined>({
  get() {
    return props.modelValue || undefined
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

watch(checked, (val) => {
  if (val) {
    date.value = dayjs()
  } else {
    date.value = undefined
  }
})

</script>

<template>
  <div class="h-10 flex items-center gap-2 border rounded-lg px-4 py-8 text-sm">
    延时上传：{{ checked ? '开' : '关' }}
    <UiSwitch v-model:checked="checked" />
    <ADatePicker v-show="checked" v-model:value="date" show-time />
    {{ date }}

  </div>

</template>
