<script setup>
import Logo from '~/assets/logo.png'

const store = useSessionStore()

function handleLogout() {
  store.clearSession()
  message.info('退出登录成功')
}

</script>

<template>

  <nav class="flex items-center justify-between gap-2 border-b border-slate px-4">
    <img :src="Logo" alt="logo" class="w-80">

    <UiInput class="h-12 max-w-240 text-base" placeholder="这是搜索框" />

    <UiDropdownMenu v-if="store.info.userId">
      <UiDropdownMenuTrigger>
        <UiButton variant="secondary" class="mr-4 flex-center gap-2 whitespace-nowrap py-6 text-base">
          <UiAvatar>
            <UiAvatarImage :src="store.info.avatarUrl" alt="user avatar" />
            <UiAvatarFallback>{{ store.info.nickName }}</UiAvatarFallback>
          </UiAvatar>
          {{ store.info.nickName }}
        </UiButton>
      </UiDropdownMenuTrigger>
      <UiDropdownMenuContent>
        <UiDropdownMenuLabel> {{ store.info.nickName }}</UiDropdownMenuLabel>
        <UiDropdownMenuSeparator />
        <UiDropdownMenuItem>我的频道</UiDropdownMenuItem>
        <UiDropdownMenuItem @click="handleLogout">退出登录</UiDropdownMenuItem>
      </UiDropdownMenuContent>
    </UiDropdownMenu>

    <UserSessionDialog v-else>
      <UiButton variant="secondary" class="mr-4 whitespace-nowrap border py-4 text-sm">
        点击登录
      </UiButton>
    </UserSessionDialog>
  </nav>
</template>
