<script setup lang="ts">

interface Candidates {
  value: string
  label: string
}

const emit = defineEmits<{
  (e: 'select', value: string): void
}>()

const statuses: Candidates[] = []

const currentInput = ref('')

const filteredStatuses = computed(() => {
  if (!currentInput.value) return []
  return statuses.filter(status =>
    status.label.toLowerCase().includes(currentInput.value.toLowerCase()),
  )
})

const open = ref(false)

function onEnter() {
  const value = currentInput.value.trim()
  if (!value) return
  emit('select', value)
  currentInput.value = ''
  open.value = false
}

</script>

<template>

  <UiPopover v-model:open="open">
    <UiPopoverTrigger as-child>
      <UiButton
        variant="outline"
        size="sm"
        class="justify-start rounded-sm"
      >
        ➕ 增加标签
      </UiButton>
    </UiPopoverTrigger>
    <UiPopoverContent class="p-0" side="top" align="start">
      <UiCommand>
        <UiInput
          v-model="currentInput"
          class="focus-visible:ring-offset-0"
          @keyup.enter="onEnter"
        />
        <UiCommandList>
          <UiCommandGroup>
            <template v-if="filteredStatuses.length === 0">
              <span class="inline-flex items-center p-2 text-sm opacity-70">
                {{ currentInput.trim() ? `为 ${currentInput} 创建标签` : '请输入标签' }}
              </span>
            </template>
            <template v-else>
              <UiCommandItem
                v-for="status in filteredStatuses"
                :key="status.value"
                :value="status.value"
                @select="() => {
                  emit('select', status.value)
                  open = false
                }"
              >
                <code>#&nbsp;</code>
                <span>{{ status.label }}</span>
              </UiCommandItem>
            </template>
          </UiCommandGroup>
        </UiCommandList>
      </UiCommand>
    </UiPopoverContent>
  </UiPopover>

</template>
