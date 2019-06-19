class Player {
  constructor(public name: string, public href: string, public isBench: boolean) {}
}

class Team {
  // Position can be either 0 or 1
  constructor(public name: string, public players: Player[], public position: number) {}
}

class Match {
  constructor(public date: String, public team1: Team, public team2: Team) {}
}

export { Match, Team, Player };
