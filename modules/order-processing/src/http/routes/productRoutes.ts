import { FastifyInstance } from "fastify";
import { JWTService } from "../../infra/services/jwtService";
import { PrismaProductRepository } from "../../data/repositories/prismaProductRepository";
import { ProductUsecases } from "../../core/usecases/productUsecases";
import { ProductController } from "../controller/productController";


export const productRoutes = (app: FastifyInstance): void => {
    const productRepository = new PrismaProductRepository()
    const jwtService = new JWTService()
    const productUsecases = new ProductUsecases(productRepository, jwtService)
    const productController = new ProductController(productUsecases)

    app.get('/products', (req, reply) => productController.getAllProducts(req, reply));
    app.post('/products', (req, reply) => productController.create(req, reply));

}