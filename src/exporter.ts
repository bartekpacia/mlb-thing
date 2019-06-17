import { ExportToCsv, Options } from "export-to-csv";
import { Team, Player } from "./types";
import * as fs from "fs";

const options: Options = {
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

const csvExporter = new ExportToCsv(options);

function exportCsv(players: Player[]) {
  console.log(JSON.stringify(players));
  const csv = csvExporter.generateCsv(JSON.stringify(players), true);
  fs.writeFileSync("exported.csv", csv);
}

export { exportCsv };
