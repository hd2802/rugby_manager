import pytest
from unittest.mock import AsyncMock, MagicMock
from app.database.models import Team
from app.services.team_service import TeamService

@pytest.mark.asyncio
async def test_get_all_teams(mocker):
    mock_db = AsyncMock()
    mock_result = MagicMock()
    mock_teams = [Team(id=1, name="Bath Rugby"), Team(id=2, name="Bristol Bears")]
    mock_result.scalars.return_value.all.return_value = mock_teams
    mock_db.execute.return_value = mock_result

    service = TeamService(mock_db)

    teams = await service.get_all_teams()

    mock_db.execute.assert_called_once()
    assert teams == mock_teams

@pytest.mark.asyncio
async def test_get_team_by_id(mocker):
    mock_db = AsyncMock()
    mock_result = MagicMock()
    team = Team(id=1, name="Bath Rugby")
    mock_result.scalar_one_or_none.return_value = team
    mock_db.execute.return_value = mock_result

    service = TeamService(mock_db)

    result = await service.get_team_by_id(1)

    mock_db.execute.assert_called_once()
    assert result == team