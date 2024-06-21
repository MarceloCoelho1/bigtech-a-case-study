import { FastifyInstance } from "fastify";
import { ProductUsecases } from "../../core/usecases/productUsecase";
import { PrismaProductRepository } from "../../data/repositories/prismaProductRepository";
import { ProductController } from "../controllers/productController";

export const productRoutes = (app: FastifyInstance): void => {
    const productRepository = new PrismaProductRepository()
    const productUsecases = new ProductUsecases(productRepository)
    const productController = new ProductController(productUsecases)

    app.get('/products', (req, reply) => productController.getAllProducts(req, reply));
    app.post('/products', (req, reply) => productController.createProduct(req, reply));
}