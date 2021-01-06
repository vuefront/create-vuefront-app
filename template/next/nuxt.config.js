import LodashModuleReplacementPlugin from 'lodash-webpack-plugin'
require('dotenv').config()

export default {
  ssr: true,
  target: 'static',
  modern: 'client',
  env: {
    FEATURED_PRODUCT: process.env.FEATURED_PRODUCT
  },
  generate: {
    concurrency: 5,
    subFolders: false
  },
  head: {
    title: 'vuefront',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'VueFront' }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/png',
        href: '/favicon.png'
      }
    ],
    script: []
  },
  loading: { color: '#3B8070' },
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    'vuefront-nuxt',
    'cookie-universal-nuxt'
  ],
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    ['@nuxtjs/eslint-module', { fix: true }],
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module'
    // '@aceforth/nuxt-optimized-images',
  ],
  // optimizedImages: {
  //   optimizeImages: true,
  //   optimizeImagesInDev: true
  // },
  build: {
    babel: {
      plugins: ['lodash', 'preval']
    },
    extractCSS: true,
    splitChunks: {
      layouts: true,
      pages: true,
      commons: true
    },
    postcss: {
      preset: {
        features: {
          // Fixes: https://github.com/tailwindcss/tailwindcss/issues/1190#issuecomment-546621554
          'focus-within-pseudo-class': false
        }
      },
      plugins: {
        tailwindcss: {}
      }
    },
    plugins: [
      new LodashModuleReplacementPlugin({
        shorthands: true
      })
    ]
  }
}
