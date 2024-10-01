// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  colorMode: {
      preference: 'light'
  },

  devtools: {enabled: true},
  tailwindcss: undefined,
  $development: undefined,
  $env: undefined,
  $meta: undefined,
  $production: undefined,
  $test: undefined,
  ssr: false,

  app: {
      pageTransition: {name: 'page', mode: 'out-in'},
      head: {
          charset: 'utf-8',
          viewport: 'width=device-width, initial-scale=1.0',
          meta: [
              {name: 'viewport', content: 'width=device-width, initial-scale=1.0'},
              {name: 'description', content: 'Сервис для получения статистических данных'},
          ],
          link: [
              {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
          ],
      }
  },

  modules: ["@nuxt/ui", '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt', '@nuxt/image'],

  // @ts-ignore
  piniaPersistedstate: {
      storage: 'localStorage'
  },

  runtimeConfig: {
      public: {
          baseURL: process.env.NUXT_API_URL || 'https://api.mpstats.space/api',
      }
  },

  css: [
      "@/assets/styles/main.scss",
  ],

  compatibilityDate: '2024-10-01',
});