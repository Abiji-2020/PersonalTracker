import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Ensure the output directory is correct
  },
  server: {
    open: true, // Optional: Automatically opens the app in the browser
  },
});
