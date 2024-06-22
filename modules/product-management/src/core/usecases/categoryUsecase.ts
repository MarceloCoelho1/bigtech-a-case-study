import { Category } from "@prisma/client";
import { CreateCategoryDTO } from "../../http/dtos/createCategoryDTO";
import { ICategoryRepository } from "../repositories/ICategoryRepository";
import { CategoryAlreadyExists } from "../errors/categoryAlreadyExistsError";

export class CategoryUsecases {
    constructor(
        private categoryRepository: ICategoryRepository
    ) {}

    async create(data: CreateCategoryDTO): Promise<Category> {

        const category = await this.getCategoryByName(data.name)

        if(category) {
            throw new CategoryAlreadyExists()
        }

        const newCategory = await this.categoryRepository.create(data)

        return newCategory
    }

    async getAllCategories(): Promise<Category[]> {
        const categories = await this.categoryRepository.getAllCategories()
        return categories
    }

    async getCategoryByName(name: string): Promise<Category | null> {
        const category = await this.categoryRepository.getCategoryByName(name)
        return category
    }
}