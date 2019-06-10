const puppeteer = require("puppeteer");

async function getHtml(_url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(_url);
  await page.waitFor(800);
  const content = await page.content();
  return content;
}

module.exports.getHtml = getHtml;
