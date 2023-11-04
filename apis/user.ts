import type { SessionResponse, UserLoginRequest, UserResponse } from '~/models/user'
import type { FollowListResponse, FollowPageOption } from '~/models/follow'
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

export async function getUserInfoById(userid: string) {
  const response = await $fetch<ApiResult<UserResponse>>(`/api/user/detail/${userid}`)
  return response
}

export async function getMyFollowingList(pageOption: FollowPageOption) {
  const response = await $fetch<ApiResult<FollowListResponse>>('/api/user/me/following', {
    query: pageOption,
  })
  return response
}

export async function getMyFollowerList(pageOption: FollowPageOption) {
  const response = await $fetch<ApiResult<FollowListResponse>>('/api/user/me/followers', {
    query: pageOption,
  })
  return response
}

export async function followUser(userId: string) {
  const response = await $fetch<ApiResult<boolean>>(`/api/user/follow_action/${userId}`, {
    method: 'PUT',
  })
  return response
}

export async function unfollowUser(userId: string) {
  const response = await $fetch<ApiResult<boolean>>(`/api/user/follow_action/${userId}`, {
    method: 'DELETE',
  })
  return response
}
