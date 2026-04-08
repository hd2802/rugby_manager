import { Router } from "express";
import leagueRoutes from "../modules/api/league/leagueRoutes";
import teamRoutes from "../modules/api/team/teamRoutes";
import playerRoutes from "../modules/api/player/playerRoutes";
import saveRoutes from "../modules/save/saveRoutes"

import userRoutes from "../modules/auth/user/userRoutes";
import loginRoutes from "../modules/auth/login/loginRoutes";

const router = Router();

router.use("/api", leagueRoutes);
router.use("/api", teamRoutes);
router.use("/api", playerRoutes);

router.use("/save", saveRoutes);

router.use("/auth", userRoutes);
router.use("/auth", loginRoutes)

router.get("/", (req, res) => {
    res.send("Hello world");
});

export default router;