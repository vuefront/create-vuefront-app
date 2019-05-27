require('dotenv').config()
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

export default {
    mode: 'universal',
    env: {},
    generate: {
        concurrency: 20,
        subFolders: false
    },
    head: {
        title: 'vuefront',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'VueFront' }
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
    build: {
        babel: {
            plugins: ['lodash']
        },
        extractCSS: true,
        plugins: [new LodashModuleReplacementPlugin({
            shorthands: true
        })]
    }
}