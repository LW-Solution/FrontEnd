import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';

// Carregue as variáveis de ambiente de acordo com o modo de execução
const env = dotenv.config({
  path: process.env.NODE_ENV === "production" ? ".env.prod" : ".env.dev",
}).parsed;

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/scss/variables";`,
      },
    },
  },
  define: {
    // Injete as variáveis de ambiente no código para uso durante a compilação
    "process.env": Object.keys(env || {}).reduce((prev: Record<string, string>, key: string) => {
      prev[key] = JSON.stringify(env?.[key]);
      return prev;
    }, {}),
  },
});