import type { SessionResponse, UserLoginRequest, UserResponse } from '~/models/user'
import { useSessionStore } from '#imports'

export async function login(data: UserLoginRequest) {
  const store = useSessionStore()
  const response = await $fetch<ApiResult<SessionResponse>>('/api/user/login', {
    method: 'POST',
    body: data,
  })

  if (response.success) {
    store.session = response.data
  }
  return response
}

export function register(data: UserLoginRequest) {
  return $fetch<ApiResult<SessionResponse>>('/api/user/register', {
    method: 'POST',
    body: data,
  })
}

export async function getUserInfo() {
  const store = useSessionStore()
  const response = await $fetch<ApiResult<UserResponse>>('/api/user/detail')

  if (response.success) {
    store.info = response.data
  }

  return response
}
