from fastapi.testclient import TestClient
from unittest.mock import MagicMock, AsyncMock
from app.main import app
from app.routes.league_router import get_league_service

client = TestClient(app)

def test_get_all_leagues(mock_league_service):
    app.dependency_overrides[get_league_service] = lambda: mock_league_service

    response = client.get("/api/leagues")
    assert response.status_code == 200
    assert response.json() == [
        {"id": 1, "name": "Premiership Rugby"},
        {"id": 2, "name": "URC"},
        {"id": 3, "name": "Top 14"}
    ]
    mock_league_service.get_all_leagues.assert_called_once()
    app.dependency_overrides = {}

def test_get_league_by_id_found(mock_league_service):
    app.dependency_overrides[get_league_service] = lambda: mock_league_service

    response = client.get("/api/leagues/1")
    assert response.status_code == 200
    assert response.json()["id"] == 1
    assert response.json()["name"] == "Premiership Rugby"
    mock_league_service.get_league_by_id.assert_called_once_with(1)

    app.dependency_overrides = {}

def test_get_league_by_id_not_found(mock_league_service):
    mock_league_service.get_league_by_id = AsyncMock(return_value=None)
    app.dependency_overrides[get_league_service] = lambda: mock_league_service

    response = client.get("/api/leagues/999")
    assert response.status_code == 404
    assert response.json()["detail"] == "League not found"
    mock_league_service.get_league_by_id.assert_called_once_with(999)

    app.dependency_overrides = {}

def test_get_all_leagues_error(mock_league_service):
    mock_league_service.get_all_leagues.side_effect = Exception("DB error")
    app.dependency_overrides[get_league_service] = lambda: mock_league_service

    response = client.get("/api/leagues")
    assert response.status_code == 500
    assert "An error occurred while fetching leagues" in response.json()["detail"]

    app.dependency_overrides = {}