from unittest.mock import MagicMock, AsyncMock
import pytest

@pytest.fixture
def mock_league_service():
    mock = MagicMock()
    mock.get_all_leagues = AsyncMock(return_value=[
        {"id": 1, "name": "Premiership Rugby"},
        {"id": 2, "name": "URC"},
        {"id": 3, "name": "Top 14"}
    ])
    mock.get_league_by_id = AsyncMock(return_value={
        "id": 1,
        "name": "Premiership Rugby",
    })
    return mock 

@pytest.fixture
def mock_team_service():
    mock = MagicMock()
    mock.get_all_teams = AsyncMock(return_value=[
        {"id": 1, "name": "Bath Rugby", "league_id": 1, "save_id": None},
        {"id": 2, "name": "Bristol Bears", "league_id": 1, "save_id": None},
        {"id": 3, "name": "Exeter Chiefs", "league_id": 1, "save_id": None}
    ])
    mock.get_team_by_id = AsyncMock(return_value={
        "id": 1,
        "name": "Bath Rugby",
        "league_id": 1,
        "save_id": None
    })
    return mock 

@pytest.fixture
def mock_player_service():
    mock = MagicMock()
    mock.get_all_players = AsyncMock(return_value=[
        {
            "id": 1,
            "name": "Finn Russell",
            "position": "Fly-half",
            "dob": "1992-09-23",
            "height": "183cm",
            "weight": "87kg",
            "contract": "PRO",
            "raw_price": 800000,
            "strength": 80,
            "speed": 85,
            "passing": 95,
            "kicking": 94,
            "tackling": 75,
            "save_id": 1,
            "team_id": 1
        }
    ])
    mock.get_player_by_id = AsyncMock(return_value={
        "id": 1,
        "name": "Finn Russell",
        "position": "Fly-half",
        "dob": "1992-09-23",
        "height": "183cm",
        "weight": "87kg",
        "contract": "PRO",
        "raw_price": 800000,
        "strength": 80,
        "speed": 85,
        "passing": 95,
        "kicking": 94,
        "tackling": 75,
        "save_id": 1,
        "team_id": 1
    })
    return mock

@pytest.fixture
def mock_save_service():
    mock = MagicMock()
    mock.create_new_save = AsyncMock(return_value={"message": "Game save created successfully", "save_id": 1})
    mock.get_save_by_id_all_information = AsyncMock(return_value={
        "id": 1,
        "leagues": [],
        "teams": [],
        "players": []
    })
    return mock