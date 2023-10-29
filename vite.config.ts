import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@domain": "src/domain/index.ts",
      "@ui": "src/ui/index.ts",
      "@application": "src/application/index.ts",
      "@router": "src/router/index.ts",
    },
  },
})
