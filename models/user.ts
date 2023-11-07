export interface UserLoginRequest {
  password: string
  phone: string
}

export interface UserRegisterRequest {
  nickName: string
  password: string
  phone: string
}

export interface UserEditRequest {
  slogan: string
  age: number
  gender: UserGender
  nickName: string
  backgroundUrl: string
  avatarUrl: string
}

export interface SessionResponse {
  accessExpire: number
  accessToken: string
  refreshAfter: number
}

export interface UserResponse extends User {

}

export enum UserGender {
  Male = 1,
  Female = 2,
  Unknown = 3,
}

interface UserBasic {
  userId: string
  age: number
  nickName: string
  gender: UserGender
  slogan: string

  avatarUrl: string
  backgroundUrl: string
}

export interface User extends UserBasic {

  collectionsVideoCount: number
  followerCount: number
  followingCount: number
  isFollow: boolean
  likeCount: number
  likeVideoCount: number
  publishVideoCount: number
}
