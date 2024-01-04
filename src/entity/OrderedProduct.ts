import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Order } from "./Order";
import { Product } from "./Product";

@Entity()
export class OrderedProduct {

    @PrimaryGeneratedColumn()
    orderedProductId: number;

    @Column()
    quantity: number;

    @ManyToOne(() => Order, order => order.orderedProducts)
    order: Order;

    @ManyToOne(() => Product, product => product.orderedProducts)
    product: Product;
}
