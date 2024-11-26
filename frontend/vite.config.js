import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    host: '0.0.0.0',
    port: 3006,
    overlay:false,
    open: false,
    // proxy: {
    //   '/api': {
    //     target: viteEnv.VITE_APP_API_BASE_URL,
    //     changeOrigin: true,
    //     rewrite: path => path.replace('/api/', '/'),
    //   },
    // },
  },
  build: {
    reportCompressedSize: false,
    sourcemap: false,
    commonjsOptions: {
      ignoreTryCatch: false,
    },
  },

  resolve: {
    alias: {
      '@': '/src',
      '@/com': '/src/components'
    }
  }
})
