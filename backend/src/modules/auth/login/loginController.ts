import type { Request, Response } from "express"
import { AppDataSource } from "../../../data-source"
import { User } from "../user/User"

import dotenv from "dotenv";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

dotenv.config();

export const login = async(request: Request, response: Response) => {
    const { username, password } = request.body

    const userRepository = AppDataSource.getRepository(User);
    
    const user = await userRepository.findOne({
        where: {
            username: username
        }
    })

    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)
    
    if(!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user.id
    }

    const token = jwt.sign(userForToken, process.env.SECRET || "", { expiresIn: 60*60 })

    response.status(200).send({ token, username: user.username })
}