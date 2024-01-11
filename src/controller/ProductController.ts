import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Product } from "../entity/Product"
import { CategoryController } from "./CategoryController"
import {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from 'http-status-codes';
import { Category } from "../entity/Category";

interface ProductRequest {
    name: string,
    description: string,
    price: number,
    weight: number,
    categoryName: string
}

export class ProductController {

    private productRepository = AppDataSource.getRepository(Product);
    private categoryController = new CategoryController();

    async getAllProducts(request: Request, response: Response, next: NextFunction) {
        const products: Product[] = await this.productRepository.find({
            relations: {
                category: true
            }
        });
        if (!products) {
            response.status(StatusCodes.NOT_FOUND).json({
                message: getReasonPhrase(StatusCodes.NOT_FOUND)
            });
        } else {
            response.status(StatusCodes.OK).json({ products });
        }
    }

    async getProduct(request: Request, response: Response, next: NextFunction) {
        const id: number = parseInt(request.params.id);
        const product: Product = await this.productRepository.findOne({
            where: { productId: id },
            relations: {
                category: true
            }
        });
        if (!product) {
            response.status(StatusCodes.NOT_FOUND).json({
                message: getReasonPhrase(StatusCodes.NOT_FOUND)
            });
        } else {
            response.status(StatusCodes.OK).json({ product });
        }
    }

    async addProduct(request: Request, response: Response, next: NextFunction) {
        const product = <ProductRequest>request.body;
        if (!ProductController.validateProduct(product)) {
            response.status(StatusCodes.BAD_REQUEST).json({
                message: getReasonPhrase(StatusCodes.BAD_REQUEST)
            });
            return;
        }
        const name = product.name;
        const description = product.description;
        const price = product.price;
        const weight = product.weight;
        const categoryName = product.categoryName;
        const exisitingProduct: Product = await this.productRepository.findOne({
            where: {
                name: name
            }
        });
        if (!exisitingProduct) {
            const newCategory: Category = await this.categoryController.findCategory(categoryName);
            if (!newCategory) {
                response.status(StatusCodes.NOT_FOUND).json({
                    message: getReasonPhrase(StatusCodes.NOT_FOUND)
                })
                return;
            }
            const product = Object.assign(new Product(), {
                name, description, price, weight, category: newCategory
            });
            this.productRepository.insert(product);
            response.status(StatusCodes.CREATED).json({
                message: getReasonPhrase(StatusCodes.CREATED)
            });
        } else {
            response.status(StatusCodes.CONFLICT).json({
                message: getReasonPhrase(StatusCodes.CONFLICT)
            });
        }
    }

    async updateProduct(request: Request, response: Response, next: NextFunction) {
        const id: number = parseInt(request.params.id)
        const productReq = <ProductRequest>request.body;
        if (!ProductController.validateProduct(productReq)) {
            response.status(StatusCodes.BAD_REQUEST).json({
                message: getReasonPhrase(StatusCodes.BAD_REQUEST)
            });
            return;
        }
        const name = productReq.name;
        const description = productReq.description;
        const price = productReq.price;
        const weight = productReq.weight;
        const categoryName = productReq.categoryName;
        const exisitingProduct: Product = await this.productRepository.findOne({
            where: {
                productId: id
            }
        });
        if (!exisitingProduct) {
            response.status(StatusCodes.NOT_FOUND).json({
                message: getReasonPhrase(StatusCodes.NOT_FOUND)
            });
            return;
        }
        const newCategory: Category = await this.categoryController.findCategory(categoryName);
        if (!newCategory) {
            response.status(StatusCodes.NOT_FOUND).json({
                message: getReasonPhrase(StatusCodes.NOT_FOUND)
            });
            return;
        }
        const product = Object.assign(new Product(), {
            name, description, price, weight, category: newCategory
        });
        await this.productRepository.update(id, product);
        response.status(StatusCodes.OK).json({
            message: getReasonPhrase(StatusCodes.OK)
        });
    }

    async findProduct(id: number) {
        return this.productRepository.findOne({
            where: { productId: id }
        })
    }

    static validateProduct(product: ProductRequest): boolean {
        return (
            typeof product.name === 'string' &&
            typeof product.description === 'string' &&
            typeof product.price === 'number' &&
            typeof product.weight === 'number' &&
            typeof product.categoryName === 'string' &&
            product.name.length > 0 &&
            product.description.length > 0 &&
            product.price > 0 &&
            product.weight > 0 &&
            product.categoryName.length > 0
        );
    }


}