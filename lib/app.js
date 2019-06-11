const readline = require("readline-sync");
const figlet = require("figlet");
const chalk = require("chalk");

const fetch = require("./fetch");
const parse = require("./parse");

console.log(`${chalk.green("MLB Thing")} by Bartek Pacia | Command-line baseball data scraper`);

let url = readline.question("Enter URL of the match: ");
if (url.length === 0)
  url =
    "https://www.mlb.com/gameday/d-backs-vs-dodgers/2019/03/29/565800#game_state=final,lock_state=final,game_tab=box,game=565800";

fetch.getHtml(url).then(html => {
  parse.getData(html);
});
