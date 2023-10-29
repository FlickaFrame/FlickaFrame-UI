import { defineStore } from 'pinia'
import type { SessionResponse, UserResponse } from '~/models'

export const useSessionStore = defineStore('session', () => {
  const session = ref<Partial<SessionResponse>>({
    accessToken: undefined,
    accessExpire: undefined,
    refreshAfter: undefined,
  })

  const info = ref<UserResponse['userInfo']>({
    avatarUrl: '',
    id: -1,
    info: '',
    nickName: '',
    phone: '',
    sex: -1,
  })

  const clearSession = () => {
    session.value = {}
  }

  const isLogin = computed(() => {
    const dayjs = useDayjs()
    return !!session.value.accessExpire && dayjs().unix() < session.value.accessExpire
  })

  return { clearSession, isLogin, session, info }
})
