import { Note } from "src/note/entities/note.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity } from "typeorm"

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Note, note => note.user)
    notes: Note[];
}
