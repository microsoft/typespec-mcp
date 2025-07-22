import { defineConfig, mergeConfig } from "vitest/config";

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

export default mergeConfig(
  defaultTypeSpecVitestConfig,
  defineConfig({
    test: {
      projects: ["packages/*/vitest.config.ts"],
    },
  }),
);
