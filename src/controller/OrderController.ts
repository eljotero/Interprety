import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Order } from "../entity/Order"
import { OrderStatus } from "../entity/OrderStatus"
import { OrderedProduct } from "../entity/OrderedProduct"
import { OrderStatusController } from "./OrderStatusController"
import { ProductController } from "./ProductController"

export class OrderController {

    private orderRepository = AppDataSource.getRepository(Order)
    private orderedProductRepository = AppDataSource.getRepository(OrderedProduct);
    private orderStatusController = new OrderStatusController();
    private productController = new ProductController();

    async getAllOrders(request: Request, response: Response, next: NextFunction) {
        return this.orderRepository.find({
            relations: {
                orderStatus: true,
                orderedProducts: true
            }
        })
    }

    async getOneOrder(request: Request, response: Response, next: NextFunction) {
        const { userName } = request.params;
        return this.orderRepository.find({
            where: { userName: userName }
        })
    }

    async getOrderById(request: Request, response: Response, next: NextFunction) {
        return this.orderRepository.find({
            relations: { orderedProducts: true },
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
        const orderStatus = await this.orderStatusController.getStatus(parseInt(request.params.status));
        return this.orderRepository.find({ where: { orderStatus } });
    }


    async addOrder(request: Request, response: Response, next: NextFunction) {
        const { userName, userEmail, orderStatus, orderDate, userPhone, orderedProducts } = request.body;
        const newStatus: OrderStatus = await this.orderStatusController.getStatus(parseInt(orderStatus));
        const order = Object.assign(new Order(), {
            orderDate, userName, userEmail, userPhone, orderStatus: newStatus, orderedProducts
        });
        const savedOrder = await this.orderRepository.save(order);
        for (const orderedProductData of orderedProducts) {
            const { productId, quantity } = orderedProductData;
            const product = await this.productController.findProduct(productId);
            if (product) {
                const orderedProduct = new OrderedProduct();
                orderedProduct.quantity = quantity;
                orderedProduct.product = product;
                orderedProduct.order = savedOrder;
                await this.orderedProductRepository.save(orderedProduct);
            }
        }
        return savedOrder;
    }
}