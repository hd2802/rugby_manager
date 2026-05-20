from fastapi.testclient import TestClient
from unittest.mock import MagicMock, AsyncMock
from app.main import app
from app.routes.save_router import get_save_service

client = TestClient(app)

def test_create_new_save(mock_save_service):
    app.dependency_overrides[get_save_service] = lambda: mock_save_service
    response = client.post("/api/saves/new")
    assert response.status_code == 201
    assert response.json() == {"message": "Game save created successfully", "save_id": 1}
    mock_save_service.create_new_save.assert_called_once()
    app.dependency_overrides = {}

def test_get_save_by_id_found(mock_save_service):
    app.dependency_overrides[get_save_service] = lambda: mock_save_service
    response = client.get("/api/saves/1")
    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        "leagues": [],
        "teams": [],
        "players": []
    }
    mock_save_service.get_save_by_id_all_information.assert_called_once_with(1)
    app.dependency_overrides = {}

def test_get_save_by_id_not_found(mock_save_service):
    mock_save_service.get_save_by_id_all_information = AsyncMock(return_value=None)
    app.dependency_overrides[get_save_service] = lambda: mock_save_service
    response = client.get("/api/saves/999")
    assert response.status_code == 404
    assert response.json()["detail"] == "Save not found"
    mock_save_service.get_save_by_id_all_information.assert_called_once_with(999)
    app.dependency_overrides = {}