import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { OrderStatus } from "../entity/OrderStatus"

export class OrderStatusController {
    private orderStatusRepository = AppDataSource.getRepository(OrderStatus);

    async getAllOrderStatus(request: Request, response: Response, next: NextFunction) {
        return this.orderStatusRepository.find();
    }

}