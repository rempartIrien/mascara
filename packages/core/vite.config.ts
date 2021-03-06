import * as fs from "node:fs/promises";
import * as path from "node:path";

import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

const buildDirectory = "dist";
const rootFilePattern = "mascara.core";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
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
  },
});
