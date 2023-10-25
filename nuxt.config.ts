// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/eslint-module',
    '@pinia/nuxt',
    '@formkit/auto-animate',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxt/image',
    '@vueuse/motion/nuxt',

  ],
  vite: {
    vue: {
      script: {
        defineModel: true,
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
