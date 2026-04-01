import type { Request, Response }from "express";
import { AppDataSource } from "../../data-source";
import { League } from "./League";

export const getLeagues = async (req: Request, res: Response) => {
    try {
        const leagueRepository = AppDataSource.getRepository(League);

        const leagues = await leagueRepository.find({
            // relations: { teams: true }
        });

        res.json(leagues);
    } catch (error) {
        console.error("Error fetching leagues:", error);
        res.status(500).json({
            success: false,
            error: "Failed to fetch leagues",
            details: error instanceof Error ? error.message : String(error)
        });
    }
};

export const getLeagueById = async (req: Request, res: Response) => {
    const requestedId = req.params.id;

    try {
        const leagueRepository = AppDataSource.getRepository(League);

        const league = await leagueRepository.findOne({
            where: {
                id: Number(requestedId)
            },
            // relations: { teams: true }
        });

        if (!league) {
            return res.status(404).json({
                success: false,
                error: "League not found"
            });
        }

        res.json(league);
    } catch (error) {
        console.error("Error fetching league:", error);
        res.status(500).json({
            success: false,
            error: "Failed to fetch league",
            details: error instanceof Error ? error.message : String(error)
        });
    }
};
