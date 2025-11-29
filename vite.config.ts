import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
      '@services': fileURLToPath(new URL('./src/services', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '@types': fileURLToPath(new URL('./src/types', import.meta.url)),
      '@schemas': fileURLToPath(new URL('./src/schemas', import.meta.url)),
      '@atoms': fileURLToPath(new URL('./src/atoms', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
    },
  },
  server: {
    port: 5001,
    proxy: {
      '/api': {
        target: 'http://192.168.45.105:5002',
        // target: 'https://csslint.mongmung.ium.kr',
        changeOrigin: true,
      },
    },
  },
  build: {
    emptyOutDir: true,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 500,
    assetsInlineLimit: 1024,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Monaco Editor를 별도 청크로 분리 (큰 용량)
          if (id.includes('monaco-editor')) {
            return 'monaco-editor';
          }
          // React 관련 패키지
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
          // 기타 node_modules
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
});
