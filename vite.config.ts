
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./", // This ensures assets are loaded correctly with relative paths
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
