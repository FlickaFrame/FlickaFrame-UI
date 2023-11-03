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
  createdAt: number // 毫秒时间戳
  category: VideoCategory
  tags: VideoTag[]
  height: number
  width: number
  thumbUrl: string
  playUrl: string
  interaction: VideoInteractInfo
  author: VideoUserInfo
}

export interface VideoInteractInfo {
  liked: boolean
  likedCount: string
  isFollow: boolean
  shareNum: number
  commentNum: number
}

export interface VideoUserInfo {
  avatarUrl: string
  nickName: string
  isFollow: boolean
  slogan: string
  gender: number
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

export interface VideoTag {
  id: number
  name: string
}
