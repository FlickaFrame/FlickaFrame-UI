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

export interface UserResponse {
  userInfo: User
}

export interface User {
  avatarUrl: string
  id: number
  info: string
  nickName: string
  phone: string
  sex: number
}
