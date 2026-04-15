import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({ open: true }) // optional
  ],

  // <-- add optimizeDeps here
  optimizeDeps: {
    include: ["react", "react-dom", "react-helmet-async", "@tiptap/react", "@tiptap/starter-kit"],
  },

  build: {
    chunkSizeWarningLimit: 1000,
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
manualChunks(id) {
  if (id.includes("node_modules")) {

    if (id.includes("react") || id.includes("react-dom")) {
      return;
    }

    if (id.includes("react-icons")) {
      return "vendor.icons";
    }

    if (id.includes("redux")) {
      return "vendor.redux";
    }

    if (id.includes("@tiptap")) {
      return "vendor.tiptap";
    }

    return "vendor.misc";
  }
},
      },
    },
  },
});