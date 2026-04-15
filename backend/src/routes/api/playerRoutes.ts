import { Router } from "express";
import { getPlayers, getPlayerById } from "../../controllers/api/playerController";

const router = Router();

router.get("/players", async (req, res) => {
    getPlayers(req, res);
});

router.get("/players/:id", async (req, res, next) => {
    getPlayerById(req, res);
});

export default router;