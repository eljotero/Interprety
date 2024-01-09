import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Product } from "../entity/Product"
import { Category } from "../entity/Category";

export class ProductController {

    private productRepository = AppDataSource.getRepository(Product);
    private categoryRepository = AppDataSource.getRepository(Category);

    async getAllProducts(request: Request, response: Response, next: NextFunction) {
        return this.productRepository.find()
    }

    async getProduct(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)
        console.log(id);

        const product = await this.productRepository.findOne({
            where: { productId: id }
        })
        console.log(product);

        return product
    }

    async addProduct(request: Request, response: Response, next: NextFunction) {
        const { name, description, price, weight, categoryId } = request.body;

        const product = Object.assign(new Product(), {
            name, description, price, weight
        })

        const category = await this.categoryRepository.findOne({
            where: { categoryId: categoryId}
        })
        product.category = category;
        return this.productRepository.save(product)
    }

    async updateProduct(request: Request, response: Response, next: NextFunction) {
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