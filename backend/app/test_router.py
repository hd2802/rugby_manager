from fastapi import Depends, APIRouter
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.database.models import League
from app.database.connection import get_db
from pydantic import BaseModel

class LeagueOut(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True

router = APIRouter()

@router.get("/leagues", response_model=list[LeagueOut])
async def get_leagues(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(League))
    leagues = result.scalars().all()
    return leagues