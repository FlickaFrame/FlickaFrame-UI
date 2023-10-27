<script setup lang='ts'>

const menu = [
  {
    text: '探索',
    sumMenu: [
      { icon: 'i-mdi-home', text: '发现' },
      { icon: 'i-mdi-movie-open-star-outline', text: '推荐' },
      { icon: 'i-mdi-account-star', text: '关注' },
      { icon: 'i-mdi-weather-hurricane-outline', text: '最热' },
    ],
  },
  {
    text: '我的',
    sumMenu: [
      { icon: 'i-mdi-laptop-account', text: '我的频道' },
      { icon: 'i-mdi-history', text: '历史记录' },
      { icon: 'i-mdi-account-heart-outline', text: '赞过' },
      { icon: 'i-mdi-message-alert-outline', text: '通知' },
    ],
  },
]

const fixedMenu = [
  { icon: 'i-mdi-settings', text: '设置' },
  { icon: 'i-mdi-progress-question', text: '帮助' },
  { icon: 'i-mdi-feedback', text: '发送反馈' },
]

</script>

<template>
  <nav class="flex flex-col gap-4 p-4">
    <div
      v-for="menuItem in menu"
      :key="menuItem.text"
      class="px-3 py-2"
    >
      <h2 class="mb-2 px-4 text-2xl font-semibold tracking-tight text-primary">
        {{ menuItem.text }}
      </h2>
      <div class="space-y-2">
        <UiButton
          v-for="item in menuItem.sumMenu"
          :key="item.text"
          :variant="item.text === '发现' ? 'secondary' : 'ghost'"
          size="lg"
          class="w-full justify-start"
        >
          <div class="mr-2 text-2xl" :class="item.icon" />
          {{ item.text }}
        </UiButton>

      </div>

    </div>
    <div class="flex-1" />

    <UiSeparator class="bg-foreground/20" />

    <div class="space-y-2">
      <UiButton
        v-for="item in fixedMenu"
        :key="item.text"
        :variant="item.text === '发现' ? 'secondary' : 'ghost'"
        size="lg"
        class="w-full justify-start"
      >
        <div class="mr-2 text-2xl" :class="item.icon" />
        {{ item.text }}
      </UiButton>

    </div>

  </nav>

</template>
