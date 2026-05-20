from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.database.models import Player

class PlayerService:
    def __init__(self, db: AsyncSession):
        self.db = db
    
    async def get_all_players(self) -> list[Player]:
        result = await self.db.execute(select(Player))
        return result.scalars().all()
    
    async def get_player_by_id(self, player_id: int) -> Player | None:
        result = await self.db.execute(
            select(Player)
            .where(Player.id == player_id)
        )
        return result.scalar_one_or_none()