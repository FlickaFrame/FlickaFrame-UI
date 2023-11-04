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
    '@pinia-plugin-persistedstate/nuxt',
    '@ant-design-vue/nuxt',
    'nuxt-swiper',
  ],
  ssr: false,
  vite: {
    vue: {
      script: { defineModel: true },
    },
  },
  nitro: {
    devProxy: {
      '/api': {
        target: process.env.NUXT_PUBLIC_API_BASE,
        changeOrigin: true,
        prependPath: true,
        ws: true,
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
  components: [
    {
      path: '~/components',
      extensions: ['.vue'],
    },
  ],
  app: {
    pageTransition: { name: 'slide-right', mode: 'out-in' },
  },
  eslint: {
    emitWarning: false,
  },
})
