import type { SessionResponse, UserEditRequest, UserLoginRequest, UserResponse } from '~/models/user'
import type { FollowListResponse, FollowPageOption } from '~/models/follow'

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

export async function editUserInfo(payload: UserEditRequest) {
  return $fetch<ApiResult<null>>('/api/user/info', {
    method: 'PUT',
    body: payload,
  })
}

export async function getUserInfoById(userId: string) {
  const response = await $fetch<ApiResult<UserResponse>>(`/api/user/detail/${userId}`)
  return response
}

export async function getMyFollowingList(pageOption: FollowPageOption, userId = 'me') {
  const response = await $fetch<ApiResult<FollowListResponse>>(`/api/user/${userId}/following`, {
    query: pageOption,
  })
  return response
}

export async function getMyFollowerList(pageOption: FollowPageOption, userId = 'me') {
  const response = await $fetch<ApiResult<FollowListResponse>>(`/api/user/${userId}/followers`, {
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
