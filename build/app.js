"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline-sync");
var figlet = require("figlet");
var chalk_1 = require("chalk");
var download = require("./downloader");
var parse = require("./parser");
var exporter = require("./exporter");
console.log(chalk_1.default.green("MLB Thing") + " by Bartek Pacia | Command-line baseball data scraper");
console.log("Player names colored on " + chalk_1.default.yellow("yellow") + " were only on bench");
var url = readline.question("Enter URL of the match: ");
if (url.length === 0)
    url =
        "https://www.mlb.com/gameday/d-backs-vs-dodgers/2019/03/29/565800#game_state=final,lock_state=final,game_tab=box,game=565800";
download.getHtml(url).then(function (html) {
    var leftTeam = parse.getTeam(html, 0);
    var rightTeam = parse.getTeam(html, 1);
    var leftTeamName = leftTeam.name;
    var rightTeamName = rightTeam.name;
    console.log(chalk_1.default.blue(figlet.textSync(leftTeamName)));
    console.log(chalk_1.default.white(figlet.textSync(" \n\nVS\n\n ")));
    console.log(chalk_1.default.red(figlet.textSync(rightTeamName)));
    console.log("\n\n");
    console.log(chalk_1.default.blue(leftTeamName + " players (" + leftTeam.players.length + " in total)"));
    leftTeam.players.forEach(function (player, index) {
        logPlayer(player, index);
    });
    console.log("\n\n");
    console.log(chalk_1.default.red(rightTeamName + " players (" + rightTeam.players.length + " in total)"));
    rightTeam.players.forEach(function (player, index) {
        logPlayer(player, index);
    });
    exporter.exportCsv(leftTeam, rightTeam);
    console.log("\n\n");
    console.log("Experimental feature - CSV file has been generated.");
    console.log("\n\n\nFinished. Press Ctrl + C to exit.");
});
function logPlayer(player, index) {
    if (player.isBench) {
        console.log(chalk_1.default.yellow(player.name + "   " + player.href));
    }
    else {
        console.log(player.name + "   " + player.href);
    }
}
