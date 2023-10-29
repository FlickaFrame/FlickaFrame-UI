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
  experimental: {
    viewTransition: true,
  },
})
