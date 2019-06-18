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

function exportCsv(team1: Team, team2: Team) {
  team1.players.forEach(player => {
    delete player.href;
    delete player.isBench;
  });

  team2.players.forEach(player => {
    delete player.href;
    delete player.isBench;
  });

  console.log(team1.players);
  console.log(team2.players);

  const twoTeams = {
    "1": "team1.players",
    "2": "team2.players"
  };

  const csv = csvExporter.generateCsv(JSON.stringify(twoTeams), true);
  fs.writeFileSync("exported.csv", csv);
}

export { exportCsv };
