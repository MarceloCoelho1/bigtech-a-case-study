import { FastifyReply, FastifyRequest } from "fastify";
import { ProductUsecases } from "../../core/usecases/productUsecases";
import { CreateProductDTO } from "../dtos/createProductDTO";
import { CreateProductSchema } from "../schemasValidation/createProductSchema";
import { AddProductToCart } from "../schemasValidation/addProductToCartSchema";
import { RemoveProductFromCart } from "../schemasValidation/removeProductFromCartSchema";
import { InvalidToken } from "../../core/errors/invalidTokenError";
import { UserNotExists } from "../../core/errors/userNotExistsError";
import { ProductIsNotInTheCart } from "../../core/errors/ProductIsNotInTheCartError";
import { UpdateProductQuantitySchema } from "../schemasValidation/updateProductQuantitySchema";
import { ProductNotFound } from "../../core/errors/productNotFoundError";
import { ProductIsAlreadyInTheCart } from "../../core/errors/productIsAlreadyInTheCartError";

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

    async removeProduct(req: FastifyRequest, reply: FastifyReply) {
        try {
            const authHeader = req.headers['authorization'];

            if(!authHeader) {
                return reply.status(401).send({error: "Unauthorized"})
            }

            const token = authHeader && authHeader.split(' ')[1];
            const productData = req.body as {productId: string}

            const removeProductFromCart = {
                ...productData,
                token
            }

            const result = RemoveProductFromCart.safeParse(removeProductFromCart)

            if(!result.success) {
                return reply.status(400).send({errors: result.error.errors})
            }

            await this.productUsecases.removeProductFromCart(removeProductFromCart)
            reply.status(200)
        } catch (error) {
            if(error instanceof InvalidToken) {
                reply.status(error.statusCode).send({ error: error.message });
            } else if(error instanceof UserNotExists) {
                reply.status(error.statusCode).send({ error: error.message });
            } else if(error instanceof ProductIsNotInTheCart) {
                reply.status(error.statusCode).send({ error: error.message });
            } else {
                reply.status(500).send({ error: 'Internal Server Error' });
            }
        }
    }

    async addProductToCart(req: FastifyRequest, reply: FastifyReply) {
        try {
            const authHeader = req.headers['authorization'];

            if(!authHeader) {
                return reply.status(401).send({error: "Unauthorized"})
            }

            const token = authHeader && authHeader.split(' ')[1];
            const productData = req.body as {productId: string, quantity_of_products: number}

            const addProductToCartData = {
                ...productData,
                token
            }

            const result = AddProductToCart.safeParse(addProductToCartData)

            if(!result.success) {
                return reply.status(400).send({errors: result.error.errors})
            }
            
            await this.productUsecases.addProductToCart(addProductToCartData)
            reply.status(200)
        } catch (error) {
            if(error instanceof InvalidToken) {
                reply.status(error.statusCode).send({ error: error.message });
            } else if(error instanceof UserNotExists) {
                reply.status(error.statusCode).send({ error: error.message });
            } else if(error instanceof ProductNotFound) {
                reply.status(error.statusCode).send({ error: error.message });
            } else if(error instanceof ProductIsAlreadyInTheCart) {
                reply.status(error.statusCode).send({ error: error.message });
            } else {
                reply.status(500).send({ error: 'Internal Server Error' });
            }
        }
    }

    async updateProductQuantityInTheCart(req: FastifyRequest, reply: FastifyReply) {
        try {
            const authHeader = req.headers['authorization'];

            if(!authHeader) {
                return reply.status(401).send({error: "Unauthorized"})
            }

            const token = authHeader && authHeader.split(' ')[1];
            const productData = req.body as {productId: string, quantity: number}

            const updateProductQuantityData = {
                ...productData,
                token
            }

            const result = UpdateProductQuantitySchema.safeParse(updateProductQuantityData)

            if(!result.success) {
                return reply.status(400).send({errors: result.error.errors})
            }

            await this.productUsecases.updateProductQuantityInTheCart(updateProductQuantityData)
            reply.status(200)
        } catch (error) {
            if(error instanceof InvalidToken) {
                reply.status(error.statusCode).send({ error: error.message });
            } else if(error instanceof UserNotExists) {
                reply.status(error.statusCode).send({ error: error.message });
            } else if(error instanceof ProductIsNotInTheCart) {
                reply.status(error.statusCode).send({ error: error.message });
            } else {
                reply.status(500).send({ error: 'Internal Server Error' });
            }
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