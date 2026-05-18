import { Router } from "express";
import { getUsers, getUserById, createNewUser } from "../../controllers/auth/userController"

const router = Router();

router.get("/users", async (req, res) => {
    getUsers(req, res)
});

router.get("/users/:id", async (req, res) => {
    getUserById(req, res)
})

router.post('/users/new', async (request, response) => {
    createNewUser(request, response)
})

export default router;