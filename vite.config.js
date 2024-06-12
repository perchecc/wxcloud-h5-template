import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";
import postcssPxtorem from "postcss-pxtorem";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  // envPrefix: "APP_", // 自定义环境变量前缀
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      assets: "@/assets",
      utils: "@/utils",
      api: "@/api",
      components: "@/components",
    },
  },
  css: {
    postcss: {
      plugins: [
        postcssPxtorem({
          // rootValue: 37.5,
          rootValue({ file }) {
            return file.indexOf("vant") !== -1 ? 37.5 : 37.5;
          },
          propList: ["*"],
        }),
        tailwindcss,
        autoprefixer,
      ],
    },
    // css预处理器
    preprocessorOptions: {
      scss: {
        // 引入 mixin.scss 这样就可以在全局中使用 mixin.scss中预定义的变量了
        // 给导入的路径最后加上 ;
        additionalData: '@import "@/assets/style/mixin.scss";',
      },
    },
  },
  server: {
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "http://1.14.96.11:8010", // 接口的域名
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        rewrite: (path) => path.replace(/^\/api/, "/"),
      },
    },
  },
});
