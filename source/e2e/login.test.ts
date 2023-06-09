import { test, expect } from "@playwright/test";

test("Login works with demo data", async ({ page }) => {
  await page.goto("http://127.0.0.1:8888/index.php?r=site%2Flogin");
  await page.waitForLoadState("domcontentloaded");
  const usernameInput = await page.locator("#loginform-username");
  await usernameInput.waitFor({ state: "attached" });
  await usernameInput.type("demo");
  const passwordInput = await page.locator("#loginform-password");
  await passwordInput.waitFor({ state: "attached" });
  await passwordInput.type("demo");
  const submitButton = await page.locator("button[type=submit]");
  await submitButton.waitFor({ state: "attached" });
  await submitButton.click();
  await page.waitForTimeout(2_000);
  expect(page.url()).toBe("http://127.0.0.1:8888/index.php");
});

test("Login works with admin data", async ({ page }) => {
  await page.goto("http://127.0.0.1:8888/index.php?r=site%2Flogin");
  await page.waitForLoadState("domcontentloaded");
  const usernameInput = await page.locator("#loginform-username");
  await usernameInput.waitFor({ state: "attached" });
  await usernameInput.type("admin");
  const passwordInput = await page.locator("#loginform-password");
  await passwordInput.waitFor({ state: "attached" });
  await passwordInput.type("admin");
  const submitButton = await page.locator("button[type=submit]");
  await submitButton.waitFor({ state: "attached" });
  await submitButton.click();
  await page.waitForTimeout(2_000);
  expect(page.url()).toBe("http://127.0.0.1:8888/index.php");
});
