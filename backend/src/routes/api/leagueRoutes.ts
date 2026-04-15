import { Router } from "express";
import { getLeagues, getLeagueById } from "../../controllers/api/leagueController"

const router = Router();

router.get("/leagues", async (req, res) => {
    getLeagues(req, res);
});

router.get("/leagues/:id", async (req, res, next) => {
    getLeagueById(req, res)
});

export default router;