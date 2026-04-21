import type { Request, Response } from "express"
import { AppDataSource } from "../../data-source"
import { Save } from "../../models/save/Save"
import { User } from "../../models/auth/User"
import { League } from "../../models/api/League"
import { SaveLeague } from "../../models/save/SaveLeague"
import { Team } from "../../models/api/Team"
import { SaveTeam } from "../../models/save/SaveTeam"
import { Player } from "../../models/api/Player"
import { SavePlayer } from "../../models/save/SavePlayer"

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
    const decodedToken = jwt.verify(
        getTokenFrom(request) || "", process.env.SECRET || ""
    ) as JwtPayload & { id: number }

    if(!decodedToken.id) {
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
        const leagueMap = new Map<number, SaveLeague>()

        for (const league of templateLeagues) {
            const saveLeague = manager.create(SaveLeague, {
                name: league.name,
                templateId: league.id,
                save
            })
            const savedLeague = await manager.save(saveLeague)
            leagueMap.set(league.id, savedLeague)
        }

        const templateTeams = await manager.find(Team, {relations: ['league'] })
        const teamMap = new Map<number, SaveTeam>()

        for (const team of templateTeams) {
            const saveLeague = leagueMap.get(team.league.id)
            if (!saveLeague) throw new Error("No league found")

            const saveTeam = manager.create(SaveTeam, {
                name: team.name,
                templateId: team.id,
                league: saveLeague,
                save
            })
            const savedTeam = await manager.save(saveTeam)
            teamMap.set(team.id, savedTeam)
        }

        const templatePlayers = await manager.find(Player, {relations: ['team'] })

        for (const player of templatePlayers) {
            const saveTeam = teamMap.get(player.team.id)
            if (!saveTeam) throw new Error("No team found")

            const savePlayer = manager.create(SavePlayer, {
                templateId: player.id,
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
                team: saveTeam,
                save
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
        const save = await saveRepository.find({
            where: {
                id: Number(requestedId)
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