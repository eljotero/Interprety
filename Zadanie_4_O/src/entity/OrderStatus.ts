import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Order } from "./Order"
export enum OrderStatusEnum {
    UNAPPROVED = "unapproved",
    APPROVED = "approved",
    CANCELED = "canceled",
    DELIVERED = "delivered"
}

@Entity()
export class OrderStatus {

    @PrimaryGeneratedColumn()
    orderStatusId: number

    @Column({
        type: "enum",
        enum: OrderStatusEnum,
        default: OrderStatusEnum.UNAPPROVED
    })
    status: OrderStatusEnum;

    @OneToMany(() => Order, order => order.orderStatus)
    orders: Order[];
}
