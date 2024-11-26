// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import glsl from 'vite-plugin-glsl';
import path from 'path'; // Импортируем path для разрешения путей

export default defineConfig({
  plugins: [
    vue(),
    glsl()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Настройка алиаса '@' на папку 'src'
    },
  },
});
