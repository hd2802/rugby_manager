import pytest
from unittest.mock import AsyncMock, MagicMock
from app.database.models import League
from app.services.league_service import LeagueService

@pytest.mark.asyncio
async def test_get_all_leagues(mocker):
    mock_db = AsyncMock()
    mock_result = MagicMock()
    mock_leagues = [League(id=1, name="Gallagher Prem"), League(id=2, name="Top 14")]
    mock_result.scalars.return_value.all.return_value = mock_leagues
    mock_db.execute.return_value = mock_result

    service = LeagueService(mock_db)

    leagues = await service.get_all_leagues()

    mock_db.execute.assert_called_once()
    assert leagues == mock_leagues

@pytest.mark.asyncio
async def test_get_league_by_id(mocker):
    mock_db = AsyncMock()
    mock_result = MagicMock()
    league = League(id=1, name="Gallagher Prem")
    mock_result.scalar_one_or_none.return_value = league
    mock_db.execute.return_value = mock_result

    service = LeagueService(mock_db)

    result = await service.get_league_by_id(1)

    mock_db.execute.assert_called_once()
    assert result == league