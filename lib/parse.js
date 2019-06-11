const $ = require("cheerio");
const figlet = require("figlet");
const chalk = require("chalk");

function getData(html) {
  const leftTeamTables = $('section.box.away[data-view="0"]', html);
  const rightTeamTables = $('section.box.home[data-view="1"]', html);

  const leftSpans = $("span.name > a", leftTeamTables);
  const rightSpans = $("span.name > a", rightTeamTables);
  const teamNames = $("span.team-city-full", html);

  const leftTeam = teamNames[0].children[0].data;
  const rightTeam = teamNames[1].children[0].data;

  console.log(chalk.blue(figlet.textSync(leftTeam)));
  console.log("\n\n           vs\n\n");
  console.log(chalk.red(figlet.textSync(rightTeam)));

  const leftPlayers = parseNames(leftSpans);
  const rightPlayers = parseNames(rightSpans);

  leftPlayers.forEach((player, index) => {
    console.log(`${index + 1}: ${player.name} ${player.href}`);
  });

  rightPlayers.forEach((player, index) => {
    console.log(`${index + 1}: ${player.name} ${player.href}`);
  });

  console.log("\n\nFinished. Press Ctrl + C to exit.");
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

module.exports.getData = getData;
