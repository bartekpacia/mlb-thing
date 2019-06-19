import { ExportToCsv, Options } from "export-to-csv";
import { Team, Player } from "./types";
import * as fs from "fs";

const options: Options = {
  fieldSeparator: ",",
  quoteStrings: '"',
  decimalSeparator: "."
};

const csvExporter = new ExportToCsv(options);

/**
 * Creates 2 .csv files containing players of each team.
 */
function exportCsv(team1: Team, team2: Team) {
  exportTeamPlayersToCsv(team1);
  exportTeamPlayersToCsv(team2);
}

function exportTeamPlayersToCsv(team: Team) {
  team.players.forEach(player => {
    delete player.href;
    delete player.isBench;
  });

  const csv1 = csvExporter.generateCsv(JSON.stringify(team.players), true);
  fs.writeFileSync(`outputs/${team.name}_players.csv`, csv1);
}

export { exportCsv };
