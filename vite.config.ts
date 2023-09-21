import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: ['..']
    },
    host: true,
    port: 3001,
  },
  define: {
    'process.env.NODE_ENV': '"production"'
  },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/main.tsx'),
      name: 'MyLib',
      // the proper extensions will be added
      fileName: 'my-lib',
    },
  }
})
