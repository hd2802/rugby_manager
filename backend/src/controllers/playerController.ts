import type { Request, Response }from "express";
import { AppDataSource } from "../data-source";
import { Player } from "../models/Player";

export const getPlayers = async (req: Request, res: Response) => {
    try {
        const playerRepository = AppDataSource.getRepository(Player);
        const players = await playerRepository.find();
        
        res.json(players);

    } catch (error) {
        console.error("Error fetching players:", error);
        res.status(500).json({
            success: false,
            error: "Failed to fetch players",
            details: error instanceof Error ? error.message : String(error)
        });
    }
}

export const getPlayerById = async (req: Request, res: Response) => {
    const requestedId = req.params.id;
    try {
        const playerRepository = AppDataSource.getRepository(Player);
        const player = await playerRepository.find({
            where: {
                id: Number(requestedId)
            },
        })
        
        res.json(player);
    } catch (error) {
        console.error("Error fetching player:", error);
        res.status(500).json({
            success: false,
            error: "Failed to fetch player",
            details: error instanceof Error ? error.message : String(error)
        });
    }
}