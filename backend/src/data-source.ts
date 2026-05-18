import { DataSource } from "typeorm"
import { League } from "./models/api/League"
import { Team } from "./models/api/Team"
import { Player } from "./models/api/Player"
import { User } from "./models/auth/User"
import { Save } from "./models/save/Save"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.USER!,
    password: process.env.DB_PASS || "",
    database: process.env.DATABASE || "rugby_manager",
    entities: [ League, Team, Player, User, Save ],
    synchronize: true,
    logging: false
});