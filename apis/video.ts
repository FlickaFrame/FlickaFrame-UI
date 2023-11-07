import type { VideoCategoryResponse, VideoFeedQuery, VideoFeedResponse, VideoInfoResponse, VideoSearchRequest, VideoSearchResponse, VideoUploadInfo } from '~/models'

export function postVideo(payload: VideoUploadInfo) {
  return $fetch<ApiResult<null>>('/api/video/create', {
    method: 'POST',
    body: payload,
  })
}

export function putVideo(payload: VideoUploadInfo) {
  return $fetch<ApiResult<null>>('/api/video/create', {
    method: 'PUT',
    body: payload,
  })
}

export function getCagegory() {
  return $fetch<ApiResult<VideoCategoryResponse>>('/api/video/category')
}

export function getVideoFeed(query?: VideoFeedQuery) {
  return $fetch<ApiResult<VideoFeedResponse>>('/api/video/feed', {
    query,
  })
}

export function getFollowingVideo(query?: VideoFeedQuery) {
  return $fetch<ApiResult<VideoFeedResponse>>('/api/video/following', {
    query,
  })
}

export function searchVideo(payload: VideoSearchRequest) {
  return $fetch<ApiResult<VideoSearchResponse>>('/api/video/search', {
    method: 'POST',
    body: payload,
  })
}

export function deleteVideo(videoId: string) {
  return $fetch<ApiResult<null>>(`/api/video/${videoId}`, {
    method: 'DELETE',
  })
}

export function getVideoInfo(videoId: string) {
  return $fetch<ApiResult<VideoInfoResponse>>(`/api/video/detail/${videoId}`)
}
