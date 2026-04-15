import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm"
import { SaveTeam } from "./SaveTeam"

@Entity({ name: "save_leagues" })
export class SaveLeague {
    @PrimaryGeneratedColumn()
    id: number = -1

    @Column({ type: "varchar", length: 255})
    name: string = ""

    @OneToMany(() => SaveTeam, (save_team) => save_team.league)
    teams!: SaveTeam[]
}