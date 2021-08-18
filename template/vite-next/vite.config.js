import { defineConfig } from "vite";
import {createVuePlugin} from "vite-plugin-vue2"
import eslintPlugin from "vite-plugin-eslint";
import vuefrontPlugin from "vite-plugin-vue-vuefront";
import voie from "vite-plugin-voie";
import viteGraphlQl from "vite2-graphql-plugin";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ["vuefront", "vuelidate", "tb-skeleton", "vuelidate/lib/validators"],
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "/src"),
    },
  },
  plugins: [
    createVuePlugin(),
    viteGraphlQl(),
    voie(),
    eslintPlugin({
      fix: true,
    }),
    vuefrontPlugin(),
  ],
});
