import type { VideoCategoryResponse, VideoFeedQuery, VideoFeedResponse, VideoUploadInfo } from '~/models'

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
