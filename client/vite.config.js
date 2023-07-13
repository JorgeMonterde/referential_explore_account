import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/users/user": "http://localhost:3000",
      "/api/users/project": "http://localhost:3000",
      "/api/users/artworks": "http://localhost:3000",
      "/api/artworks": "http://localhost:3000",
      "/auth": "http://localhost:3000",
    }
  }
})