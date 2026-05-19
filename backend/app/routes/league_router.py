from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel

from app.database.connection import get_db
from app.services.league_service import LeagueService 

class LeagueOut(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True

league_router = APIRouter()

async def get_league_service(db: AsyncSession = Depends(get_db)) -> LeagueService:
    return LeagueService(db)

@league_router.get("/leagues", response_model=list[LeagueOut])
async def get_all_leagues(league_service: LeagueService = Depends(get_league_service)):
    try:
        leagues = await league_service.get_all_leagues()
        return leagues
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while fetching leagues: {e}"
        )