import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { SaveTeam } from "./SaveTeam"
import { Save } from "./Save"

@Entity({ name: "save_players" })
export class SavePlayer {
    @PrimaryGeneratedColumn()
    id: number = -1

    @Column({ type: "varchar", length: 255})
    name: string = ""

    @Column({type: "varchar", length: 255})
    position: string = ""

    @Column({type: "varchar", length: 255})
    dob: string = ""

    @Column({type: "varchar", length: 255})
    height: string = ""

    @Column({type: "varchar", length: 255})
    weight: string = ""

    @Column({type: "varchar", length: 255})
    contract: string = ""

    @Column({type: "int4"})
    raw_price: number = 0

    @Column({type: "int4"})
    strength: number = 0

    @Column({type: "int4"})
    speed: number = 0

    @Column({type: "int4"})
    passing: number = 0

    @Column({type: "int4"})
    kicking: number = 0

    @Column({type: "int4"})
    tackling: number = 0

    // Need ManyToOne on the 'many' side
    @ManyToOne(() => SaveTeam, (team) => team.players)
    @JoinColumn({ name: "team_id" })
    team!: SaveTeam

    @ManyToOne(() => Save, (save) => save.players)
    @JoinColumn({ name: "save_id" })
    save!: Save
}