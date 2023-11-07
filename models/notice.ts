// export enum NoticeTabKey {
//   Comment = 'comment',
//   Like = 'like',
//   Follow = 'follow',
// }
export enum NoticeType {
  Follow = 'follow', // 关注消息
  LikeVideo = 'like-video', // 点赞消息(视频)
  LikeComment = 'like-comment', // 点赞消息(评论)
  Comment = 'comment-video', // 评论消息
  NoticeCollect = 'collect', // 收藏消息
  Reply = 'reply-comment', // 回复消息
  At = '@-comment', // @消息
  System = 'system-notice', // 系统消息
}

export interface NoticeListResponse {
  next: string
  list: Notice[]
  isEnd: boolean
}

export interface NoticeListRequest {
  noticeType: string
}

export interface Notice {
  noticeId: number
  fromUserId: number
  fromUserNickName: string
  fromUserAvatarUrl: string
  noticeType: NoticeType
  noticeTime: number
}
