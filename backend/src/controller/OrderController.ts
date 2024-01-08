import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Order } from "../entity/Order"
import { Equal } from "typeorm";

export class OrderController {

    private orderRepository = AppDataSource.getRepository(Order)


    async getAllOrders(request: Request, response: Response, next: NextFunction) {
        return this.orderRepository.find()
    }

    async getOneOrder(request: Request, response: Response, next: NextFunction) {
        const { userName } = request.params;
        return this.orderRepository.find({
            where: { userName: userName }
        })
    }

    async getOrderById(request: Request, response: Response, next: NextFunction) {
        return this.orderRepository.find({
            where: { orderId: parseInt(request.params.id) }
        })
    };

    async changeOrderStatus(request: Request, response: Response, next: NextFunction) {
        const { id } = request.params;
        const { newOrderStatus } = request.body;
        const order = await this.orderRepository.find({
            where: { orderId: parseInt(id) }
        });
        if (order[0].orderStatus.status === newOrderStatus) {
            return response.status(400).send('Order status is already ' + newOrderStatus);
        }
        else if (order[0].orderStatus.status === 'delivered') {
            return response.status(400).send('Order is already delivered');
        }
        else if (order[0].orderStatus.status === 'canceled') {
            return response.status(400).send('Order is already canceled');
        }
        else if (order[0].orderStatus.status === 'approved' && newOrderStatus === 'unapproved') {
            return response.status(400).send('Order is already approved');
        }
        else {
            order[0].orderStatus.status = newOrderStatus;
            return this.orderRepository.save(order[0]);
        }

    }

    async getOrdersByState(request: Request, response: Response, next: NextFunction) {
        const { status } = request.params;
        return this.orderRepository.find({
            where: { orderStatus: Equal(status) }
        })
    }

    async addOrder(request: Request, response: Response, next: NextFunction) {
        const { userName, userEmail, orderStatus, orderDate, userPhone, orderedProducts } = request.body;

        const order = Object.assign(new Order(), {
            orderDate, userName, userEmail, userPhone, orderStatus, orderedProducts
        });

        return this.orderRepository.save(order)
    }
}