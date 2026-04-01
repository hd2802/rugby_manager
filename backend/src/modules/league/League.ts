import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Team } from "../modules/team/Team"

@Entity({ name: "leagues" })
export class League {
    @PrimaryGeneratedColumn()
    id: number = -1

    @Column({ type: "varchar", length: 255})
    name: string = ""

    @OneToMany(() => Team, (team) => team.league)
    teams!: Team[]
}