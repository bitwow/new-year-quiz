import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/new-year-quiz/',
  server: {
    port: 3000,
    host: true,
    allowedHosts: [
      '.ngrok-free.app',
      '.ngrok.io',
      'localhost'
    ]
  }
})
