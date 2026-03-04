import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Elimina 'minify: false' o cámbialo a true para producción
    minify: true, 
    outDir: 'dist',
  },
  // './' ayuda a que funcione en subcarpetas en cPanel
  base: './' 
})
