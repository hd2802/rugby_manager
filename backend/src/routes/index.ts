import { Router } from "express";
import leagueRoutes from "./leagueRoutes";
import teamRoutes from "./teamRoutes";
import playerRoutes from "./playerRoutes";
import saveRoutes from "./saveRoutes"
import userRoutes from "./userRoutes";
import loginRoutes from "./loginRoutes";

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