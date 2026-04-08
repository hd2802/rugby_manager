import type { Request, Response } from "express"
import { AppDataSource } from "../../data-source"
import { Save } from "./Save"

export const getSaveByIdWithAllInformation = async (request: Request, response: Response) => {
    const requestedId = request.params.id

    try {
        const saveRepository = AppDataSource.getRepository(Save);
        const save = await saveRepository.find({
            where: {
                id: Number(requestedId)
            },
            relations: {
                leagues: true,
                teams: true,
                players: true
            }
        })
        response.json(save)
    } catch (error) {
        console.error("Error fetching save:", error)
        response.status(500).json({
            success: false,
            error: "Failed to fetch save",
            details: error instanceof Error ? error.message : String(error)
        })
    }
}