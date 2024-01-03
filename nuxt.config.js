
export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - creeps-blog',
    title: 'creeps-blog',
    htmlAttrs: {
      lang: 'en'
    },
    script: [
      {
        src: "https://kit.fontawesome.com/efa32c4cde.js",
        crossorigin: "anonymous",
      },
    ],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/global.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/pinia.js' },
  ],


  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/apollo',
        ],

  // Modules: https://go.nuxtjs.dev/config-modules


  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'http://localhost:3000', // Your GraphQL server endpoint
      },
    },
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],

  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  modules: [
    '@nuxtjs/auth-next',
    '@nuxtjs/axios',
    '@nuxt/image',
    '@pinia/nuxt',
    '@nuxtjs/composition-api/module',
  ],
  auth: {
    strategies: {
      local: {
        token: {
          required: false,
          type: false
        },
        endpoints: {
          login: { url: '/sessions', method: 'post', propertyName: 'token' },
        }
      }
    }
  },
  axios: {
    baseURL: 'http://localhost:3000/api'
  },
  build: {
    extend(config) {
      config.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      })
    },
  },
  vue: {
    config: {
      productionTip: false,
      devtools: false,
    },
  },
}
