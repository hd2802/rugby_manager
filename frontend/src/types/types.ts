export type League = {
    id: number,
    name: string,
    teams: Team[]
}

export type Team = {
    id: number,
    name: string,
    league: League
}

export interface TeamDataProps {
  teamData: Team;
  leagueName: string,
}

export interface TeamGridProps {
  leagues: League[];
}