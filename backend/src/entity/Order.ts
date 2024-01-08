import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { OrderStatus } from "./OrderStatus"
import { OrderedProduct } from "./OrderedProduct"

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    orderId: number

    @Column({ nullable: true })
    orderDate: Date

    @Column({ type: 'varchar', length: 50 })
    userName: string

    @Column({ type: 'varchar', length: 50 })
    userEmail: string

    @Column({ type: 'varchar', length: 9})
    userPhone: string

    @ManyToOne(() => OrderStatus, (orderStatus) => orderStatus.status)
    orderStatus: OrderStatus;

    @OneToMany(() => OrderedProduct, orderedProduct => orderedProduct.order)
    orderedProducts: OrderedProduct[];
}
