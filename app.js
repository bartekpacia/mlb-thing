const puppeteer = require("puppeteer");
const $ = require("cheerio");

const url =
  "https://www.mlb.com/gameday/d-backs-vs-dodgers/2019/03/29/565800#game_state=final,lock_state=final,game_tab=box,game=565800";

getHtml();

async function getHtml() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const content = await page.content();

  const names = [];
  const length = $("span.name > a", content).length;
  console.log($("span.name > a", content).length);

  for (let i = 0; i < length; i++) {
    // names.push($("span.name > a", content)[i].attribs.href);
    const cheerio = $("span.name > a", content)[i];
    const name = cheerio.attribs["aria-label"];
    names.push(name);
  }

  console.log(names);
}
