import { defineConfig } from "vite";
import { resolve } from "path";

const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");

export default defineConfig({
  root,
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
        github: resolve(root, "github", "index.html"),
        day1: resolve(root, "day1", "index.html"),
        animationDay1: resolve(root, "animations", "day-1", "index.html"),
        animationDay2: resolve(root, "animations", "day-2", "index.html"),
        animationDay3: resolve(root, "animations", "day-3", "index.html"),
      },
    },
  },
});
