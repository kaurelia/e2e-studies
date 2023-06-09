import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./source/e2e",
  fullyParallel: true,
  reporter: "html",
  use: {
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
  webServer: {
    command: "yarn run start-yii-app",
    url: "http://127.0.0.1:8888",
    reuseExistingServer: true,
  },
  globalTeardown: "./source/global-teardown.ts",
});
