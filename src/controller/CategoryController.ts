import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Category } from "../entity/Category"
import {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from 'http-status-codes';

export class CategoryController {

    private categoryRepository = AppDataSource.getRepository(Category)

    async getAllCategories(request: Request, response: Response, next: NextFunction) {
        const categories: Category[] = await this.categoryRepository.find();
        if (!categories) {
            response.status(StatusCodes.NOT_FOUND).json({
                message: getReasonPhrase(StatusCodes.NOT_FOUND)
            })
        } else {
            response.status(StatusCodes.OK).json({ categories });
        }
    }

    async getCategoryById(request: Request, response: Response, next: NextFunction) {
        const id: number = parseInt(request.params.id);
        const category: Category = await this.categoryRepository.findOne({
            where: {
                categoryId: id
            }
        });
        if (!category) {
            response.status(StatusCodes.NOT_FOUND).json({
                message: getReasonPhrase(StatusCodes.NOT_FOUND)
            })
        } else {
            response.status(StatusCodes.OK).json({ category });
        }
    }

    async addCategory(request: Request, response: Response, next: NextFunction) {
        const categoryName: string = request.body.name;
        if (!categoryName || categoryName.length === 0) {
            response.status(StatusCodes.BAD_REQUEST).json({
                message: getReasonPhrase(StatusCodes.BAD_REQUEST)
            });
            return;
        }
        const exisitingCategory: Category = await this.findCategory(categoryName);
        if (!exisitingCategory) {
            const newCategory = new Category();
            newCategory.name = categoryName;
            this.categoryRepository.insert(newCategory);
            response.status(StatusCodes.CREATED).json({
                message: getReasonPhrase(StatusCodes.CREATED)
            });
        } else {
            response.status(StatusCodes.CONFLICT).json({
                message: getReasonPhrase(StatusCodes.CONFLICT)
            });
        }
    }

    async findCategory(categoryName: string) {
        return await this.categoryRepository.findOne({
            where: {
                name: categoryName
            }
        })
    }

}