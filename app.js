const puppeteer = require("puppeteer");
const readline = require("readline");
const $ = require("cheerio");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const matchUrl =
  "https://www.mlb.com/gameday/d-backs-vs-dodgers/2019/03/29/565800#game_state=final,lock_state=final,game_tab=box,game=565800";

rl.question("Siema Bartek, podaj url meczu: ", answer => {
  getHtml(answer);
});

async function getHtml(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const content = await page.content();
  // console.log(content);

  const players = [];
  const length = $("span.name > a", content).length;
  console.log($("span.name > a", content).length);

  for (let i = 0; i < length; i++) {
    // names.push($("span.name > a", content)[i].attribs.href);
    const cheerio = $("span.name > a", content)[i];
    const name = cheerio.attribs["aria-label"];
    const href = cheerio.attribs.href;
    players.push({
      name,
      href
    });
  }

  players.forEach(player => {
    console.log(`${player.name} ${player.href}`);
  });
}
