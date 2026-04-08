import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm"
import { User } from "../auth/user/User"
import { League } from "../api/league/League"
import { Player } from "../api/player/Player"
import { Team } from "../team/Team"


@Entity({ name: "saves" })
export class Save {
    @PrimaryGeneratedColumn()
    id: number = -1

    @ManyToOne(() => User, (user) => user.saves)
    @JoinColumn({ name: "save_id" })
    user!: User
}