from fastapi import FastAPI, Depends, HTTPException, status, APIRouter
from contextlib import asynccontextmanager
from app.database.connection import init_models, get_db
from app.database.models import Save, League, Team, Player
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from fastapi.middleware.cors import CORSMiddleware
import os

class SaveService:
    def __init__(self, db: AsyncSession):
        self.db = db
    
    async def create_new_save(self):
        try:
            new_save = Save()
            self.db.add(new_save)
            await self.db.flush()

            template_leagues_result = await self.db.execute(
                select(League).filter(League.save_id == None)
            )
            template_leagues = template_leagues_result.scalars().all()

            template_teams_results = await self.db.execute(
                select(Team).filter(Team.save_id == None).options(selectinload(Team.league))
            )

            template_teams = template_teams_results.scalars().all()

            template_players_result = await self.db.execute(
                select(Player).filter(Player.save_id == None
                ).options(selectinload(Player.team))
            )
            template_players = template_players_result.scalars().all()

            league_id_map = {}
            team_id_map = {}

            for t_league in template_leagues:
                s_league = League(
                    name=t_league.name,
                    save_id=new_save.id
                )
                self.db.add(s_league)
                await self.db.flush()
                league_id_map[t_league.id] = s_league.id
            
            for t_team in template_teams:
                new_league_id = league_id_map.get(t_team.league.id)
                if not new_league_id:
                    raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Template league not found for team")

                s_team = Team(
                    name=t_team.name,
                    league_id=new_league_id,
                    save_id=new_save.id
                )
                self.db.add(s_team)
                await self.db.flush()
                team_id_map[t_team.id] = s_team.id

            for t_player in template_players:
                new_team_id = team_id_map.get(t_player.team.id)
                if not new_team_id:
                    raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Template team not found for player")

                s_player = Player(
                    name=t_player.name,
                    position=t_player.position,
                    dob=t_player.dob,
                    height=t_player.height,
                    weight=t_player.weight,
                    contract=t_player.contract,
                    raw_price=t_player.raw_price,
                    strength=t_player.strength,
                    speed=t_player.speed,
                    passing=t_player.passing,
                    kicking=t_player.kicking,
                    tackling=t_player.tackling,
                    team_id=new_team_id,
                    save_id=new_save.id
                )
                self.db.add(s_player)

            await self.db.commit()
            await self.db.refresh(new_save)

            return {"message": "Game save created successfully", "save_id": new_save.id}

        except Exception as e:
            await self.db.rollback()
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Failed to create save: {e}")

    async def get_save_by_id_all_information(self, save_id: int) -> Save | None:
        result = await self.db.execute(
            select(Save).options(
                selectinload(Save.leagues)
                    .selectinload(League.teams)
                    .selectinload(Team.players),
                selectinload(Save.teams)
                    .selectinload(Team.players),
                selectinload(Save.players)
            )
        )
        return result.scalar_one_or_none()