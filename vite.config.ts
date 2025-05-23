import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css'

export default defineConfig({
  plugins: [react(),libInjectCss(), dts({ include: ['lib'] })],
  css: {
    modules: {
      localsConvention: 'camelCaseOnly', 
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    },
  },
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'), 
      formats: ['es'],
      fileName: 'index',
    },
    
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
