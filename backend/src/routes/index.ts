import { Router } from "express";
import leagueRoutes from "../modules/league/leagueRoutes";
import teamRoutes from "../modules/team/teamRoutes";
import playerRoutes from "../modules/player/playerRoutes";
import userRoutes from "../modules/user/userRoutes";

const router = Router();

router.use("/api", leagueRoutes);
router.use("/api", teamRoutes);
router.use("/api", playerRoutes);
router.use("/auth", userRoutes);

router.get("/", (req, res) => {
    res.send("Hello world");
});

export default router;