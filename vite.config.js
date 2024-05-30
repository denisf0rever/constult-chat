import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Настройки для сборки проекта
    // Переопределение MIME-типов для JavaScript файлов
    rollupOptions: {
      output: {
        // Указываем MIME-тип application/javascript для всех .js файлов
        // Форматирование в объекте для rollupOptions
        format: 'es',
        manualChunks: {},
      },
    },
  }
})
