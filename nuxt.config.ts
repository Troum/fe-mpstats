// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    colorMode: {
        preference: 'light'
    },
    devtools: {enabled: true},
    tailwindcss: undefined,
    $development: undefined, $env: undefined, $meta: undefined, $production: undefined, $test: undefined,
    ssr: false,
    app: {
        pageTransition: {name: 'page', mode: 'out-in'}
    },
    modules: ["@nuxt/ui", '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt', '@nuxt/image'],
    // @ts-ignore
    piniaPersistedstate: {
        storage: 'localStorage'
    },
    runtimeConfig: {
        public: {
            baseURL: process.env.NUXT_API_URL || 'https://api.mpstats.online/api',
        }
    },
    css: [
        "@/assets/styles/main.scss",
    ],
});