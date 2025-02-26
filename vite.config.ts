import path from "path"
import react from "@vitejs/plugin-react-swc"
import {defineConfig, loadEnv} from "vite"

// https://vite.dev/config/

export default ({ mode } : { mode: string }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd(), '')}

  if (!process.env.BASE_PATH) {
      throw new Error("BASE_PATH is required")
  }

  return defineConfig({
    base: `/${process.env.BASE_PATH}`,
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    preview: {
      port: 3000
    },
    server: {
      port: 3000,
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