"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Player = /** @class */ (function () {
    function Player(name, href, isBench) {
        this.name = name;
        this.href = href;
        this.isBench = isBench;
    }
    return Player;
}());
exports.Player = Player;
var Team = /** @class */ (function () {
    // Position can be either 0 or 1
    function Team(name, players, position) {
        this.name = name;
        this.players = players;
        this.position = position;
    }
    return Team;
}());
exports.Team = Team;
