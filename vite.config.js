import path from "path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(() => {
  return {
    server: {
      port: 3000,
      host: "0.0.0.0",
    },
    plugins: [react(), tailwindcss()],
    optimizeDeps: {
      include: ["sonner"],
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react", "react-dom", "react-router-dom"],
            forms: ["react-hook-form", "@hookform/resolvers", "zod"],
            ui: [
              "@headlessui/react",
              "@radix-ui/react-select",
              "lucide-react",
              "sonner",
            ],
            phone: ["libphonenumber-js"],
          },
        },
      },
    },
    define: {},
    resolve: {
      alias: {
        "@": path.resolve(rootDir, "."),
      },
    },
  };
});
