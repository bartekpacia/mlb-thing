"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var export_to_csv_1 = require("export-to-csv");
var fs = require("fs");
var options = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    showTitle: true,
    title: "exported match",
    useTextFile: false,
    useKeysAsHeaders: true
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
};
var csvExporter = new export_to_csv_1.ExportToCsv(options);
function exportCsv(players) {
    console.log(JSON.stringify(players));
    var csv = csvExporter.generateCsv(JSON.stringify(players), true);
    fs.writeFileSync("exported.csv", csv);
}
exports.exportCsv = exportCsv;
