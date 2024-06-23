import { CreateCategoryDTO } from "../../http/dtos/createCategoryDTO";
import { UpdateCategoryDTO } from "../../http/dtos/updateCategoryDTO";
import { Category } from "../entities/category";

export interface ICategoryRepository {
    create(data: CreateCategoryDTO): Promise<Category>;
    getAllCategories(): Promise<Category[]>
    getCategoryByName(name: string): Promise<Category | null>
    updateCategory(data: UpdateCategoryDTO): Promise<Category>
    getCategoryById(id: number): Promise<Category | null>
    deleteCategory(id: number): Promise<void>
    assignProductsToCategory(data: AssignProductsToCategory): Promise<void>
}