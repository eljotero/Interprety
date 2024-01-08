import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Product } from './Product'
@Entity()
export class Category {

    @PrimaryGeneratedColumn({ type: 'integer' })
    categoryId: number

    @Column({ type: 'varchar', length: 50 })
    name: string

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];
}
