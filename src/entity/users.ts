import {Entity, Column, BeforeInsert, PrimaryColumn} from "typeorm";

export enum UserRole {
    ADMIN = "admin",
    MEMBER = "member",
}

@Entity('users')
export class User {
    @BeforeInsert()
    generateUuuid(){
        this.id = new Date().getTime();
    }
    @PrimaryColumn({
        type: 'varchar',
        length: 50,
        nullable: false
    })
    id: number;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false
    })
    fullname: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false
    })
    password: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false
    })
    telp: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        nullable: false,
        default: UserRole.MEMBER
    })
    level: string;
}