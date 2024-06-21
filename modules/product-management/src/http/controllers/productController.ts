import { FastifyReply, FastifyRequest } from "fastify";
import { ProductUsecases } from "../../core/usecases/productUsecase";
import { CreateProductDTO } from "../dtos/createProductDTO";

export class ProductController {
    constructor(
        private ProductUsecases: ProductUsecases
    ) {}

    async createProduct(req: FastifyRequest, reply: FastifyReply) {
        try {
            const createProductData = req.body as CreateProductDTO
            const product = await this.ProductUsecases.createProduct(createProductData)
            reply.status(201).send({product: product})
        } catch (error) {
            console.error(error)
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    }

    async getAllProducts(req: FastifyRequest, reply: FastifyReply) {
        try {
            const products = await this.ProductUsecases.getAllProducts()
            reply.status(201).send({product: products})
        } catch(error) {
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    }
}