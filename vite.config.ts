import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// If deploying to a project site (e.g. username.github.io/repo),
// set VITE_BASE=/repo/ in an .env file or your CI.
// For user/organization sites at username.github.io, leave as '/'.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || '/',
})