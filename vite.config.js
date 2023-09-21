import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import settings from './src/settings.js'
const name = settings.title || 'Vue-3-Default-SSR' // page title
import transformHtmlPlugin from './src/utils/str-in-index-html'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    transformHtmlPlugin({ title: name })
  ],
  resolve: {
    alias:  [
  { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
  { find: '@assets', replacement: fileURLToPath(new URL('./src/assets', import.meta.url)) },
  { find: '@cmp', replacement: fileURLToPath(new URL('./src/components', import.meta.url)) },
  { find: '@stores', replacement: fileURLToPath(new URL('./src/stores', import.meta.url)) },
  { find: '@views', replacement: fileURLToPath(new URL('./src/views', import.meta.url)) },
],
  }
})
