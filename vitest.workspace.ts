import { defineConfig } from "vitest/config";

export default ["packages/*/vitest.config.ts"];
/**
 * Default Config For all TypeSpec projects using vitest.
 */
export const defaultTypeSpecVitestConfig = defineConfig({
  test: {
    environment: "node",
    isolate: false,
    exclude: ["**/node_modules", "dist/**/*.test.*", "temp/**/*.test.*"],
  },
  server: {
    watch: {
      ignored: [],
    },
  },
});
