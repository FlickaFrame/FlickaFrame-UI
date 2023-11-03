import type { VideoCategory, VideoUploadInfo } from '~/models'

export async function postVideo(payload: VideoUploadInfo) {
  return $fetch<ApiResult<null>>('/api/video/create', {
    method: 'POST',
    body: payload,
  })
}

export async function putVideo(payload: VideoUploadInfo) {
  return $fetch<ApiResult<null>>('/api/video/create', {
    method: 'PUT',
    body: payload,
  })
}

export async function getCagegory() {
  return $fetch<ApiResult<VideoCategory[]>>('/api/video/category')
}
