"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var export_to_csv_1 = require("export-to-csv");
var fs = require("fs");
var options = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    useTextFile: false
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
};
var csvExporter = new export_to_csv_1.ExportToCsv(options);
function exportCsv(team1, team2) {
    team1.players.forEach(function (player) {
        delete player.href;
        delete player.isBench;
    });
    team2.players.forEach(function (player) {
        delete player.href;
        delete player.isBench;
    });
    console.log(team1.players);
    console.log(team2.players);
    // const twoTeams = {
    //   "1": team1.players,
    //   "2": team2.players
    // };
    // const teamsStringified = JSON.stringify(twoTeams);
    // console.log(teamsStringified);
    var csv1 = csvExporter.generateCsv(JSON.stringify(team1.players), true);
    fs.writeFileSync(team1.name + "_players.csv", csv1);
    var csv2 = csvExporter.generateCsv(JSON.stringify(team2.players), true);
    fs.writeFileSync(team2.name + "_players.csv", csv2);
}
exports.exportCsv = exportCsv;
