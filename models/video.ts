export interface VideoFeedResponse {
  next: string
  list: VideoItem[]
  isEnd: boolean
}

export interface VideoFeedQuery {
  authorID?: string
  categoryId?: number
  cursor?: string
  limit?: number
  tag?: string
}

export interface VideoItem {
  id: string
  title: string
  description: string
  tags: string[]
  height: number
  width: number
  thumbUrl: string
  playUrl: string
  interaction: VideoInteractInfo
  user: VideoUserInfo
  publishTime: number // 毫秒时间戳
}

export interface VideoInteractInfo {
  liked: boolean
  likedCount: string
  isFollow: boolean
  shareNum: number
  commentNum: number
}

export interface VideoUserInfo {
  avatar: string
  nickName: string
  userId: string
}

export interface VideoUploadInfo {
  id?: string
  playUrl: string
  thumbUrl: string
  title: string
  description: string
  category: number
  tags: string[] // ['tag1', 'tag2']
  publishTime?: number // timestamp
  visibility: number // 1 2
}

export interface VideoCategory {
  id: number
  name: string
}

export interface VideoCategoryResponse {
  categoryList: VideoCategory[]
}
