import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    VitePWA({
    manifest: {
      name: "Weather Site",
      short_name: "Weather",
      description:
        "An app to display the weather for your location.",
    }
  })],
  base: "/Weather-site/",
  resolve: {
    alias: {
      "@domain": "src/domain/index.ts",
      "@ui": "src/ui/index.ts",
      "@application": "src/application/index.ts",
      "@router": "src/router/index.ts",
      "@infrastructure": "src/infrastructure/index.ts",
    },
  },
})
