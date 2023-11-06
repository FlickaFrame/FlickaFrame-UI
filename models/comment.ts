export interface CommnetResponse {
  comment: Comment
}

export interface CommentListResponse {
  comments: Comment[]
}

export interface CommentRequest {
  videoId: number
  content: string
  atUserId?: number[]
}

export interface Comment {
  id: string
  // atUsers?: null
  content: string
  userInfo: UserInfo
  // showTags: null
  liked: boolean
  likedCount: number
  createTime: number

  childComments: Comment[]
  // childCount?: string
  // childHasMore?: boolean
  // status?: number
  // videoId?: string
}

export interface UserInfo {
  age: number
  avatarUrl: string
  gender: number
  nickName: string
  slogan: string
  userId: string
  [property: string]: any
}
