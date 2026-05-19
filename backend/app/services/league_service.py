from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.database.models import League

class LeagueService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_all_leagues(self) -> list[League]:
        result = await self.db.execute(select(League))
        return result.scalars().all()
