from sqlalchemy import ForeignKey, String, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List
from app.database.base import Base

class Save(Base):
    __tablename__ = "saves"
    id: Mapped[int] = mapped_column(primary_key=True)
    leagues: Mapped[List["League"]] = relationship(
        "League", back_populates="save", cascade="all, delete-orphan"
    )
    teams: Mapped[List["Team"]] = relationship(
        "Team", back_populates="save", cascade="all, delete-orphan", foreign_keys="[Team.save_id]"
    )
    players: Mapped[List["Player"]] = relationship(
        "Player", back_populates="save", cascade="all, delete-orphan"
    )
    managed_team_id: Mapped[int] = mapped_column(ForeignKey("teams.id"))
    managed_team: Mapped["Team"] = relationship(
        "Team", back_populates="managed_by_saves", foreign_keys="[Save.managed_team_id]"
    )

class League(Base):
    __tablename__ = "leagues"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(255))
    save_id: Mapped[int] = mapped_column(ForeignKey("saves.id"))
    save: Mapped["Save"] = relationship(
        "Save", back_populates="leagues"
    )
    teams: Mapped[List["Team"]] = relationship(
        "Team", back_populates="league", cascade="all, delete-orphan"
    )

class Team(Base):
    __tablename__ = "teams"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(255))
    save_id: Mapped[int] = mapped_column(ForeignKey("saves.id"))
    save: Mapped["Save"] = relationship(
        "Save", back_populates="teams", foreign_keys="[Team.save_id]"
    )
    league_id: Mapped[int] = mapped_column(ForeignKey("leagues.id"))
    league: Mapped["League"] = relationship(
        "League", back_populates="teams"
    )
    players: Mapped[List["Player"]] = relationship(
        "Player", back_populates="team", cascade="all, delete-orphan"
    )
    managed_by_saves: Mapped[List["Save"]] = relationship(
        "Save", back_populates="managed_team", foreign_keys="[Save.managed_team_id]"
    )

class Player(Base):
    __tablename__ = "players"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(255))
    position: Mapped[str] = mapped_column(String(255))
    dob: Mapped[str] = mapped_column(String(255))
    height: Mapped[str] = mapped_column(String(255))
    weight: Mapped[str] = mapped_column(String(255))
    contract: Mapped[str] = mapped_column(String(255))
    raw_price: Mapped[int] = mapped_column()
    strength: Mapped[int] = mapped_column()
    speed: Mapped[int] = mapped_column()
    passing: Mapped[int] = mapped_column()
    kicking: Mapped[int] = mapped_column()
    tackling: Mapped[int] = mapped_column()
    save_id: Mapped[int] = mapped_column(ForeignKey("saves.id"))
    save: Mapped["Save"] = relationship(
        "Save", back_populates="players"
    )
    team_id: Mapped[int] = mapped_column(ForeignKey("teams.id"))
    team: Mapped["Team"] = relationship(
        "Team", back_populates="players"
    )