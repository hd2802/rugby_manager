import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm"
import { User } from "../auth/User"
import { League } from "../api/League";
import { Team } from "../api/Team";
import { Player } from "../api/Player";

@Entity({ name: "saves" })
export class Save {
    @PrimaryGeneratedColumn()
    id: number = -1

    @ManyToOne(() => User, (user) => user.saves)
    @JoinColumn({ name: "user_id" })
    user!: User

    @OneToMany(() => League, (league) => league.save, {cascade: true})
    leagues!: League[]

    @OneToMany(() => Team, (team) => team.save, {cascade: true})
    teams!: Team[]

    @OneToMany(() => Player, (player) => player.save, {cascade: true})
    players!: Player[]
}