import { ICategoryRepository } from "../../core/repositories/ICategoryRepository";
import { CreateCategoryDTO } from "../../http/dtos/createCategoryDTO";
import { prisma } from "../datasources/prismaClient";
import { Category } from "../../core/entities/category";

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

}