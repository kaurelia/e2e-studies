import { test, expect } from "@playwright/test";

test("Get started with Yii button has valid redirect", async ({ page }) => {
  await page.goto("http://127.0.0.1:8888/");
  await page.waitForLoadState("domcontentloaded");
  const element = await page.locator("a.btn.btn-lg.btn-success");
  await element.waitFor({ state: "attached" });
  await element.click();
  expect(page.url()).toBe("https://www.yiiframework.com/");
});

test("Get started with Yii button has valid background", async ({ page }) => {
  await page.goto("http://127.0.0.1:8888/");
  await page.waitForLoadState("domcontentloaded");
  const element = await page.locator("a.btn.btn-lg.btn-success");
  await element.waitFor({ state: "attached" });
  expect(element).toHaveCSS("background-color", "rgb(92, 184, 92)");
});

test("Get started with Yii button has valid border color", async ({ page }) => {
  await page.goto("http://127.0.0.1:8888/");
  await page.waitForLoadState("domcontentloaded");
  const element = await page.locator("a.btn.btn-lg.btn-success");
  await element.waitFor({ state: "attached" });
  expect(element).toHaveCSS("border-color", "rgb(76, 174, 76)");
});

test("All 3 heading sections are displayed properly", async ({ page }) => {
  await page.goto("http://127.0.0.1:8888/");
  await page.waitForLoadState("domcontentloaded");
  const headingSections = await page.$$(
    "div.body-content>div.row>div.col-lg-4",
  );
  expect(headingSections.length).toBe(3);
});

test("Yii documentation button redirect to a valid place", async ({ page }) => {
  await page.goto("http://127.0.0.1:8888/");
  await page.waitForLoadState("domcontentloaded");
  const button = await page.getByText("Yii Documentation »");
  const language = await page.evaluate((): Promise<string> => {
    return Promise.resolve(window.navigator.language);
  });
  const shortedLanguage = language.substring(0, 2);
  await button.waitFor({ state: "attached" });
  await button.click();
  expect(page.url()).toBe(
    `https://www.yiiframework.com/doc/guide/2.0/${shortedLanguage}`,
  );
});

test("Yii forum button redirect to a valid place", async ({ page }) => {
  await page.goto("http://127.0.0.1:8888/");
  await page.waitForLoadState("domcontentloaded");
  const button = await page.getByText("Yii Forum »");
  await button.waitFor({ state: "attached" });
  await button.click();
  expect(page.url()).toBe("https://forum.yiiframework.com/");
});

test("Yii extensions button redirect to a valid place", async ({ page }) => {
  await page.goto("http://127.0.0.1:8888/");
  await page.waitForLoadState("domcontentloaded");
  const button = await page.getByText("Yii Extensions »");
  await button.waitFor({ state: "attached" });
  await button.click();
  expect(page.url()).toBe("https://www.yiiframework.com/extensions");
});

test("Buttons with btn and btn-default class have a valid border radius", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:8888/");
  await page.waitForLoadState("domcontentloaded");
  const button = await page.locator("a.btn.btn-default", {
    hasText: "Yii Documentation »",
  });
  await button.waitFor({ state: "attached" });
  expect(button).toHaveCSS("border-radius", "4px");
});
