import * as $ from "cheerio";
import { Player, Team } from "./types";

/**
 *
 * @param {} html HTML code of the website (whole)
 * @param {} position Left (0) or right (1)
 */
function getTeam(html: string, position: number): Team {
  let teamTable;
  let teamTableBench;
  let teamTablePitch;
  if (position === 0) {
    teamTable = $('section.box.away[data-view="0"]', html);
    teamTableBench = $('section.box.bench.away[data-view="0"]', html);
    teamTablePitch = $('section.box.away[data-view="0"]', html);
  } else if (position === 1) {
    teamTable = $('section.box.home[data-view="1"]', html);
    teamTableBench = $('section.box.bench.away[data-view="1"]', html);
    teamTablePitch = $('section.box.away[data-view="1"]', html);
  }

  const teamName = $("span.team-city-full", html)[position].children[0].data;

  const spans = $("span.name > a", teamTable);
  const spansBench = $("td > a", teamTableBench);
  const spansPitch = $("td > a", teamTablePitch);

  const playersActive = parseNames(spans, false);
  const playersBench = parseNames(spansBench, true);
  const playersPitch = parseNames(spansPitch, true);

  let playersAll = playersActive.concat(playersBench, playersPitch);

  playersAll = playersAll.filter(
    (player, index, self) =>
      self.findIndex(
        p => p.name === player.name && p.href === player.href && p.isBench === player.isBench
      ) === index
  );

  const team = new Team(teamName, playersAll, position);

  return team;
}

function parseNames(spans: Cheerio, isBench: boolean): Player[] {
  const players = [];
  for (let i = 0; i < spans.length; i++) {
    const cheerio = spans[i];
    const name = cheerio.attribs["aria-label"];
    const href = cheerio.attribs.href;

    const player = new Player(name, href, isBench);
    players.push(player);
  }

  players.sort(compareNames);
  return players;
}

function compareNames(a: Player, b: Player) {
  const nameA = a.name;
  const nameB = b.name;

  let comparison = 0;
  if (nameA > nameB) comparison = 1;
  else if (nameA < nameB) comparison = -1;

  return comparison;
}

export { getTeam };
