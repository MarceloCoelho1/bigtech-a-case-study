import { CreateCategoryDTO } from "../../http/dtos/createCategoryDTO";
import { Category } from "../entities/category";

export interface ICategoryRepository {
    create(data: CreateCategoryDTO): Promise<Category>;
    getAllCategories(): Promise<Category[]>
    getCategoryByName(name: string): Promise<Category | null>
}