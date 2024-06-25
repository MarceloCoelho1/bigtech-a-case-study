import { FastifyReply, FastifyRequest } from "fastify";
import { ProductUsecases } from "../../core/usecases/productUsecases";
import { CreateProductDTO } from "../dtos/createProductDTO";
import { CreateProductSchema } from "../schemasValidation/createProductSchema";

export class ProductController {
    constructor(
        private productUsecases: ProductUsecases
    ) {}

    async create(req: FastifyRequest, reply: FastifyReply) {
        try {
            const createProductData = req.body as CreateProductDTO
            const result = CreateProductSchema.safeParse(createProductData)

            if(!result.success) {
                return reply.status(400).send({errors: result.error.errors})
            }

            const product = await this.productUsecases.create(createProductData)
            reply.status(201).send({product: product})
        } catch (error) {
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    }

    async getAllProducts(req: FastifyRequest, reply: FastifyReply) {
        try {
           const products =  await this.productUsecases.getAllProducts()
           reply.status(200).send({products: products})
        } catch (error) {
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    }
}