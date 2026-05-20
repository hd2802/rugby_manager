import pytest
from unittest.mock import AsyncMock, MagicMock, patch
from fastapi import HTTPException
from app.database.models import Save, League, Team, Player
from app.services.save_service import SaveService

@pytest.mark.asyncio
async def test_create_new_save_success(mocker):
    mock_db = AsyncMock()
    mock_db.flush = AsyncMock()
    mock_db.commit = AsyncMock()
    mock_db.refresh = AsyncMock()
    mock_db.rollback = AsyncMock()
    mock_db.add = MagicMock()
    new_save = Save(id=1)
    mocker.patch("app.services.save_service.Save", return_value=new_save)
    template_league = League(id=10, name="Premiership", save_id=None)
    template_team = Team(id=20, name="Saracens", league=template_league, save_id=None)
    template_player = Player(
        id=30,
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
        team=template_team,
        save_id=None
    )
    mock_league_result = MagicMock()
    mock_league_result.scalars.return_value.all.return_value = [template_league]
    mock_team_result = MagicMock()
    mock_team_result.scalars.return_value.all.return_value = [template_team]
    mock_player_result = MagicMock()
    mock_player_result.scalars.return_value.all.return_value = [template_player]
    mock_db.execute.side_effect = [mock_league_result, mock_team_result, mock_player_result]

    async def flush_side_effect():
        for call in mock_db.add.call_args_list:
            obj = call[0][0]
            if isinstance(obj, League):
                obj.id = 100
            elif isinstance(obj, Team):
                obj.id = 200
            elif isinstance(obj, Player):
                obj.id = 300
    mock_db.flush.side_effect = flush_side_effect

    service = SaveService(mock_db)
    result = await service.create_new_save(20)
    assert result["message"] == "Game save created successfully"
    assert result["save_id"] == 1
    assert mock_db.commit.called
    assert mock_db.refresh.called

@pytest.mark.asyncio
async def test_get_save_by_id_all_information(mocker):
    mock_db = AsyncMock()

    player = Player(id=1, name="Owen Farrell", position="Fly-half", dob="1991-09-24",
                    height="188cm", weight="96kg", contract="2024-2026", raw_price=750000,
                    strength=85, speed=78, passing=90, kicking=92, tackling=80,
                    team_id=2, save_id=1)

    team = Team(id=2, name="Saracens", league_id=3, save_id=1, players=[player])
    league = League(id=3, name="Premiership", save_id=1, teams=[team])
    save = Save(id=1, leagues=[league], teams=[team], players=[player])

    mock_result = MagicMock()
    mock_result.scalar_one_or_none.return_value = save
    mock_db.execute.return_value = mock_result

    service = SaveService(mock_db)

    result = await service.get_save_by_id_all_information(save_id=1)

    mock_db.execute.assert_called_once()
    assert result == save
    assert result.leagues[0].name == "Premiership"
    assert result.teams[0].name == "Saracens"
    assert result.players[0].name == "Owen Farrell"



@pytest.mark.asyncio
async def test_create_new_save_template_team_not_found(mocker):
    mock_db = AsyncMock()
    mock_db.flush = AsyncMock()
    mock_db.commit = AsyncMock()
    mock_db.refresh = AsyncMock()
    mock_db.rollback = AsyncMock()
    mock_db.add = MagicMock()

    new_save = Save(id=1)
    mocker.patch("app.services.save_service.Save", return_value=new_save)

    template_league = League(id=10, name="Premiership", save_id=None)
    template_team = Team(id=20, name="Saracens", league=template_league, save_id=None)
    template_player = Player(id=30, name="Orphan Player", team=template_team, save_id=None,
                             position="", dob="", height="", weight="", contract="", raw_price=0,
                             strength=0, speed=0, passing=0, kicking=0, tackling=0)
    mock_league_result = MagicMock()
    mock_league_result.scalars.return_value.all.return_value = [template_league]
    mock_team_result = MagicMock()
    mock_team_result.scalars.return_value.all.return_value = [template_team]
    mock_player_result = MagicMock()
    mock_player_result.scalars.return_value.all.return_value = [template_player]

    mock_db.execute.side_effect = [mock_league_result, mock_team_result, mock_player_result]

    async def fake_flush():
        pass
    mock_db.flush.side_effect = fake_flush

    service = SaveService(mock_db)

    with pytest.raises(HTTPException) as exc_info:
        await service.create_new_save(20)
    assert exc_info.value.status_code == 500
    assert "Template league not found for team" in exc_info.value.detail
    assert mock_db.rollback.called

@pytest.mark.asyncio
async def test_create_new_save_template_team_not_found(mocker):
    mock_db = AsyncMock()
    mock_db.flush = AsyncMock()
    mock_db.commit = AsyncMock()
    mock_db.refresh = AsyncMock()
    mock_db.rollback = AsyncMock()
    mock_db.add = MagicMock()

    new_save = Save(id=1)
    mocker.patch("app.services.save_service.Save", return_value=new_save)

    template_league = League(id=10, name="Premiership", save_id=None)
    template_team = Team(id=20, name="Saracens", league=template_league, save_id=None)
    template_player = Player(id=30, name="Orphan Player", team=template_team, save_id=None,
                             position="", dob="", height="", weight="", contract="", raw_price=0,
                             strength=0, speed=0, passing=0, kicking=0, tackling=0)
    mock_league_result = MagicMock()
    mock_league_result.scalars.return_value.all.return_value = [template_league]
    mock_team_result = MagicMock()
    mock_team_result.scalars.return_value.all.return_value = [template_team]
    mock_player_result = MagicMock()
    mock_player_result.scalars.return_value.all.return_value = [template_player]

    mock_db.execute.side_effect = [mock_league_result, mock_team_result, mock_player_result]

    async def fake_flush():
        pass
    mock_db.flush.side_effect = fake_flush

    service = SaveService(mock_db)

    with pytest.raises(HTTPException) as exc_info:
        await service.create_new_save(20)
    assert exc_info.value.status_code == 500
    assert "Template league not found for team" in exc_info.value.detail
    assert mock_db.rollback.called
