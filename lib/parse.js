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
  if (position === 0) {
    teamTable = $('section.box.away[data-view="0"]', html);
  } else if (position === 1) {
    teamTable = $('section.box.home[data-view="1"]', html);
  }

  const spans = $("span.name > a", teamTable);
  const teamName = $("span.team-city-full", html)[position].children[0].data;

  console.log(chalk.blue(figlet.textSync(teamName)));

  const players = parseNames(spans);

  players.forEach((player, index) => {
    console.log(`${index + 1}: ${player.name} ${player.href}`);
  });

  // console.log("\n\nFinished. Press Ctrl + C to exit.");

  const teamData = {
    position,
    teamName,
    players
  };

  return teamData;
}

function parseNames(spans) {
  const players = [];
  for (let i = 0; i < spans.length; i++) {
    const cheerio = spans[i];
    const name = cheerio.attribs["aria-label"];
    const href = cheerio.attribs.href;
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
