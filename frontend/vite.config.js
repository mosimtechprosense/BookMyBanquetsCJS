import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({ open: true }) // optional, shows bundle sizes
  ],

  build: {
    chunkSizeWarningLimit: 1000,
     assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // Split React core
            if (id.includes("react") || id.includes("react-dom")) {
              return "vendor.react";
            }

            // Split React Icons
            if (id.includes("react-icons")) {
              return "vendor.icons";
            }

            // Split Redux
            if (id.includes("redux")) {
              return "vendor.redux";
            }

            // Everything else
            return "vendor.misc";
          }
        },
      },
    },
  },
});