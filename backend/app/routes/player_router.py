from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.connection import get_db
from app.services.player_service import PlayerService
from app.schema.schema import PlayerOut

player_router = APIRouter()

async def get_player_service(db: AsyncSession = Depends(get_db)) -> PlayerService:
    return PlayerService(db)

@player_router.get("/", response_model=list[PlayerOut])
async def get_all_players(player_service: PlayerService = Depends(get_player_service)):
    try:
        players = await player_service.get_all_players()
        return players
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while fetching players: {e}"
        )

@player_router.get("/{player_id}", response_model=PlayerOut)
async def get_player_by_id(player_id: int, player_service: PlayerService = Depends(get_player_service)):
    player = await player_service.get_player_by_id(player_id)
    if not player:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Player not found")
    return player