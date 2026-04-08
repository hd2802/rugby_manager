import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm"
import { Team } from "../team/Team"
import { Save } from "../save/Save"

@Entity({ name: "leagues" })
export class League {
    @PrimaryGeneratedColumn()
    id: number = -1

    @Column({ type: "varchar", length: 255})
    name: string = ""

    @OneToMany(() => Team, (team) => team.league)
    teams!: Team[]

    @ManyToOne(() => Save, (save) => save.teams)
    @JoinColumn({ name: "save_id" })
    save!: Save
}