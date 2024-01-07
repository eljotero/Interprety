import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'

@Entity()
export class Category {

    @PrimaryGeneratedColumn({ type: 'integer' })
    categoryId: number

    @Column({ type: 'varchar', length: 50 })
    name: string
}
