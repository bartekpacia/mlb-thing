const $ = require("cheerio");

function getData(html) {
  const players = [];
  const length = $("span.name > a", html).length;

  const leftTeamTables = $('section.box.away[data-view="0"]', html);
  console.log(leftTeamTables);

  // const rightTeamTables = $("section.box.home", html);
  // console.log(rightTeamTables);

  // console.log(`${length} players in this match`);

  for (let i = 0; i < length; i++) {
    const cheerio = $("span.name > a", leftTeamTables)[i];
    const name = cheerio.attribs["aria-label"];
    const href = cheerio.attribs.href;
    players.push({
      name,
      href
    });
  }

  players.sort(compareNames);

  players.forEach(player => {
    console.log(`${player.name} ${player.href}`);
  });

  console.log("\n\nFinished. Press Ctrl + C to exit.");
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
