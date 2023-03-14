import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unimport from 'unimport/unplugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), Unimport.vite({ dts: true, presets: ['vue'] })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
