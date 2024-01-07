import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Category } from "../entity/Category"

export class CategoryController {

    private categoryRepository = AppDataSource.getRepository(Category)

    async getAllCategories(request: Request, response: Response, next: NextFunction) {
        return this.categoryRepository.find()
    }

}