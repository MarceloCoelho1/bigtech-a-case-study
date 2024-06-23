import { FastifyReply, FastifyRequest } from "fastify";
import { CategoryUsecases } from "../../core/usecases/categoryUsecase";
import { CreateCategoryDTO } from "../dtos/createCategoryDTO";
import { CategoryAlreadyExists } from "../../core/errors/categoryAlreadyExistsError";
import { UpdateCategoryDTO } from "../dtos/updateCategoryDTO";
import { CategoryNotFound } from "../../core/errors/categoryNotFoundError";
import { ProductNotFound } from "../../core/errors/productNotFoundError";

export class CategoryController {
    constructor(
        private CategoryUsecases: CategoryUsecases
    ) { }

    async createCategory(req: FastifyRequest, reply: FastifyReply) {
        try {
            const createProductData = req.body as CreateCategoryDTO
            const category = await this.CategoryUsecases.create(createProductData)
            reply.status(201).send({ category: category })
        } catch (error) {
            if(error instanceof CategoryAlreadyExists) {
                reply.status(error.statusCode).send({ error: error.message });
            } else {
                reply.status(500).send({ error: 'Internal Server Error' });
            }
        }
    }

    async getAllCategories(req: FastifyRequest, reply: FastifyReply) {
        try {
            const categories = await this.CategoryUsecases.getAllCategories()
            reply.status(201).send({ categories: categories })
        } catch (error) {
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    }

    async updateCategory(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = req.params as { id: number }
            const newCategoryData = {
                ...req.body as UpdateCategoryDTO,
                id: Number(id)
            }
            const category = await this.CategoryUsecases.updateCategory(newCategoryData)
            reply.status(201).send({ category: category })
        } catch (error) {
            if(error instanceof CategoryNotFound) {
                reply.status(error.statusCode).send({ error: error.message });
            } else {
                reply.status(500).send({ error: 'Internal Server Error' });
            }
        }
    }

    async deleteCategory(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = req.params as { id: number }

            await this.CategoryUsecases.deleteCategory(Number(id))
            reply.status(201)
        } catch (error) {
            if(error instanceof CategoryNotFound) {
                reply.status(error.statusCode).send({ error: error.message });
            } else {
                reply.status(500).send({ error: 'Internal Server Error' });
            }
        }
    }

    async assignProductsToCategoryController(req: FastifyRequest, reply: FastifyReply) {
        try {
            const assignData = req.body as AssignProductsToCategory

            await this.CategoryUsecases.assignProductsToCategory(assignData)
            reply.status(201)
        } catch (error) {
            if (error instanceof CategoryNotFound) {
                reply.status(error.statusCode).send({ error: error.message });
            } else if (error instanceof ProductNotFound) {
                reply.status(error.statusCode).send({ error: error.message });
            } else {
                reply.status(500).send({ error: 'Internal Server Error' });
            }
        }
    }

}