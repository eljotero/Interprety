import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { OrderStatus } from "../entity/OrderStatus"
import { OrderStatusEnum } from "../entity/OrderStatus";

export class OrderStatusController {
    private orderStatusRepository = AppDataSource.getRepository(OrderStatus);

    async getAllOrderStatus(request: Request, response: Response, next: NextFunction) {
        return this.orderStatusRepository.find();
    }
    async createOrderStatus(request: Request, response: Response, next: NextFunction) {
        const newStatus: string = request.params.id;
        const orderStatus: OrderStatus = new OrderStatus();
        const newStatusEnum: OrderStatusEnum = OrderStatusEnum[`${newStatus.toUpperCase()}`];
        orderStatus.status = newStatusEnum;
        return this.orderStatusRepository.save(orderStatus);
    }

    async getStatus(statusId: number) {
        return await this.orderStatusRepository.findOne({ where: { orderStatusId: statusId } });
    }

}