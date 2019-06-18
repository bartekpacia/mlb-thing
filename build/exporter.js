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
function exportCsv(players) {
    players.forEach(function (player) {
        delete player.href;
        delete player.isBench;
    });
    var csv = csvExporter.generateCsv(JSON.stringify(players), true);
    fs.writeFileSync("exported.csv", csv);
}
exports.exportCsv = exportCsv;
