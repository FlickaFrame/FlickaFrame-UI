export interface FollowListResponse {
  users: Follow[]
}

export interface Follow {
  userId: string
  nickName: string
  avatarUrl: string
  slogan: string
  gender: number
  isFollow: boolean
}

export interface FollowPageOption {
  page: number
  pageSize: number
  listAll: boolean
}

export enum FollowTab {
  Following = 'following',
  Follower = 'follower',
}
