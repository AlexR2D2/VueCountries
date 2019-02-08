// only add `router.base = '/<repository-name>/'` if `DEPLOY_ENV` is `GH_PAGES`
const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  base: '/VueCountries/',
} : {}

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'VueCountries',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Regions Info' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
  },
  /*
  ** Customize the CSS
  */
  css: [
    'tachyons/css/tachyons.min.css',
    '~/assets/index.css',
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      if (isClient) {
        config.module.rules.push({
          test: /\.worker\.js$/,
          use: { loader: 'worker-loader' }
        })
      }
    }
  },
  plugins: [
    { src: '~/plugins/vue-lazyload', ssr: false }
  ],
  /*
  ** Make router relative to /vue_portfolio_01
  */
  router: {
    ...routerBase,
    linkExactActiveClass: 'exact-active-link'
  },
  modules: [
    [
      '@nuxtjs/yandex-metrika',
      {
        id:48244673,
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
      }
    ],
  ]
}
