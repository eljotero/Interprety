import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { OrderStatus } from "./OrderStatus"
import { OrderedProduct } from "./OrderedProduct"

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    orderId: number

    @Column({ nullable: true })
    date: Date

    @Column()
    userName: string

    @Column()
    userEmail: string

    @Column()
    userPhone: string

    @ManyToOne(() => OrderStatus, (orderStatus) => orderStatus.status)
    orderStatus: OrderStatus;

    @OneToMany(() => OrderedProduct, orderedProduct => orderedProduct.order)
    orderedProducts: OrderedProduct[];
}
