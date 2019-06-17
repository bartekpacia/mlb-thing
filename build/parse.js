"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var $ = require("cheerio");
var types_1 = require("./types");
/**
 *
 * @param {} html HTML code of the website (whole)
 * @param {} position Left (0) or right (1)
 */
function getTeam(html, position) {
    var teamTable;
    var teamTableBench;
    var teamTablePitch;
    if (position === 0) {
        teamTable = $('section.box.away[data-view="0"]', html);
        teamTableBench = $('section.box.bench.away[data-view="0"]', html);
        teamTablePitch = $('section.box.away[data-view="0"]', html);
    }
    else if (position === 1) {
        teamTable = $('section.box.home[data-view="1"]', html);
        teamTableBench = $('section.box.bench.away[data-view="1"]', html);
        teamTablePitch = $('section.box.away[data-view="1"]', html);
    }
    var teamName = $("span.team-city-full", html)[position].children[0].data;
    var spans = $("span.name > a", teamTable);
    var spansBench = $("td > a", teamTableBench);
    var spansPitch = $("td > a", teamTablePitch);
    var playersActive = parseNames(spans, false);
    var playersBench = parseNames(spansBench, true);
    var playersPitch = parseNames(spansPitch, true);
    var playersAll = playersActive.concat(playersBench, playersPitch);
    playersAll.filter(function (player, index) {
        return playersAll.indexOf(player) == index;
    });
    var team = new types_1.Team(teamName, playersAll, position);
    return team;
}
exports.getTeam = getTeam;
function parseNames(spans, isBench) {
    var players = [];
    for (var i = 0; i < spans.length; i++) {
        var cheerio_1 = spans[i];
        var name_1 = cheerio_1.attribs["aria-label"];
        var href = cheerio_1.attribs.href;
        var player = new types_1.Player(name_1, href, isBench);
        players.push(player);
    }
    players.sort(compareNames);
    return players;
}
function compareNames(a, b) {
    var nameA = a.name;
    var nameB = b.name;
    var comparison = 0;
    if (nameA > nameB)
        comparison = 1;
    else if (nameA < nameB)
        comparison = -1;
    return comparison;
}
