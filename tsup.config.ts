import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/utils/registerCommands.ts"],
  format: ["esm"],
  target: "node22",
  outDir: "dist",
  sourcemap: true,
  splitting: true,
  clean: true,
  dts: false,
});
