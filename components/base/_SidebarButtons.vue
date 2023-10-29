<script setup lang="ts">
interface MenuItem {
  icon: string
  text: string
  path: string
}

const props = defineProps<{
  menus: MenuItem[]
}>()

const router = useRouter()

const route = useRoute()

</script>

<template>
  <div class="space-y-2">
    <UiButton
      v-for="item in props.menus"
      :key="item.text"
      :variant="route.path === item.path ? 'secondary' : 'ghost'"
      size="lg"
      class="w-full justify-start"
      @click="router.push(item.path)"
    >
      <div class="mr-2 text-xl" :class="item.icon" />
      {{ item.text }}
    </UiButton>
  </div>

</template>
