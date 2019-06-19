import * as $ from "cheerio";
import { Player, Team, Match } from "./types";

/**
 *
 * @param {} html HTML code of the website (whole)
 * @param {} position Left (0) or right (1)
 */
function parseMatch(html: string): Match {
  const team1 = parseTeam(html, 0);
  const team2 = parseTeam(html, 1);
  const date = $("div.date", html).text();

  return new Match(date, team1, team2);
}

function parseTeam(html: string, position: number) {
  let teamTable: Cheerio;
  let teamTableBench: Cheerio;
  let teamTablePitch: Cheerio;
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
  const playersPitch = parseNames(spansPitch, false);

  let playersAll = playersActive.concat(playersBench, playersPitch);

  // Remove players who played *and* sat on bench
  playersAll = playersAll.filter((player, index) => {
    return (
      index ===
      playersAll.findIndex(p => {
        return p.name === player.name;
      })
    );
  });

  playersAll.sort(compareNames);

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

export { parseMatch };
