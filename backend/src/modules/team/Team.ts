import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm"
import { League } from "../league/League"
import { Player } from "../player/Player"

@Entity({ name: "teams" })
export class Team {
    @PrimaryGeneratedColumn()
    id: number = -1

    @Column({ type: "varchar", length: 255})
    name: string = ""

    // Need ManyToOne on the 'many' side
    @ManyToOne(() => League, (league) => league.teams)
    @JoinColumn({ name: "league_id" })
    league!: League

    @OneToMany(() => Player, (player) => player.team)
    players!: Player[]
}