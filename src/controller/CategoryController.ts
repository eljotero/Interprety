import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Category } from "../entity/Category"

export class CategoryController {

    private categoryRepository = AppDataSource.getRepository(Category)

    async getAllCategories(request: Request, response: Response, next: NextFunction) {
        return this.categoryRepository.find()
    }

    async getCategoryById(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);
        return this.categoryRepository.find({
            where: {
                categoryId: id
            }
        })
    }

    async addCategory(request: Request, response: Response, next: NextFunction) {
        const categoryName = request.body.name;
        const newCategory = new Category();
        newCategory.name = categoryName;
        return this.categoryRepository.save(newCategory);
    }

    async findCategory(id: number) {
        return this.categoryRepository.findOne({
            where: {
                categoryId: id
            }
        })
    }

}