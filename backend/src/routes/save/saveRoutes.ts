import { Router } from "express"
import { createNewSave, getSaveByIdWithAllInformation } from "../../controllers/save/saveController"

const router = Router()

router.post("/new", async(request, response) => {
    createNewSave(request, response)
})

router.get("/:id", async (request, response) => {
    getSaveByIdWithAllInformation(request, response)
})

export default router