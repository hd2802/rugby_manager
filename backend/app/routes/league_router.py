from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.connection import get_db
from app.services.league_service import LeagueService 
from app.schema.schema import LeagueOut, LeagueDetailOut

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

@league_router.get("/leagues/{league_id}", response_model=LeagueDetailOut)
async def get_leauge_by_id(league_id: int, league_service: LeagueService = Depends(get_league_service)):
    league = await league_service.get_league_by_id(league_id)
    if not league:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="League not found")
    return league