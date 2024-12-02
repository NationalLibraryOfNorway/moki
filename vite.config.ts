import path from "path"
import react from "@vitejs/plugin-react-swc"
import {defineConfig, loadEnv} from "vite"

// https://vite.dev/config/

export default ({ mode } : { mode: string }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd(), '')}

  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: {
        "/api": {
          target: process.env.API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "")
        }
      }
    }
  })

}