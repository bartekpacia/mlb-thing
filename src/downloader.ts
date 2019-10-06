import * as puppeteer from "puppeteer";

async function getHtml(url: string) {
  const executablePath = puppeteer.executablePath();

  const browser = await puppeteer.launch({ executablePath });
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitFor(1500);
  const content = await page.content();
  return content;
}

export { getHtml };
