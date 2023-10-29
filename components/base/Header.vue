<script setup>
import Logo from '~/assets/logo.png'

const store = useSessionStore()
</script>

<template>

  <nav class="flex items-center justify-between gap-2 border-b border-slate px-4">
    <img :src="Logo" alt="logo" class="w-80">

    <UiInput class="h-12 max-w-240 text-base" placeholder="这是搜索框" />

    <UserSessionDialog>
      <UiButton variant="secondary" class="mr-4 flex-center gap-2 py-8 text-base">
        <UiAvatar>
          <UiAvatarImage :src="store.info.avatarUrl" alt="user avatar" />
          <UiAvatarFallback>{{ store.info.nickName }}</UiAvatarFallback>
        </UiAvatar>
        <span class="whitespace-nowrap">
          {{ store.info.nickName || '未登录' }}
        </span>
      </UiButton>
    </UserSessionDialog>
  </nav>
</template>
