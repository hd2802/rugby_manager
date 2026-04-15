import type { Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { Save } from "../models/Save"
import { User } from "../models/User"

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
    
    // Add copying of players - creating new players etc on the creation of a new save
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