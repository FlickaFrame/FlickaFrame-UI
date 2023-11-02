export enum UpTokenType {
  Video = 'video',
  Cover = 'cover',
  Avatar = 'avatar',
}

export interface UpTokenQuery {
  uploadType: UpTokenType
}

export interface UpTokenResponse {
  upToken: string
  expires: number
}

export interface FileResponse {
  hash: string
  key: string
}
