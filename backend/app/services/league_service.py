from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.database.models import League
from sqlalchemy.orm import selectinload

class LeagueService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_all_leagues(self) -> list[League]:
        result = await self.db.execute(select(League))
        return result.scalars().all()

    async def get_league_by_id(self, league_id: int) -> League | None:
        result = await self.db.execute(
            select(League)
            .options(selectinload(League.teams))
            .where(League.id == league_id)
        )
        return result.scalar_one_or_none()