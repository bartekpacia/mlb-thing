const puppeteer = require("puppeteer");

async function getHtml(_url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(_url);
  await page.waitFor(500);
  const content = await page.content();
  console.log(`Browser: ${await browser.version()}`);
  return content;
}

module.exports.getHtml = getHtml;
