import { FastifyInstance } from "fastify";
import { PrismaCategoryRepository } from "../../data/repositories/prismaCategoryRepository";
import { CategoryUsecases } from "../../core/usecases/categoryUsecase";
import { CategoryController } from "../controllers/categoryController";

export const categoryRoutes = (app: FastifyInstance): void => {
    const categoryRepository = new PrismaCategoryRepository()
    const categoryUsecases = new CategoryUsecases(categoryRepository)
    const categoryController = new CategoryController(categoryUsecases)

    app.get('/category', (req, reply) => categoryController.getAllCategories(req, reply));
    app.post('/category', (req, reply) => categoryController.createCategory(req, reply))
}