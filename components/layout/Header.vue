<script setup>
import Logo from '~/assets/logo.png'

const store = useSessionStore()

function handleLogout() {
  store.clearSession()
  message.info('退出登录成功')
}

const sessionDialogOpen = ref(false)

</script>

<template>

  <nav class="flex items-center justify-between gap-2 border-b border-slate px-4">
    <img :src="Logo" alt="logo" class="w-80">

    <UiInput class="h-12 max-w-240 text-base" placeholder="这是搜索框" />

    <UiDropdownMenu v-if="store.info.userId">
      <UiDropdownMenuTrigger>
        <UiButton variant="secondary" class="mr-4 flex-center gap-2 whitespace-nowrap py-7 text-base">
          <UiAvatar size="base">
            <UiAvatarImage :src="store.info.avatarUrl" :alt="store.info.nickName" />
            <UiAvatarFallback>{{ store.info.nickName }}</UiAvatarFallback>
          </UiAvatar>
          {{ store.info.nickName }}
        </UiButton>
      </UiDropdownMenuTrigger>
      <UiDropdownMenuContent>
        <UiDropdownMenuLabel> {{ store.info.nickName }}</UiDropdownMenuLabel>
        <UiDropdownMenuSeparator />
        <UiDropdownMenuItem @click="navigateTo(`/profile/${store.info.userId}`)">我的频道</UiDropdownMenuItem>
        <UiDropdownMenuItem @click="handleLogout">退出登录</UiDropdownMenuItem>
      </UiDropdownMenuContent>
    </UiDropdownMenu>

    <UiButton v-else variant="secondary" class="mr-4 whitespace-nowrap border py-4 text-sm" @click="sessionDialogOpen = true">
      点击登录
      <UserSessionModal v-model="sessionDialogOpen" />
    </UiButton>

  </nav>
</template>
