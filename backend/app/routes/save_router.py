from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel
from typing import List, Optional
from app.database.connection import get_db
from app.services.save_service import SaveService
from app.schema.schema import TeamOut, TeamDetailOut

save_router = APIRouter()

async def get_save_service(db: AsyncSession = Depends(get_db)) -> SaveService:
    return SaveService(db)

@save_router.post("/new", status_code=status.HTTP_201_CREATED)
async def create_new_save_endpoint(save_service: SaveService = Depends(get_save_service)):
    return await save_service.create_new_save()

@save_router.get("/{save_id}")
async def get_save_by_id_endpoint(save_id: int,save_service: SaveService = Depends(get_save_service)):
    save = await save_service.get_save_by_id_all_information(save_id)
    if not save:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Save not found")
    return save
