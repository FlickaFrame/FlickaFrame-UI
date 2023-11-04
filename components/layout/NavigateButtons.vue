<script setup lang="ts">
interface MenuItem {
  icon: string
  text: string
  path: string
  show?: boolean
}

const props = defineProps<{
  menus: MenuItem[]
}>()

const route = useRoute()

</script>

<template>
  <div class="space-y-2">

    <template
      v-for="item in props.menus"
      :key="item.text"
    >
      <UiButton
        v-if="item.show !== false"
        :variant="route.path === item.path ? 'secondary' : 'ghost'"
        size="lg"
        class="w-full justify-start"
        @click="navigateTo(item.path)"
      >
        <div class="mr-2 text-xl" :class="item.icon" />
        {{ item.text }}
      </UiButton>

    </template>

  </div>

</template>
