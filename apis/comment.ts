import type { CommentListResponse, CommentRequest, CommnetResponse } from '~/models'

export function createCommnet(payload: CommentRequest) {
  return $fetch<ApiResult<CommnetResponse>>('/api/comment/video', {
    method: 'POST',
    body: payload,
  })
}

export function deleteComment(commnetId: string) {
  return $fetch<ApiResult<null>>(`/api/comments/${commnetId}`, {
    method: 'DELETE',
  })
}

export function getCommnets(videoId: string) {
  return $fetch<ApiResult<CommentListResponse>>(`/api/video/${videoId}/comments`, {
    method: 'GET',
  })
}
