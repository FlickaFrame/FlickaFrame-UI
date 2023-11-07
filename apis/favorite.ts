export function favoriteVideo(videoId: string) {
  return $fetch<ApiResult<null>>(`/api/favorite/video/${videoId}`, {
    method: 'PUT',
  })
}

export function unfavoriteVideo(videoId: string) {
  return $fetch<ApiResult<null>>(`/api/favorite/video/${videoId}`, {
    method: 'DELETE',
  })
}

export function favoriteComment(id: string) {
  return $fetch<ApiResult<null>>(`/api/favorite/comment/${id}`, {
    method: 'PUT',
  })
}

export function unfavoriteComment(id: string) {
  return $fetch<ApiResult<null>>(`/api/favorite/comment/${id}`, {
    method: 'DELETE',
  })
}
