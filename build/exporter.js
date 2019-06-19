"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var export_to_csv_1 = require("export-to-csv");
var fs = require("fs");
var options = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: "."
};
var csvExporter = new export_to_csv_1.ExportToCsv(options);
/**
 * Creates 2 .csv files containing players of each team.
 */
function exportCsv(team1, team2) {
    exportTeamPlayersToCsv(team1);
    exportTeamPlayersToCsv(team2);
}
exports.exportCsv = exportCsv;
function exportTeamPlayersToCsv(team) {
    team.players.forEach(function (player) {
        delete player.href;
        delete player.isBench;
    });
    var csv1 = csvExporter.generateCsv(JSON.stringify(team.players), true);
    fs.writeFileSync(team.name + "_players.csv", csv1);
}
