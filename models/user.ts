export interface UserLoginRequest {
  password: string
  phone: string
}

export interface UserRegisterRequest {
  nickName: string
  password: string
  phone: string
}

export interface SessionResponse {
  accessExpire: number
  accessToken: string
  refreshAfter: number

}

export interface UserResponse extends User {

}

export interface User {
  avatarUrl: string
  userId: number
  info: string
  nickName: string
  phone: string
  gender: number
  slogan: string
  collectionsVideoCount: number
  followerCount: number
  followingCount: number
  isFollow: boolean
  likeCount: number
  likeVideoCount: number
  publishVideoCount: number
}
