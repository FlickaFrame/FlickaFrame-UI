export interface FollowListResponse {
  users: Follow[]
}

export interface Follow {
  userId: number
  nickName: string
  avatarUrl: string
  slogan: string
  gender: number
  isFollowing: boolean
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
