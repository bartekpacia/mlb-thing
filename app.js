const puppeteer = require("puppeteer");
const readline = require("readline-sync");
const figlet = require("figlet");
const $ = require("cheerio");

console.log(figlet.textSync("MLB Thing\n"));

const url = readline.question("Enter URL of the match: ");
getHtml(url).then(html => {
  process(html);
});

async function getHtml(_url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(_url);
  const content = await page.content();
  console.log(`Browser: ${await browser.version()}`);
  return content;
}

function process(_html) {
  const players = [];
  const length = $("span.name > a", _html).length;
  console.log(`${length} players in this match`);

  for (let i = 0; i < length; i++) {
    const cheerio = $("span.name > a", _html)[i];
    const name = cheerio.attribs["aria-label"];
    const href = cheerio.attribs.href;
    players.push({
      name,
      href
    });
  }

  players.sort(compareNames);

  players.forEach(player => {
    console.log(`${player.name} ${player.href}`);
  });

  console.log("\n\nFinished. Press Ctrl + C to exit.");
}

function compareNames(a, b) {
  const nameA = a.name;
  const nameB = b.name;

  let comparison = 0;
  if (nameA > nameB) comparison = 1;
  else if (nameA < nameB) comparison = -1;

  return comparison;
}
