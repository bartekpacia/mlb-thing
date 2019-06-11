const $ = require("cheerio");
const figlet = require("figlet");
const chalk = require("chalk");

/**
 *
 * @param {} html HTML code of the website (whole)
 * @param {} position Left (0) or right (1)
 */
function getTeamData(html, position) {
  let teamTable;
  let teamTableBench;
  if (position === 0) {
    teamTable = $('section.box.away[data-view="0"]', html);
    teamTableBench = $('section.box.bench.away[data-view="0"]', html);
  } else if (position === 1) {
    teamTable = $('section.box.home[data-view="1"]', html);
    teamTableBench = $('section.box.bench.away[data-view="1"]', html);
  }

  const teamName = $("span.team-city-full", html)[position].children[0].data;

  const spans = $("span.name > a", teamTable);
  const spansBench = $("td > a", teamTableBench);

  const playersActive = parseNames(spans);
  const playersBench = parseNames(spansBench, true);

  const teamData = {
    position,
    teamName,
    players: playersActive.concat(playersBench)
  };

  return teamData;
}

function parseNames(spans, isBench) {
  const players = [];
  for (let i = 0; i < spans.length; i++) {
    const cheerio = spans[i];
    let name = cheerio.attribs["aria-label"];
    const href = cheerio.attribs.href;

    if (isBench) name = `${name} BENCH`;

    players.push({
      name,
      href
    });
  }

  players.sort(compareNames);
  return players;
}

function compareNames(a, b) {
  const nameA = a.name;
  const nameB = b.name;

  let comparison = 0;
  if (nameA > nameB) comparison = 1;
  else if (nameA < nameB) comparison = -1;

  return comparison;
}

module.exports.getTeamData = getTeamData;
