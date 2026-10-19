import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Hashed bundles go to dist/static/, not the default dist/assets/, which is
    // where public/assets/ is copied. Hashed files can be cached forever; the
    // swap-in-place files in public/assets/ (og-image, favicon, manifest) must
    // not be, so the two must not share a path a host could cache as one.
    assetsDir: 'static',
  },
})
