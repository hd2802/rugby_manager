from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from app.database.models import Team

class TeamService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_all_teams(self) -> list[Team]:
        result = await self.db.execute(select(Team))
        return result.scalars().all()

    async def get_team_by_id(self, team_id: int) -> Team | None:
        result = await self.db.execute(
            select(Team)
            .options(selectinload(Team.players))
            .where(Team.id == team_id)
        )
        return result.scalar_one_or_none()