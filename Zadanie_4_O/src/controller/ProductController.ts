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
        try {
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
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
            });
        }
    }

    async getProduct(request: Request, response: Response, next: NextFunction) {
        const id: number = parseInt(request.params.id);
        try {
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
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
            });
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
        try {
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
                await AppDataSource.manager.transaction(async (entityManager) => {
                    const product = Object.assign(new Product(), {
                        name, description, price, weight, category: newCategory
                    });
                    try {
                        entityManager.insert(Product, product);
                    } catch (error) {
                        response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                            message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
                        });
                    }
                    response.status(StatusCodes.CREATED).json({
                        message: getReasonPhrase(StatusCodes.CREATED)
                    });
                })
            } else {
                response.status(StatusCodes.CONFLICT).json({
                    message: getReasonPhrase(StatusCodes.CONFLICT)
                });
            }
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
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
        try {
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
            try {
                const newCategory: Category = await this.categoryController.findCategory(categoryName);
                if (!newCategory) {
                    response.status(StatusCodes.NOT_FOUND).json({
                        message: getReasonPhrase(StatusCodes.NOT_FOUND)
                    });
                    return;
                }
                await AppDataSource.manager.transaction(async (entityManager) => {
                    const product = Object.assign(new Product(), {
                        name, description, price, weight, category: newCategory
                    });
                    try {
                        await entityManager.update(Product, id, product);
                        response.status(StatusCodes.OK).json({
                        message: getReasonPhrase(StatusCodes.OK)
                    });
                    } catch (error) {
                        response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                            message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
                        });
                    }
                })
            } catch (error) {
                response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
                });
            }
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
            });
        }
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