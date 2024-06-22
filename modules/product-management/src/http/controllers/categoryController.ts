import { FastifyReply, FastifyRequest } from "fastify";
import { CategoryUsecases } from "../../core/usecases/categoryUsecase";
import { CreateCategoryDTO } from "../dtos/createCategoryDTO";
import { CategoryAlreadyExists } from "../../core/errors/categoryAlreadyExistsError";

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

}