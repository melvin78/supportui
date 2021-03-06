import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

 server:{
  host:'0.0.0.0',
 },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Helpdesk Centrino',
    title: 'Helpdesk Centrino',
    htmlAttrs: {
      lang: 'en'
    },

    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
   
{
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@100&display=swap",
      },
 ]
  },

  axios: {
    baseURL:'https://customer-api.caprover.centrino.co.ke/api',
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/axioshelper.js',
    '~plugins/apiservice.js',
        "~/plugins/v-perfect-scrollbar.client.js",

  
    { src: '~/plugins/vuex-persist.js', mode: 'client' }, // only on client side
    // '~plugins/upload-digital-ocean.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/laravel-echo',

  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/auth-next',
    '@nuxtjs/axios',
    "vue2-editor/nuxt"
  ],
  echo: {
    broadcaster: 'pusher',
    key: '07acf5ca1c952ced185b',
    encrypted:true,
    cluster:'ap2'

  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          background: colors.purple.lighten5
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

}

