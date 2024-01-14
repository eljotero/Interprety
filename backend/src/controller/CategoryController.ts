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

    private categoryRepository = AppDataSource.getRepository(Category);

    async getAllCategories(request: Request, response: Response, next: NextFunction) {
        try {
            const categories: Category[] = await this.categoryRepository.find();
            if (!categories) {
                response.status(StatusCodes.NOT_FOUND).json({
                    message: getReasonPhrase(StatusCodes.NOT_FOUND)
                });
            } else {
                response.status(StatusCodes.OK).json({ categories });
            }
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
            })
        }
    }

    async getCategoryById(request: Request, response: Response, next: NextFunction) {
        const id: number = parseInt(request.params.id);
        try {
            const category: Category = await this.categoryRepository.findOne({
                where: {
                    categoryId: id
                }
            });
            if (!category) {
                response.status(StatusCodes.NOT_FOUND).json({
                    message: 'No such category'
                });
            } else {
                response.status(StatusCodes.OK).json({ category });
            }
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
            });
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
        await AppDataSource.manager.transaction(async (entityManager) => {
            try {
                const exisitingCategory: Category = await this.findCategory(categoryName);
                if (!exisitingCategory) {
                    const newCategory = new Category();
                    newCategory.name = categoryName;
                    try {
                        await entityManager.insert(Category, newCategory);
                        response.status(StatusCodes.CREATED).json({
                            message: getReasonPhrase(StatusCodes.CREATED)
                        });
                    } catch (error) {
                        response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                            message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
                        });
                    }
                } else {
                    response.status(StatusCodes.CONFLICT).json({
                        message: 'This category already exists'
                    });
                }
            } catch (error) {
                response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
                });
            }
        })
    }

    async findCategory(categoryName: string) {
        try {
            return await this.categoryRepository.findOne({
                where: {
                    name: categoryName
                }
            })
        } catch (error) {
            throw error;
        }
    }

}