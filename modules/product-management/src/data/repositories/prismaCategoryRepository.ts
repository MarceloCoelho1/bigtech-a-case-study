import { ICategoryRepository } from "../../core/repositories/ICategoryRepository";
import { CreateCategoryDTO } from "../../http/dtos/createCategoryDTO";
import { prisma } from "../datasources/prismaClient";
import { Category } from "../../core/entities/category";
import { UpdateCategoryDTO } from "../../http/dtos/updateCategoryDTO";

export class PrismaCategoryRepository implements ICategoryRepository {
    async create(data: CreateCategoryDTO): Promise<Category> {
        const category = await prisma.category.create({
            data
        })

        return category

    }

    async getAllCategories(): Promise<Category[]> {
        const categories = await prisma.category.findMany()
        return categories
    }

    async getCategoryByName(name: string): Promise<Category | null> {
        const category = await prisma.category.findUnique({ where: { name }})
        return category
    }

    async getCategoryById(id: number): Promise<Category | null> {
        const category = await prisma.category.findUnique({ where: { id }})
        return category
    }

    async updateCategory(data: UpdateCategoryDTO): Promise<Category> {
        const category = await prisma.category.update({
            where: { id: data.id },
            data
        })

        return category
    }

    async deleteCategory(id: number): Promise<void> {
        await prisma.category.delete({ where: { id } })
    }

    async assignProductsToCategory(data: AssignProductsToCategory): Promise<void> {
        await prisma.product.update({
            where: {id: data.productId},
            data: {
                category_id: data.categoryId
            }
        })
    }

}