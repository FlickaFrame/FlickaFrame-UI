import { defineStore } from 'pinia'
import type { SessionResponse, User } from '~/models'

export const useSessionStore = defineStore('session', () => {
  const session = ref<Partial<SessionResponse>>({
    accessToken: undefined,
    accessExpire: undefined,
    refreshAfter: undefined,
  })

  const info = ref<Partial<User>>({ })

  const clearSession = () => {
    session.value = {}
    info.value = {}
  }

  const isLogin = computed(() => {
    const dayjs = useDayjs()
    return !!session.value.accessExpire && dayjs().unix() < session.value.accessExpire
  })

  return { clearSession, isLogin, session, info }
}, {
  persist: true,
})
