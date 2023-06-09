import { test, expect } from "@playwright/test";

test("Footer has valid copyright", async ({ page }) => {
  await page.goto("http://127.0.0.1:8888/");
  await page.waitForLoadState("domcontentloaded");
  const copyright = await page.locator("footer>.container>.pull-left");
  await copyright.waitFor({ state: "attached" });
  expect(copyright).toHaveText(`© My Company ${new Date().getFullYear()}`);
});

test("Powered by Yii Framework link redirect to valid place", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:8888/");
  await page.waitForLoadState("domcontentloaded");
  const link = await page.locator("footer>.container>.pull-right>a");
  await link.waitFor({ state: "attached" });
  await link.click();
  expect(page.url()).toBe("https://www.yiiframework.com/");
});

test("Footer has valid height", async ({ page }) => {
  await page.goto("http://127.0.0.1:8888/");
  await page.waitForLoadState("domcontentloaded");
  const footer = await page.locator("footer");
  await footer.waitFor({ state: "attached" });
  expect(footer).toHaveCSS("height", "60px");
});

test("Footer has valid background color", async ({ page }) => {
  await page.goto("http://127.0.0.1:8888/");
  await page.waitForLoadState("domcontentloaded");
  const footer = await page.locator("footer");
  await footer.waitFor();
  expect(footer).toHaveCSS("background-color", "rgb(245, 245, 245)");
});
