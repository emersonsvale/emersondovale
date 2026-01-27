// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: process.env.NODE_ENV === 'development' },
  srcDir: 'app',
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-auth-utils'
  ],
  nitro: {
    preset: 'node-server',
  },
  app: {
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/Ativo 1@4x.png'
        }
      ]
    }
  }
})