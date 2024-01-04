import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Product } from "../entity/Product"

export class ProductController {

    private productRepository = AppDataSource.getRepository(Product)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.productRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const product = await this.productRepository.findOne({
            where: { productId: id }
        })

        if (!product) {
            return "no such product"
        }
        return product
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { name, description, price, weight } = request.body;

        const product = Object.assign(new Product(), {
            name, description, price, weight
        })

        return this.productRepository.save(product)
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        const { name, description, price, weight } = request.body;

        const product = Object.assign(new Product(), {
            name, description, price, weight
        })

        const result = await this.productRepository.update(id, product)

        if (result.affected === 0) {
            return "no such product"
        }
        return "product updated"
    }

}