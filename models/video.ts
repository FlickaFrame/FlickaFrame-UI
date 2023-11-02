// "categoryList": [
//   {
//     "id": {},
//     "name": "string"
//   }
// ]

export interface VideoFeedResponse {
  next: string
  list: VideoItem[]
  isEnd: boolean
}

export interface VideoItem {
  id: string
  title: string
  description: string
  tags: string[]
  height: number
  width: number
  coverUrl: string
  videoUrl: string
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
  id: string
  name: string
}

export interface VideoCategoryResponse {
  categoryList: VideoCategory[]
}