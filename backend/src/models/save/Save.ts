import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm"
import { User } from "../auth/User"
import { SaveLeague } from "../save/SaveLeague";
import { SaveTeam } from "../save/SaveTeam";
import { SavePlayer } from "../save/SavePlayer";

@Entity({ name: "saves" })
export class Save {
    @PrimaryGeneratedColumn()
    id: number = -1

    @ManyToOne(() => User, (user) => user.saves)
    @JoinColumn({ name: "save_id" })
    user!: User

    @OneToMany(() => SaveLeague, (save_league) => save_league.save, {cascade: true})
    leagues!: SaveLeague[]

    @OneToMany(() => SaveTeam, (save_team) => save_team.save, {cascade: true})
    teams!: SaveTeam[]

    @OneToMany(() => SavePlayer, (save_player) => save_player.save, {cascade: true})
    players!: SavePlayer[]
}