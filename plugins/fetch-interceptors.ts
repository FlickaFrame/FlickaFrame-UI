import { ofetch } from 'ofetch'

export default defineNuxtPlugin(() => {
  globalThis.$fetch = ofetch.create({
    onRequest({ options }) {
      const { public: { baseURL } } = useRuntimeConfig()
      options.baseURL = process.browser ? '/' : baseURL

      const sessionStore = useSessionStore()

      if (!sessionStore.isLogin) return

      options.headers = new Headers(options.headers)
      options.headers.set('Authorization', `Bearer ${sessionStore.session.accessToken}`)
    },
    onRequestError(context) {
      console.error('onRequestError', context)
    },
  })
})
