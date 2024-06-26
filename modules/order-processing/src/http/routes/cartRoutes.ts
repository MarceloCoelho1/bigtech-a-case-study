import { FastifyInstance } from "fastify";
import { JWTService } from "../../infra/services/jwtService";
import { PrismaUserRepository } from "../../data/repositories/prismaUserRepository";
import { PrismaCartRepository } from "../../data/repositories/prismaCartRepository";
import { CartUsecases } from "../../core/usecases/cartUsecases";
import { CartController } from "../controller/cartController";


export const cartRoutes = (app: FastifyInstance): void => {
    const cartRepository = new PrismaCartRepository()
    const userRepository = new PrismaUserRepository()
    const jwtService = new JWTService()
    const productUsecases = new CartUsecases(jwtService, userRepository, cartRepository)
    const cartController = new CartController(productUsecases)

    app.get('/cart/user-products', (req, reply) => cartController.getAllProductsFromCart(req, reply));
    app.delete('/cart/clear-cart', (req, reply) => cartController.clearCart(req, reply));
}