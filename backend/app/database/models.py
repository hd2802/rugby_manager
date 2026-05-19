from app.database.base import Base
from typing import List
from sqlalchemy import ForeignKey
from sqlalchemy import String
from sqlalchemy import Integer
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)

    username: Mapped[str] = mapped_column(String(255))
    passwordHash: Mapped[str] = mapped_column(String(511))

    saves: Mapped[List["Save"]] = relationship(back_populates="user", cascade="all, delete-orphan")

class Save(Base):
    __tablename__ = "saves"

    id: Mapped[int] = mapped_column(primary_key=True)

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    user: Mapped["User"] = relationship(back_populates="saves")

    leagues: Mapped[List["League"]] = relationship(back_populates="save", cascade="all, delete-orphan")
    teams: Mapped[List["Team"]] = relationship(back_populates="save", cascade="all, delete-orphan")
    players: Mapped[List["Player"]] = relationship(back_populates="save", cascade="all, delete-orphan")

class League(Base):
    __tablename__ = "leagues"

    id: Mapped[int] = mapped_column(primary_key=True)

    name: Mapped[str] = mapped_column(String(255))

    save_id: Mapped[int] = mapped_column(ForeignKey("saves.id"))
    save: Mapped["Save"] = relationship(back_populates="leagues")

    teams: Mapped[List["Team"]] = relationship(back_populates="league", cascade="all, delete-orphan")

class Team(Base):
    __tablename__ = "teams"

    id: Mapped[int] = mapped_column(primary_key=True)

    name: Mapped[str] = mapped_column(String(255))

    save_id: Mapped[int] = mapped_column(ForeignKey("saves.id"))
    save: Mapped["Save"] = relationship(back_populates="teams")

    league_id: Mapped[int] = mapped_column(ForeignKey("leagues.id"))
    league: Mapped["League"] = relationship(back_populates="teams")

    players: Mapped[List["Player"]] = relationship(back_populates="team", cascade="all, delete-orphan")

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
    save: Mapped["Save"] = relationship(back_populates="players")

    team_id: Mapped[int] = mapped_column(ForeignKey("teams.id"))
    team: Mapped["Team"] = relationship(back_populates="players")