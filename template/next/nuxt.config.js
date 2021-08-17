require("dotenv").config();
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const isDev = process.env.NODE_ENV === "development";

const modules = [];

if (!isDev) {
  modules.push("@nuxtjs/pwa");
}

export default {
  ssr: true,
  target: isDev ? "server" : "static",
  modern: !isDev ? "client" : false,
  env: {
    FEATURED_PRODUCT: process.env.FEATURED_PRODUCT
  },
  generate: {
    concurrency: 5,
    subFolders: false,
    crawler: true,
  },
  head: {
    title: "vuefront",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "VueFront" },
    ],
    link: [
      {
        rel: "icon",
        type: "image/png",
        href: "/favicon.ico",
      }
    ],
    script: [],
  },
  loading: { color: "#3B8070" },
  modules: [
    "@nuxtjs/dotenv",
    "vuefront-nuxt",
    ...modules,
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
      plugins: ["lodash", "preval", ["@babel/plugin-proposal-private-methods", { "loose": true }]],
    },
    transpile: ["@vuefront/checkout-app"],
    extractCSS: !isDev,
    corejs: 2,
    optimization: {
      splitChunks: {
        chunks: "all",
        automaticNameDelimiter: ".",
        name: "test",
        maxSize: 256000,
        minSize: 50000,
      },
    },
    plugins: [
      new LodashModuleReplacementPlugin({
        shorthands: true,
      }),
    ],
  },
};
