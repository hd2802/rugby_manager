import { DataSource } from "typeorm"
import { League } from "./models/League"
import { Team } from "./models/Team"
import { Player } from "./models/Player"
import { User } from "./models/User"
import { Save } from "./models/Save"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.USER!,
    password: "",
    database: "rugby_manager",
    entities: [ League, Team, Player, User, Save ],
    synchronize: true,
    logging: true
})
