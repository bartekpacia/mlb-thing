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

/**
 * Creates 2 .csv files containing players of each team.
 */
function exportCsv(team1: Team, team2: Team) {
  // TODO Extract duplicated code to one function.

  team1.players.forEach(player => {
    delete player.href;
    delete player.isBench;
  });

  team2.players.forEach(player => {
    delete player.href;
    delete player.isBench;
  });

  const csv1 = csvExporter.generateCsv(JSON.stringify(team1.players), true);
  fs.writeFileSync(`${team1.name}_players.csv`, csv1);

  const csv2 = csvExporter.generateCsv(JSON.stringify(team2.players), true);
  fs.writeFileSync(`${team2.name}_players.csv`, csv2);
}

export { exportCsv };
