import type { SessionResponse, UserEditRequest, UserLoginRequest, UserResponse } from '~/models/user'
import type { FollowListResponse, FollowPageOption } from '~/models/follow'
import { UserGender } from '~/models'
import { getUrlOssKey } from './file'
import { deburr } from 'lodash-es'

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

export async function editUserInfo(payload: Partial<UserEditRequest>) {
  const info = useSessionStore().info

  const _payload: UserEditRequest = {
    slogan: info.slogan || '',
    age: info.age || -1,
    gender: info.gender || UserGender.Unknown,
    nickName: info.nickName || '',
    backgroundUrl: info.backgroundUrl || '',
    avatarUrl: info.avatarUrl || '',
    ...payload,
  }

  _payload.backgroundUrl = getUrlOssKey(_payload.backgroundUrl)
  _payload.avatarUrl = getUrlOssKey(_payload.avatarUrl)

  return $fetch<ApiResult<null>>('/api/user/info', {
    method: 'PUT',
    body: _payload,
  })
}

export function getUserInfoById(userId: string) {
  return $fetch<ApiResult<UserResponse>>(`/api/user/detail/${userId}`)
}

export function getMyFollowingList(pageOption: FollowPageOption, userId = 'me') {
  return $fetch<ApiResult<FollowListResponse>>(`/api/user/${userId}/following`, {
    query: pageOption,
  })
}

export function getMyFollowerList(pageOption: FollowPageOption, userId = 'me') {
  return $fetch<ApiResult<FollowListResponse>>(`/api/user/${userId}/followers`, {
    query: pageOption,
  })
}

export function followUser(userId: string) {
  return $fetch<ApiResult<boolean>>(`/api/user/follow_action/${userId}`, {
    method: 'PUT',
  })
}

export function unfollowUser(userId: string) {
  return $fetch<ApiResult<boolean>>(`/api/user/follow_action/${userId}`, {
    method: 'DELETE',
  })
}
