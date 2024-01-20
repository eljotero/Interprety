import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { OrderStatus } from "../entity/OrderStatus"
import { OrderStatusEnum } from "../entity/OrderStatus";
import {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from 'http-status-codes';

export class OrderStatusController {
    private orderStatusRepository = AppDataSource.getRepository(OrderStatus);

    async getAllOrderStatus(request: Request, response: Response, next: NextFunction) {
        try {
            const result: OrderStatus[] = await this.orderStatusRepository.find();
            if (!result) {
                response.status(StatusCodes.NOT_FOUND).json({
                    message: getReasonPhrase(StatusCodes.NOT_FOUND)
                });
            } else {
                response.status(StatusCodes.OK).json({ result });
            }
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
            });
        }
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