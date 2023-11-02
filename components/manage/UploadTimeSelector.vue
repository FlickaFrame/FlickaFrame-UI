<script setup lang="ts">
import type { Dayjs } from 'dayjs'

const props = defineProps<{
  modelValue: number | undefined
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: number | undefined): void
}>()
const dayjs = useDayjs()
const checked = ref(false)

const date = computed<Dayjs | undefined>({
  get() {
    return props.modelValue ? dayjs(props.modelValue) : undefined
  },
  set(val) {
    emit('update:modelValue', val ? dayjs(val).valueOf() : undefined)
  },
})

watch(checked, (val) => {
  if (val) {
    date.value = dayjs()
  } else {
    date.value = undefined
  }
}, { immediate: true })

</script>

<template>
  <div class="h-10 flex items-center gap-2 border rounded-lg px-4 py-8 text-sm">
    定时发布：{{ checked ? '开' : '关' }}
    <UiSwitch v-model:checked="checked" />
    <ADatePicker v-show="checked" v-model:value="date" show-time />

  </div>

</template>
