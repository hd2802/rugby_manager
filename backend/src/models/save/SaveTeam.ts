import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm"
import { SaveLeague } from "./SaveLeague"
import { SavePlayer } from "./SavePlayer"
import { Save } from "./Save"

@Entity({ name: "save_teams" })
export class SaveTeam {
    @PrimaryGeneratedColumn()
    id: number = -1

    @Column({ type: "varchar", length: 255})
    name: string = ""

    // Need ManyToOne on the 'many' side
    @ManyToOne(() => SaveLeague, (league) => league.teams)
    @JoinColumn({ name: "league_id" })
    league!: SaveLeague

    @OneToMany(() => SavePlayer, (player) => player.team)
    players!: SavePlayer[]

    @ManyToOne(() => Save, (save) => save.teams)
    @JoinColumn({ name: "save_id" })
    save!: Save
}