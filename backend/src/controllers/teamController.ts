import type { Request, Response }from "express";
import { AppDataSource } from "../data-source";
import { Team } from "../models/Team";

export const getTeams = async (req: Request, res: Response) => {
    try {
        const teamRepository = AppDataSource.getRepository(Team);

        const teams = await teamRepository.find({
            // relations: { teams: true }
        });

        res.json(teams);
    } catch (error) {
        console.error("Error fetching leagues:", error);
        res.status(500).json({
            success: false,
            error: "Failed to fetch leagues",
            details: error instanceof Error ? error.message : String(error)
        });
    }
}

export const getTeamById = async (req: Request, res: Response) => {
    const requestedId = req.params.id;
    try {
        const teamRepository = AppDataSource.getRepository(Team);
        const team = await teamRepository.find({
            where: {
                id: Number(requestedId)
            },
        })
        
        res.json(team);

    } catch (error) {
        console.error("Error fetching player:", error);
        res.status(500).json({
            success: false,
            error: "Failed to fetch player",
            details: error instanceof Error ? error.message : String(error)
        });
    }
}