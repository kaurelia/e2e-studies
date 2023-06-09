import { test, expect } from "@playwright/test";

test("Has valid amount of menu items", async ({ page }) => {
  await page.goto("http://127.0.0.1:8888/");
  await page.waitForLoadState("domcontentloaded");
  const elements = await page.$$("ul.nav>li>a");
  expect(elements.length).toBe(4);
});

test("Active menu item have valid background color", async ({ page }) => {
  await page.goto("http://127.0.0.1:8888/");
  await page.waitForLoadState("domcontentloaded");
  const element = await page.locator("ul.nav>li.active>a");
  await element.waitFor({ state: "attached" });
  expect(element).toHaveCSS("background-color", "rgb(8, 8, 8)");
});

test("Main text on menu in top left corner have valid value", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:8888/");
  await page.waitForLoadState("domcontentloaded");
  const element = await page.locator("a.navbar-brand");
  await element.waitFor({ state: "attached" });
  expect(element).toHaveText("My Company");
});

test("Main text on menu in top left corner change color on hover", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:8888/");
  await page.waitForLoadState("domcontentloaded");
  const element = await page.locator("a.navbar-brand");
  await element.waitFor({ state: "attached" });
  await element.hover();
  expect(element).toHaveCSS("color", "rgb(255, 255, 255)");
});

test("Menu items have a right order", async ({ page }) => {
  const order = new Set(["Home", "About", "Contact", "Login"]);
  const orderAsArray = [...order];
  await page.goto("http://127.0.0.1:8888/");
  await page.waitForLoadState("domcontentloaded");
  const elements = await page.$$("ul.nav>li>a");
  const promises = elements.map((_item, index) => {
    return async () => {
      const element = await page.locator(`ul.nav>li>a>>nth=${index}`);
      await element.waitFor({ state: "attached" });
      expect(element).toHaveText(orderAsArray[index]);
    };
  });
  await promises.reduce(async (accumulator, promise) => {
    await accumulator;
    await promise();
    return Promise.resolve(undefined);
  }, Promise.resolve(undefined));
});

test("Menu items redirect to a valid locations", async ({ page }) => {
  const order = new Set([
    "http://127.0.0.1:8888/index.php?r=site%2Findex",
    "http://127.0.0.1:8888/index.php?r=site%2Fabout",
    "http://127.0.0.1:8888/index.php?r=site%2Fcontact",
    "http://127.0.0.1:8888/index.php?r=site%2Flogin",
  ]);
  const orderAsArray = [...order];
  await page.goto("http://127.0.0.1:8888/");
  await page.waitForLoadState("domcontentloaded");
  const elements = await page.$$("ul.nav>li>a");
  const promises = elements.map((_item, index) => {
    return async () => {
      const element = await page.locator(`ul.nav>li>a>>nth=${index}`);
      await element.waitFor({ state: "attached" });
      await element.click();
      expect(page.url()).toBe(orderAsArray[index]);
      await page.goto("http://127.0.0.1:8888/");
    };
  });
  await promises.reduce(async (accumulator, promise) => {
    await accumulator;
    await promise();
    return Promise.resolve(undefined);
  }, Promise.resolve(undefined));
});
