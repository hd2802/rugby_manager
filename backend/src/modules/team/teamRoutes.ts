import { Router } from "express";
import { getTeams, getTeamById } from "./teamController";

const router = Router();

router.get("/teams", async (req, res) => {
    getTeams(req, res);
});

router.get("/teams/:id", async (req, res, next) => {
    getTeamById(req, res)
});

export default router;