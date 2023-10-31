import type { UpTokenInfo, VideoInfo } from '~/models'

export async function createVideoToken() {
  return $fetch<ApiResult<UpTokenInfo>>('/api/video/uptoken')
}

export async function uploadVideoFile(file: File, token: string, key: string) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('token', token)
  formData.append('key', `video/${key}`)
  return $fetch<ApiResult<VideoInfo>>('http://up-z2.qiniup.com', {
    method: 'POST',
    body: formData,
  })
}
