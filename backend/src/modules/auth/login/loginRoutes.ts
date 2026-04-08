import { Router } from "express";
import { login } from "./loginController";

const router = Router();

router.post("/login", async (req, res) => {
    login(req, res);
});

export default router;