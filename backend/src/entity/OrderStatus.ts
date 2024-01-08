import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

export enum OrderStatusEnum {
    UNAPPROVED = "unapproved",
    APPROVED = "approved",
    CANCLED = "canceled",
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
}
