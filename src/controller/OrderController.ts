import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Order } from "../entity/Order"
import { OrderStatus } from "../entity/OrderStatus"
import { OrderedProduct } from "../entity/OrderedProduct"
import { OrderStatusController } from "./OrderStatusController"
import { ProductController } from "./ProductController"
import {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from 'http-status-codes';
import { Product } from "../entity/Product";

interface OrderRequest {
    userName: string,
    userEmail: string,
    userPhone: number,
    orderStatus: number,
    orderedProducts: {
        productId: number,
        quantity: number
    }[],
    orderDate: Date
}

export class OrderController {

    private orderRepository = AppDataSource.getRepository(Order)
    private orderedProductRepository = AppDataSource.getRepository(OrderedProduct);
    private orderStatusController = new OrderStatusController();
    private productController = new ProductController();

    async getAllOrders(request: Request, response: Response, next: NextFunction) {
        const result: Order[] = await this.orderRepository.find({
            relations: {
                orderStatus: true,
                orderedProducts: true
            }
        });
        if (!result) {
            response.status(StatusCodes.NOT_FOUND).json({
                message: getReasonPhrase(StatusCodes.NOT_FOUND)
            });
        } else {
            response.status(StatusCodes.OK).json({ result });
        }
    }

    async getOrderByUserName(request: Request, response: Response, next: NextFunction) {
        const userName: string = request.params.userName;
        const order: Order[] = await this.orderRepository.find({
            relations: { orderedProducts: true, orderStatus: true },
            where: { userName: userName }
        });
        if (!order) {
            response.status(StatusCodes.NOT_FOUND).json({
                message: getReasonPhrase(StatusCodes.NOT_FOUND)
            })
        } else {
            response.status(StatusCodes.OK).json({ order });
        }
    }

    async getOrderById(request: Request, response: Response, next: NextFunction) {
        const id: number = parseInt(request.params.id);
        if (id < 1) {
            response.status(StatusCodes.BAD_REQUEST).json({
                message: getReasonPhrase(StatusCodes.BAD_REQUEST)
            })
        }
        const order: Order = await this.orderRepository.findOne({
            relations: { orderedProducts: true, orderStatus: true },
            where: { orderId: id }
        });
        if (!order) {
            response.status(StatusCodes.NOT_FOUND).json({
                message: getReasonPhrase(StatusCodes.NOT_FOUND)
            })
        } else {
            response.status(StatusCodes.OK).json({ order });
        }
    };

    async changeOrderStatus(request: Request, response: Response, next: NextFunction) {
        const id: number = parseInt(request.params.id);
        const orderStatus: number = request.body.newOrderStatus;
        if (orderStatus < 1 || !orderStatus || (typeof orderStatus !== 'number') || orderStatus > 4) {
            response.status(StatusCodes.BAD_REQUEST).json({
                message: getReasonPhrase(StatusCodes.BAD_REQUEST)
            });
            return;
        }
        const order: Order = await this.orderRepository.findOne({
            where: { orderId: id },
            relations: { orderStatus: true }
        });
        if (!order) {
            response.status(StatusCodes.NOT_FOUND).json({
                message: getReasonPhrase(StatusCodes.NOT_FOUND)
            });
            return;
        }
        const newOrderStatus: OrderStatus = await this.orderStatusController.getStatus(orderStatus);
        if (!OrderController.validateOrderStatus(order.orderStatus.status, newOrderStatus)) {
            response.status(StatusCodes.BAD_REQUEST).json({
                message: getReasonPhrase(StatusCodes.BAD_REQUEST)
            });
            return;
        }
        await this.orderRepository.update({ orderId: id }, { orderStatus: newOrderStatus });
        response.status(StatusCodes.OK).json({
            message: getReasonPhrase(StatusCodes.OK)
        });
    }

    async getOrdersByState(request: Request, response: Response, next: NextFunction) {
        const orderStatus: OrderStatus = await this.orderStatusController.getStatus(parseInt(request.params.status));
        if (!orderStatus) {
            response.status(StatusCodes.NOT_FOUND).json({
                message: getReasonPhrase(StatusCodes.NOT_FOUND)
            });
            return;
        }
        const result: Order[] = await this.orderRepository.find({
            where: { orderStatus: orderStatus },
            relations: {
                orderStatus: true,
                orderedProducts: true
            }
        });
        if (!result) {
            response.status(StatusCodes.NOT_FOUND).json({
                message: getReasonPhrase(StatusCodes.NOT_FOUND)
            });
        } else {
            response.status(StatusCodes.OK).json({ result });
        }
    }


    async addOrder(request: Request, response: Response, next: NextFunction) {
        const orderReq: OrderRequest = request.body;
        if (!OrderController.validateOrder(orderReq)) {
            response.status(StatusCodes.BAD_REQUEST).json({
                message: getReasonPhrase(StatusCodes.BAD_REQUEST)
            });
            return;
        }
        const userName = orderReq.userName;
        const userEmail = orderReq.userEmail;
        const userPhone = orderReq.userPhone;
        const orderStatus = orderReq.orderStatus;
        const orderedProducts = orderReq.orderedProducts;
        var orderDate = null;
        if (orderReq.orderDate !== undefined) {
            orderDate = new Date(orderReq.orderDate);
        }
        const newStatus: OrderStatus = await this.orderStatusController.getStatus(orderStatus);
        if (!newStatus) {
            response.status(StatusCodes.NOT_FOUND).json({
                message: getReasonPhrase(StatusCodes.NOT_FOUND)
            });
            return;
        }
        const order = Object.assign(new Order(), {
            orderDate, userName, userEmail, userPhone, orderStatus: newStatus, orderedProducts
        });
        const savedOrder: Order = await this.orderRepository.save(order);
        for (const orderedProductData of orderedProducts) {
            const { productId, quantity } = orderedProductData;
            const product: Product = await this.productController.findProduct(productId);
            if (!product) {
                response.status(StatusCodes.NOT_FOUND).json({
                    message: getReasonPhrase(StatusCodes.NOT_FOUND)
                });
                return;
            }
            const orderedProduct = new OrderedProduct();
            orderedProduct.quantity = quantity;
            orderedProduct.product = product;
            orderedProduct.order = savedOrder;
            await this.orderedProductRepository.save(orderedProduct);
        }
        return savedOrder;
    }
    static validateOrder(order: OrderRequest): boolean {
        if (
            typeof order.userName !== 'string' ||
            typeof order.userEmail !== 'string' ||
            typeof order.userPhone !== 'number' ||
            typeof order.orderStatus !== 'number' ||
            !Array.isArray(order.orderedProducts) ||
            order.userName.length === 0 ||
            order.userEmail.length === 0 ||
            order.userPhone.toString().length !== 9 ||
            order.orderStatus <= 0 ||
            order.orderedProducts.length === 0 ||
            order.userPhone <= 0
        ) {
            return false;
        }

        for (const product of order.orderedProducts) {
            if (
                typeof product.productId !== 'number' ||
                typeof product.quantity !== 'number' ||
                product.productId <= 0 ||
                product.quantity <= 0
            ) {
                return false;
            }
        }

        return true;
    }

    static validateOrderStatus(orderStatus: string, newOrderStatus: OrderStatus): boolean {
        if (orderStatus === 'delivered') {
            return false;
        } else if (orderStatus === newOrderStatus.status) {
            return false;
        }
        else if (orderStatus === 'approved' && newOrderStatus.status === 'unapproved') {
            return false;
        } else if (orderStatus === 'canceled') {
            return false;
        }
        return true;
    }
}