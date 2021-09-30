import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("todos")
export class Todo extends BaseEntity {
    @PrimaryGeneratedColumn({
        comment: "unique identifier",
    })
    id: number;

    @Column({
        type: "integer",
        nullable: false,
    })
    owner: number;

    @Column({
        type: "text",
        nullable: false,
    })
    text: string;

    @Column({
        type: "boolean",
        default: false,
    })
    completed: boolean;

    @Column({
        type: "boolean",
        default: false,
    })
    important: boolean;
}
