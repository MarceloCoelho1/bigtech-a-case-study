import { FastifyInstance } from "fastify";
import { JWTService } from "../../infra/services/jwtService";
import { PrismaProductRepository } from "../../data/repositories/prismaProductRepository";
import { ProductUsecases } from "../../core/usecases/productUsecases";
import { ProductController } from "../controller/productController";
import { PrismaUserRepository } from "../../data/repositories/prismaUserRepository";
import { PrismaCartProductRepository } from "../../data/repositories/prismaCartProductRepository";


export const productRoutes = (app: FastifyInstance): void => {
    const productRepository = new PrismaProductRepository()
    const userRepository = new PrismaUserRepository()
    const cartProductRepository = new PrismaCartProductRepository()
    const jwtService = new JWTService()
    const productUsecases = new ProductUsecases(productRepository, jwtService, userRepository, cartProductRepository)
    const productController = new ProductController(productUsecases)

    app.get('/products', (req, reply) => productController.getAllProducts(req, reply));
    app.post('/products', (req, reply) => productController.create(req, reply));
    app.post('/products/add-to-cart', (req, reply) => productController.addProductToCart(req, reply))

}