import { FastifyInstance } from "fastify";
import { JWTService } from "../../infra/services/jwtService";
import { PrismaUserRepository } from "../../data/repositories/prismaUserRepository";
import { PrismaCartRepository } from "../../data/repositories/prismaCartRepository";
import { CheckoutUsecases } from "../../core/usecases/checkoutUsecases";
import { CheckoutController } from "../controller/checkoutController";
import { MailService } from "../../infra/services/MailService";


export const checkoutRoutes = (app: FastifyInstance): void => {
    const cartRepository = new PrismaCartRepository()
    const userRepository = new PrismaUserRepository()
    const jwtService = new JWTService()
    const mailService = new MailService()
    const checkoutUsecases = new CheckoutUsecases(jwtService, userRepository, cartRepository, mailService)
    const checkoutController = new CheckoutController(checkoutUsecases)

    app.post('/checkout/create-payment-intent', (req, reply) => checkoutController.initCheckout(req, reply));

}