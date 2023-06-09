import { test, expect } from "@playwright/test";

test("Has been detected as bot", async ({ page, browserName }) => {
  test.skip(browserName === "firefox");
  await page.goto("http://127.0.0.1:8888/");
  const webdriver: boolean = await page.evaluate((): Promise<boolean> => {
    return Promise.resolve(window.navigator.webdriver);
  });
  expect(webdriver).toBe(true);
});
