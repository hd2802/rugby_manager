import { Router } from "express";
import leagueRoutes from "./api/leagueRoutes";
import teamRoutes from "./api/teamRoutes";
import playerRoutes from "./api/playerRoutes";
import saveRoutes from "./save/saveRoutes"
import userRoutes from "./auth/userRoutes";
import loginRoutes from "./auth/loginRoutes";

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