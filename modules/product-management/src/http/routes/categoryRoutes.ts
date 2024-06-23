import { FastifyInstance } from "fastify";
import { PrismaCategoryRepository } from "../../data/repositories/prismaCategoryRepository";
import { CategoryUsecases } from "../../core/usecases/categoryUsecase";
import { CategoryController } from "../controllers/categoryController";
import { PrismaProductRepository } from "../../data/repositories/prismaProductRepository";

export const categoryRoutes = (app: FastifyInstance): void => {
    const categoryRepository = new PrismaCategoryRepository()
    const productRepository = new PrismaProductRepository()
    const categoryUsecases = new CategoryUsecases(categoryRepository, productRepository)
    const categoryController = new CategoryController(categoryUsecases)

    app.get('/category', (req, reply) => categoryController.getAllCategories(req, reply))
    app.post('/category', (req, reply) => categoryController.createCategory(req, reply))
    app.patch('/category/:id', (req, reply) => categoryController.updateCategory(req, reply))
    app.delete('/category/:id', (req, reply) => categoryController.deleteCategory(req, reply))
    app.patch('/category/assign-product', (req, reply) => categoryController.assignProductsToCategoryController(req, reply))

}