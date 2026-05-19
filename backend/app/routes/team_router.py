from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel
from typing import List, Optional
from app.database.connection import get_db
from app.services.team_service import TeamService
from app.schema.schema import TeamOut, TeamDetailOut

team_router = APIRouter()

async def get_team_service(db: AsyncSession = Depends(get_db)) -> TeamService:
    return TeamService(db)

@team_router.get("/teams", response_model=list[TeamOut])
async def get_all_teams(team_service: TeamService = Depends(get_team_service)):
    try:
        teams = await team_service.get_all_teams()
        return teams
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while fetching teams: {e}"
        )

@team_router.get("/teams/{team_id}", response_model=TeamDetailOut)
async def get_team_by_id(team_id: int, team_service: TeamService = Depends(get_team_service)):
    team = await team_service.get_team_by_id(team_id)
    if not team:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Team not found")
    return team