import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: configDefaults.include.map((pattern) => `tests/golden/${pattern}`),
    passWithNoTests: true,
    reporters: [
      "default",
      {
        onTestRunEnd(modules, errors, reason) {
          if (
            reason === "passed" &&
            modules.length === 0 &&
            errors.length === 0
          ) {
            console.log("Golden suite: 0 cases");
          }
        },
      },
    ],
  },
});
