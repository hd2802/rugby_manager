import { Router } from "express"
import { getSaveByIdWithAllInformation } from "./saveController"

const router = Router()

router.get("/save/:id", async (request, response) => {
    getSaveByIdWithAllInformation(request, response)
})

export default router