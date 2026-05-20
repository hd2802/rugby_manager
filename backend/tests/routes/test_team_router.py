from fastapi.testclient import TestClient
from unittest.mock import MagicMock, AsyncMock
from app.main import app
from app.routes.team_router import get_team_service

client = TestClient(app)

def test_get_all_teams(mock_team_service):
    app.dependency_overrides[get_team_service] = lambda: mock_team_service

    response = client.get("/api/teams")
    assert response.status_code == 200
    assert response.json() == [
        {"id": 1, "name": "Bath Rugby", "league_id": 1, "save_id": None},
        {"id": 2, "name": "Bristol Bears", "league_id": 1, "save_id": None},
        {"id": 3, "name": "Exeter Chiefs", "league_id": 1, "save_id": None}
    ]
    mock_team_service.get_all_teams.assert_called_once()
    app.dependency_overrides = {}

def test_get_team_by_id_found(mock_team_service):
    app.dependency_overrides[get_team_service] = lambda: mock_team_service

    response = client.get("/api/teams/1")
    assert response.status_code == 200
    assert response.json()["id"] == 1
    assert response.json()["name"] == "Bath Rugby"
    mock_team_service.get_team_by_id.assert_called_once_with(1)

    app.dependency_overrides = {}

def test_get_team_by_id_not_found(mock_team_service):
    mock_team_service.get_team_by_id = AsyncMock(return_value=None)
    app.dependency_overrides[get_team_service] = lambda: mock_team_service

    response = client.get("/api/teams/999")
    assert response.status_code == 404
    assert response.json()["detail"] == "Team not found"
    mock_team_service.get_team_by_id.assert_called_once_with(999)

    app.dependency_overrides = {}

def test_get_all_teams_error(mock_team_service):
    mock_team_service.get_all_teams.side_effect = Exception("DB error")
    app.dependency_overrides[get_team_service] = lambda: mock_team_service

    response = client.get("/api/teams")
    assert response.status_code == 500
    assert "An error occurred while fetching teams" in response.json()["detail"]

    app.dependency_overrides = {}