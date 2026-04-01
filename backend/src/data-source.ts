import { DataSource } from "typeorm"
import { League } from "./modules/league/League"
import { Team } from "./modules/team/Team"
import { Player } from "./modules/player/Player"
import { User } from "./modules/user/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.USER!,
    password: "",
    database: "rugby_manager",
    entities: [ League, Team, Player, User ],
    synchronize: true,
    logging: true
})
