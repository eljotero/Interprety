import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Category } from "./Category";
import { OrderedProduct } from "./OrderedProduct";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    productId: number

    @Column({ type: 'varchar', length: 100 })
    name: string

    @Column({ type: 'varchar', length: 255 })
    description: string

    @Column({ type: 'numeric' })
    price: number

    @Column({ type: 'numeric' })
    weight: number

    @ManyToOne(() => Category, category => category.categoryId)
    category: Category;

    @OneToMany(() => OrderedProduct, orderedProduct => orderedProduct.product)
    orderedProducts: OrderedProduct[];
}
