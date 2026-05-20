import pytest
from unittest.mock import AsyncMock, MagicMock
from app.database.models import Player
from app.services.player_service import PlayerService

from app.database.models import Player

player1 = Player(
    id=1,
    name="Owen Farrell",
    position="Fly-half",
    dob="1991-09-24",
    height="188cm",
    weight="96kg",
    contract="2024-2026",
    raw_price=750000,
    strength=85,
    speed=78,
    passing=90,
    kicking=92,
    tackling=80,
    save_id=1,
    team_id=1
)

player2 = Player(
    id=2,
    name="Maro Itoje",
    position="Lock",
    dob="1994-10-28",
    height="195cm",
    weight="115kg",
    contract="2023-2025",
    raw_price=800000,
    strength=92,
    speed=75,
    passing=82,
    kicking=60,
    tackling=95,
    save_id=1,
    team_id=1
)

@pytest.mark.asyncio
async def test_get_all_players(mocker):
    mock_db = AsyncMock()
    mock_result = MagicMock()
    mock_players=[player1, player2]
    mock_result.scalars.return_value.all.return_value = mock_players
    mock_db.execute.return_value = mock_result

    service = PlayerService(mock_db)

    players = await service.get_all_players()

    mock_db.execute.assert_called_once()
    assert players == mock_players

@pytest.mark.asyncio
async def test_get_player_by_id(mocker):
    mock_db = AsyncMock()
    mock_result = MagicMock()
    mock_result.scalar_one_or_none.return_value = player1
    mock_db.execute.return_value = mock_result

    service = PlayerService(mock_db)

    result = await service.get_player_by_id(1)

    mock_db.execute.assert_called_once()
    assert result == player1