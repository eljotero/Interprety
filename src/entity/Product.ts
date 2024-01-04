import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Category } from "./Category";
import { OrderedProduct } from "./OrderedProduct";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    productId: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    price: number

    @Column("decimal")
    weight: number

    @ManyToOne(() => Category, category => category.categoryId)
    category: Category;

    @OneToMany(() => OrderedProduct, orderedProduct => orderedProduct.product)
    orderedProducts: OrderedProduct[];
}
