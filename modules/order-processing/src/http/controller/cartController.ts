import { FastifyReply, FastifyRequest } from "fastify";
import { InvalidToken } from "../../core/errors/invalidTokenError";
import { UserNotExists } from "../../core/errors/userNotExistsError";
import { CartUsecases } from "../../core/usecases/cartUsecases";

export class CartController {
    constructor(
        private cartUsecases: CartUsecases
    ) {}

    async getAllProductsFromCart(req: FastifyRequest, reply: FastifyReply) {
        try {
            const authHeader = req.headers['authorization'];

            if(!authHeader) {
                return reply.status(401).send({error: "Unauthorized"})
            }

            const token = authHeader && authHeader.split(' ')[1];

            const products = await this.cartUsecases.getAllProductsInCart(token)
            reply.status(200).send({products: products})
        } catch (error) {
            if(error instanceof InvalidToken) {
                reply.status(error.statusCode).send({ error: error.message });
            } else if(error instanceof UserNotExists) {
                reply.status(error.statusCode).send({ error: error.message });
            } else {
                reply.status(500).send({ error: 'Internal Server Error' });
            }
        }
    }


}