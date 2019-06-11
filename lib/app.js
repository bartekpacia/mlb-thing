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
  const leftTeamData = parse.getTeamData(html, 0);
  const rightTeamData = parse.getTeamData(html, 1);

  const leftTeamName = leftTeamData.teamName;
  const rightTeamName = rightTeamData.teamName;

  console.log(chalk.blue(figlet.textSync(leftTeamName)));
  console.log(chalk.white(figlet.textSync(` \n\nVS\n\n `)));
  console.log(chalk.red(figlet.textSync(rightTeamName)));
  console.log("\n\n");

  console.log(chalk.blue(`${leftTeamName} players`));
  leftTeamData.players.forEach((player, index) => {
    console.log(`${index}: ${player.name}   ${player.href}`);
  });

  console.log("\n\n");

  console.log(chalk.red(`${rightTeamName} players`));
  rightTeamData.players.forEach((player, index) => {
    console.log(`${index + 1}: ${player.name}   ${player.href}`);
  });

  console.log("\n\n\nFinished. Press Ctrl + C to exit.");
});
