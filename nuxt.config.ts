// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxt/image',
    '@nuxtjs/eslint-module',
    '@formkit/auto-animate',
    '@vueuse/motion/nuxt',
    'dayjs-nuxt',
  ],
  vite: {
    vue: {
      script: {
        defineModel: true,
      },
    },
  },
  nitro: {
    devProxy: {
      '/api': {
        target: 'http://localhost:8080/api/v1',
        changeOrigin: true,
        prependPath: true,
      },
    },
  },
  css: [
    '@unocss/reset/tailwind.css',
    '~/assets/common.css',
  ],
  runtimeConfig: {
    public: {
      baseURL: process.env.NUXT_PUBLIC_API_BASE || '/',
    },
  },
  experimental: {
    viewTransition: true,
  },
})