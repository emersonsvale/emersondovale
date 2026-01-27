// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  srcDir: 'app',
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-auth-utils'
  ],
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