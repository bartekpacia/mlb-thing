import { ExportToCsv, Options } from "export-to-csv";
import { Team, Player } from "./types";
import * as fs from "fs";

const options: Options = {
  fieldSeparator: ",",
  quoteStrings: '"',
  decimalSeparator: ".",
  showLabels: true,
  useTextFile: false
  // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
};

const csvExporter = new ExportToCsv(options);

function exportCsv(players: Player[]) {
  players.forEach(player => {
    delete player.href;
    delete player.isBench;
  });

  const csv = csvExporter.generateCsv(JSON.stringify(players), true);
  fs.writeFileSync("exported.csv", csv);
}

export { exportCsv };
