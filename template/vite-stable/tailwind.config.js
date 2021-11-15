module.exports = {
  darkMode: false, // or 'media' or 'class'
  purge: {
    content: [
      "./src/components/**/*.vue",
      "./node_modules/vuefront/lib/**/*.vue",
      "./node_modules/@vuefront/checkout-app/**/*.vue",
    ],
    safelist: [/^vf-/, /^md:vf-/, /^sm:vf-/, /^lg:vf-/],
  },
  // theme: {
  //   extend: {
  //     vuefront: {
  //       colors: {
  //         primary: 'red'
  //       }
  //     }
  //   }
  // },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("vuefront/tailwind/plugin.js"),
  ],
};
