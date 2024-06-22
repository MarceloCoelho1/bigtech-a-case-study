import { FastifyReply, FastifyRequest } from "fastify";
import { ProductUsecases } from "../../core/usecases/productUsecase";
import { CreateProductDTO } from "../dtos/createProductDTO";
import { UpdateProductDTO } from "../dtos/updateProductDTO";
import { ProductNotFound } from "../../core/errors/productNotFoundError";

export class ProductController {
    constructor(
        private ProductUsecases: ProductUsecases
    ) { }

    async createProduct(req: FastifyRequest, reply: FastifyReply) {
        try {
            const createProductData = req.body as CreateProductDTO
            const product = await this.ProductUsecases.createProduct(createProductData)
            reply.status(201).send({ product: product })
        } catch (error) {
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    }

    async getAllProducts(req: FastifyRequest, reply: FastifyReply) {
        try {
            const products = await this.ProductUsecases.getAllProducts()
            reply.status(201).send({ product: products })
        } catch (error) {
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    }

    async updateProduct(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = req.params as { id: string }
            const productBody = req.body as UpdateProductDTO

            const newProductData = {
                ...productBody,
                id
            }

            const updatedProduct = await this.ProductUsecases.updateProduct(newProductData)
            reply.status(201).send({ product: updatedProduct })
        } catch (error) {
            if (error instanceof ProductNotFound) {
                reply.status(error.statusCode).send({ error: error.message });
            } else {
                reply.status(500).send({ error: 'Internal Server Error' });
            }
        }
    }

    async deleteProduct(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = req.params as { id: string }
            await this.ProductUsecases.deleteProduct(id)
            reply.status(204)
        } catch (error) {
            if (error instanceof ProductNotFound) {
                reply.status(error.statusCode).send({ error: error.message });
            } else {
                reply.status(500).send({ error: 'Internal Server Error' });
            }
        }
    }

    async findProductById(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = req.params as { id: string }
            const product = await this.ProductUsecases.findById(id)
            reply.status(200).send({ product: product })
        } catch(error) {
            if (error instanceof ProductNotFound) {
                reply.status(error.statusCode).send({ error: error.message });
            } else {
                reply.status(500).send({ error: 'Internal Server Error' });
            }
        }
    }
}