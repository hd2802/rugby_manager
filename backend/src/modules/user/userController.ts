import type { Request, Response }from "express";
import { AppDataSource } from "../../data-source";
import { User } from "./User";
import bcrypt from "bcrypt";

export const getUsers = async (req: Request, res: Response) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find();
        
        res.json(users);

    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({
            success: false,
            error: "Failed to fetch users",
            details: error instanceof Error ? error.message : String(error)
        });
    }
}

export const getUserById = async (req: Request, res: Response) => {
    const requestedId = req.params.id;
    try {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.find({
            where: {
                id: Number(requestedId)
            },
        })
        
        res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({
            success: false,
            error: "Failed to fetch user",
            details: error instanceof Error ? error.message : String(error)
        });
    }
}

export const createNewUser = async (request: Request, response: Response) => {
    const userRepository = AppDataSource.getRepository(User);
    
        const { username, password } = request.body;
    
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)
    
        if (password.length < 3) {
            return response.status(400).end()
        }
    
        const existingUsers = await userRepository.find({
            where: {
                username: username
            }
        })
    
        if(existingUsers.length != 0) {
            return response.status(400).end()
        }
    
        const user = new User()
        user.username = username;
        user.passwordHash = passwordHash;
    
        const savedUser = await userRepository.save(user);
        
        response.status(201).json(savedUser)
}