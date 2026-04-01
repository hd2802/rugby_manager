import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn()
    id: number = -1

    @Column({ type: "varchar", length: 255 })
    username: string = ""

    @Column({ type: "varchar", length: 511 })
    passwordHash: string = ""
}