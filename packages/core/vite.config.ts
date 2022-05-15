import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import * as path from "node:path";
import * as fs from "node:fs/promises";

const buildDirectory = "dist";
const rootFilePattern = "mascara.core";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      afterBuild: async () => {
        const src = path.resolve(__dirname, `${buildDirectory}/index.d.ts`);
        const dest = path.resolve(
          __dirname,
          `${buildDirectory}/${rootFilePattern}.d.ts`,
        );
        await fs.copyFile(src, dest);
        return fs.rm(src);
      },
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "@mascara/core",
      formats: ["es", "umd"],
      fileName: (format) => `${rootFilePattern}.${format}.js`,
    },
    outDir: buildDirectory,
    rollupOptions: {
      // Externalize deps that shouldn't be bundled into the library
      external: ["react", "react-dom"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
