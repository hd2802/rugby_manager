from fastapi.testclient import TestClient
from unittest.mock import MagicMock, AsyncMock
from app.main import app
from app.routes.player_router import get_player_service

client = TestClient(app)

def test_get_all_players(mock_player_service):
    app.dependency_overrides[get_player_service] = lambda: mock_player_service

    response = client.get("/api/players")
    assert response.status_code == 200
    assert response.json() == [
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
    ]

    mock_player_service.get_all_players.assert_called_once()
    app.dependency_overrides = {}

def test_get_player_by_id_found(mock_player_service):
    app.dependency_overrides[get_player_service] = lambda: mock_player_service

    response = client.get("/api/players/1")
    assert response.status_code == 200
    assert response.json()["id"] == 1
    assert response.json()["name"] == "Finn Russell"
    mock_player_service.get_player_by_id.assert_called_once_with(1)

    app.dependency_overrides = {}

def test_get_player_by_id_not_found(mock_player_service):
    mock_player_service.get_player_by_id = AsyncMock(return_value=None)
    app.dependency_overrides[get_player_service] = lambda: mock_player_service

    response = client.get("/api/players/999")
    assert response.status_code == 404
    assert response.json()["detail"] == "Player not found"
    mock_player_service.get_player_by_id.assert_called_once_with(999)

    app.dependency_overrides = {}

def test_get_all_players_error(mock_player_service):
    mock_player_service.get_all_players.side_effect = Exception("DB error")
    app.dependency_overrides[get_player_service] = lambda: mock_player_service

    response = client.get("/api/players")
    assert response.status_code == 500
    assert "An error occurred while fetching players" in response.json()["detail"]

    app.dependency_overrides = {}