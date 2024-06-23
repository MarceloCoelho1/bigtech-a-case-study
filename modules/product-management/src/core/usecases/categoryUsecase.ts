import { Category } from "@prisma/client";
import { CreateCategoryDTO } from "../../http/dtos/createCategoryDTO";
import { ICategoryRepository } from "../repositories/ICategoryRepository";
import { CategoryAlreadyExists } from "../errors/categoryAlreadyExistsError";
import { UpdateCategoryDTO } from "../../http/dtos/updateCategoryDTO";
import { CategoryNotFound } from "../errors/categoryNotFoundError";
import { IProductRepository } from "../repositories/IProductRepository";
import { ProductNotFound } from "../errors/productNotFoundError";

export class CategoryUsecases {
    constructor(
        private categoryRepository: ICategoryRepository,
        private productRepository: IProductRepository
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

    async getCategoryById(id: number): Promise<Category | null> {
        const category = await this.categoryRepository.getCategoryById(id)
        return category
    }
 
    async updateCategory(data: UpdateCategoryDTO): Promise<Category> {
        const category = await this.getCategoryById(data.id)

        if(!category) {
            throw new CategoryNotFound()
        }

        const updatedCategory = await this.categoryRepository.updateCategory(data)
        return updatedCategory
    }

    async deleteCategory(id: number): Promise<void> {
        const category = await this.getCategoryById(id)

        if(!category) {
            throw new CategoryNotFound()
        }

        await this.categoryRepository.deleteCategory(id)
    }

    async assignProductsToCategory(data: AssignProductsToCategory): Promise<void> {
        const product = await this.productRepository.findById(data.productId)

        if(!product) {
            throw new ProductNotFound()
        }

        const category = await this.getCategoryById(data.categoryId)

        if(!category) {
            throw new CategoryNotFound()
        }

        await this.categoryRepository.assignProductsToCategory(data)
    }
}