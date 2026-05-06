import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api/mimo': {
        target: 'https://token-plan-cn.xiaomimimo.com',
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/api\/mimo/, ''),
        headers: {
          host: 'token-plan-cn.xiaomimimo.com',
          Connection: 'keep-alive'
        },
        configure: (proxy, _options) => {
          proxy.on('error', (_err, _req, _res) => {
            // console.log('Vite Proxy Error:', err.message);
          });
        },
      }
    }
  }
})
