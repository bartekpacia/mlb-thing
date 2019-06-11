import * as puppeteer from "puppeteer";

async function getHtml(url: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitFor(1500);
  const content = await page.content();
  return content;
}

export { getHtml };
