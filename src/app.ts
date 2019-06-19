import * as readline from "readline-sync";
import * as figlet from "figlet";
import chalk from "chalk";

import * as download from "./downloader";
import * as parse from "./parser";
import * as exporter from "./exporter";
import { Player } from "./types";

console.log(`${chalk.green("MLB Thing")} by Bartek Pacia | Command-line baseball data scraper`);
console.log(`Player names colored on ${chalk.yellow("yellow")} were only on bench`);

let url = readline.question("Enter URL of the match: ");
if (url.length === 0)
  url =
    "https://www.mlb.com/gameday/d-backs-vs-dodgers/2019/03/29/565800#game_state=final,lock_state=final,game_tab=box,game=565800";

download.getHtml(url).then(html => {
  const match = parse.parseMatch(html);

  const leftTeam = match.team1;
  const rightTeam = match.team2;

  const leftTeamName = leftTeam.name;
  const rightTeamName = rightTeam.name;

  console.log(chalk.blue(figlet.textSync(leftTeamName)));
  console.log(chalk.white(figlet.textSync(` \n\nVS\n\n `)));
  console.log(chalk.red(figlet.textSync(rightTeamName)));
  console.log("\n\n");
  console.log(`Match took place on ${match.date}\n\n`);

  console.log(chalk.blue(`${leftTeamName} players (${leftTeam.players.length} in total)`));
  leftTeam.players.forEach((player, index) => {
    logPlayer(player, index);
  });

  console.log("\n\n");

  console.log(chalk.red(`${rightTeamName} players (${rightTeam.players.length} in total)`));
  rightTeam.players.forEach((player, index) => {
    logPlayer(player, index);
  });

  exporter.exportCsv(leftTeam, rightTeam);
  console.log("\n\n");
  console.log("Experimental feature - CSV files have been generated.");
  console.log("\n\n\nFinished. Press Ctrl + C to exit.");
});

function logPlayer(player: Player, index: number) {
  if (player.isBench) {
    console.log(chalk.yellow(`${player.name}   ${player.href}`));
  } else {
    console.log(`${player.name}   ${player.href}`);
  }
}
