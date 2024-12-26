import { defineConfig } from "vite";


export default defineConfig({
  build: {
    target: 'esnext',
    minify: 'esbuild',
    chunkSizeWarningLimit: 500, // Adjust if bundles are too large
  },
});