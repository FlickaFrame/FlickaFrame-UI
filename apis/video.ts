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
  return $fetch<ApiResult<VideoCategory[]>>('/api/video/category', {
    onRequest({ options, request }) {
      const { public: { baseURL } } = useRuntimeConfig()
      // options.baseURL = process.browser ? '/' : baseURL

      console.log('onRequest', options, request)

      const sessionStore = useSessionStore()

      if (!sessionStore.isLogin) return

      options.headers = new Headers(options.headers)
      options.headers.set('Authorization', `Bearer ${sessionStore.session.accessToken}`)
    },
    onRequestError(context) {
      console.error('onRequestError', context)
    },
  })
}
