export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'aircheckin',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/fonts/Futura/stylesheet.css',
    '@/assets/css/app.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/masks.js', ssr: false },
    { src: '~/plugins/filters.js', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],
  axios: {
    baseURL: 'http://api.aircheckin.ru/v1',
  },


  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/renter/create-token', method: 'post', propertyName: 'token' },
          user: { url: '/user/info', method: 'get', propertyName: 'data' },
          // logout: { url: '/auth/logout', method: 'post' }
          logout: false,
        }
      },
    },

    redirect: {
      login: '/login',
      logout: '/login',
      // callback: '/login',
      home: '/'
    },

    resetOnError: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
