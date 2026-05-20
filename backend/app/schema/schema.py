from pydantic import BaseModel
from typing import List, Optional

class LeagueOut(BaseModel):
    id: int
    name: str


class LeagueDetailOut(LeagueOut):
    teams: List[TeamOut] = []


class TeamOut(BaseModel):
    id: int
    name: str
    league_id: int
    save_id: Optional[int]


class TeamDetailOut(TeamOut):
    players: List[PlayerOut] = []


class PlayerOut(BaseModel):
    id: int
    name: str
    position: str
    dob: str
    height: str
    weight: str
    contract: str
    raw_price: int
    strength: int
    speed: int
    passing: int
    kicking: int
    tackling: int
    save_id: Optional[int]
    team_id: int
