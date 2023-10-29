import { defineStore } from 'pinia'

interface Session {
  'accessToken': string
  'accessExpire': number
  'refreshAfter': number
}

interface RegisterPayload {
  'phone': string
  'password': string
  'nickName': string
}

interface LoginPayload {
  'phone': string
  'password': string
}

export const useSessionStore = defineStore('session', () => {
  const username = ref('Eduardo')

  const session = ref<Partial<Session> >({
    accessToken: undefined,
    accessExpire: undefined,
    refreshAfter: undefined,
  })

  const register = async (payload: RegisterPayload) => {
    const { success, data } = await $fetch<ApiResult<Session>>('/api/user/register', {
      method: 'POST',
      body: payload,
    })

    if (success) {
      session.value = data
      return true
    } else {
      console.log('error', data)
      return false
    }
  }

  const login = async (payload: LoginPayload) => {
    const { success, data } = await $fetch<ApiResult<Session>>('/api/user/login', {
      method: 'POST',
      body: payload,
    })

    if (success) {
      session.value = data
      return true
    } else {
      console.log('error', data)
      return false
    }
  }

  return { username, register, login }
})
