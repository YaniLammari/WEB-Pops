import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/WEB-Pops/', // Ajoutez cette ligne avec le nom exact de votre dépôt
})