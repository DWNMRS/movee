import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "node:path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: 
      [{ find: "@", replacement: resolve(__dirname, "./src") }]
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/common.scss";`
      }
    }
  },
})

