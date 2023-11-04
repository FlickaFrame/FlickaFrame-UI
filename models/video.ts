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
  author: VideoUserInfo

  favoriteCount: number
  commentNum: number
  shareNum: number
  isFavorite: boolean
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
  id: string
  name: string
}

export interface VideoCategoryResponse {
  categoryList: VideoCategory[]
}

export interface VideoInfoResponse {
  video: VideoItem
}

export interface VideoTag {
  id: string
  name: string
}
