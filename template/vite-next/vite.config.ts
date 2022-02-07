import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eslintPlugin from "vite-plugin-eslint";
import vuefrontPlugin from "vite-plugin-vue-vuefront";
import voie from "vite-plugin-voie";
import viteGraphlQl from "vite2-graphql-plugin";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { optimizeLodashImports } from "@optimize-lodash/rollup-plugin";

export const ssrTransformCustomDir = () => {
  return {
    props: [],
    needRuntime: true,
  };
};
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const plugins = [];
  if (mode === "production") {
    plugins.push(optimizeLodashImports());
    plugins.push(visualizer());
  }
  return {
    optimizeDeps: {
      include: ["lodash"],
    },
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./src"),
      },
    },
    plugins: [
      vue({
        template: {
          ssr: true,
          compilerOptions: {
            directiveTransforms: {
              lazy: ssrTransformCustomDir,
            },
          },
        },
      }),
      viteGraphlQl(),
      voie(),
      eslintPlugin({
        fix: true,
      }),
      vuefrontPlugin(),
      ...plugins,
    ],
  };
});
