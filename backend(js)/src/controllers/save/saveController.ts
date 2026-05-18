import type { Request, Response } from "express"
import { AppDataSource } from "../../data-source"
import { Save } from "../../models/save/Save"
import { User } from "../../models/auth/User"
import { League } from "../../models/api/League"
import { Team } from "../../models/api/Team"
import { Player } from "../../models/api/Player"

import jwt from "jsonwebtoken"
import type { JwtPayload } from "jsonwebtoken"

const getTokenFrom = (request: Request) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}

export const createNewSave = async (request: Request, response: Response) => {
    let decodedToken: JwtPayload & { id: number }

    try {
        decodedToken = jwt.verify(
            getTokenFrom(request) || "", process.env.SECRET || ""
        ) as JwtPayload & { id: number }
    } catch (error) {
        return response.status(401).json({ error: 'token invalid or missing' })
    }

    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
        where: {
            id: decodedToken.id
        }
    })

    if (!user) {
        return response.status(400).json({ error: 'user missing or not valid' })
    }
    
    const result = await AppDataSource.transaction(async (manager) => {
        const save = manager.create(Save, { user })
        await manager.save(save)

        const templateLeagues = await manager.find(League)
        const leagueMap = new Map<number, League>()

        for (const league of templateLeagues) {
            const saveLeague = manager.create(League, {
                name: league.name,
                save: save
            });
            const savedLeague = await manager.save(saveLeague)
            leagueMap.set(league.id, savedLeague)
        }

        const templateTeams = await manager.find(Team, {relations: ['league'] })
        const teamMap = new Map<number, Team>()

        for (const team of templateTeams) {
            const league = leagueMap.get(team.league.id)
            if (!league) throw new Error("No league found")

            const saveTeam = manager.create(Team, {
                name: team.name,
                save: save,
                league: league
            });
            const savedTeam = await manager.save(saveTeam)
            teamMap.set(team.id, savedTeam)
        }

        const templatePlayers = await manager.find(Player, {relations: ['team'] })

        for (const player of templatePlayers) {
            const team = teamMap.get(player.team.id)
            if (!team) throw new Error("No team found")

            const savePlayer = manager.create(Player, {
                name: player.name,
                position: player.position,
                dob: player.dob,
                height: player.height,
                weight: player.weight,
                contract: player.contract,
                raw_price: player.raw_price,
                strength: player.strength,
                speed: player.speed,
                passing: player.passing,
                kicking: player.kicking,
                tackling: player.tackling,
                team: team,
                save: save
            })
            const savedPlayer = await manager.save(savePlayer)
        }
        return save
    })
    return response.status(201).json(result)
}

export const getSaveByIdWithAllInformation = async (request: Request, response: Response) => {
    const requestedId = request.params.id

    try {
        const saveRepository = AppDataSource.getRepository(Save);
        const save = await saveRepository.findOne({
            where: { id: Number(requestedId) },
            relations: {
                leagues: {
                    teams: {
                        players: true
                    }
                }
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