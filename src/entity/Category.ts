import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    categoryId: number

    @Column()
    name: string
}
