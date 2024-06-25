import { FastifyReply, FastifyRequest } from "fastify";
import { UserUsecases } from "../../core/usecases/userUsecases";
import { CreateUserDTO } from "../dtos/createUserDTO";
import { z } from "zod";
import { CreateUserSchema } from "../schemas/createUserSchema";
import { UserAlreadyExists } from "../../core/errors/userAlreadyExistsError";

export class UserController {
    constructor(
        private userUsecases: UserUsecases
    ) {}

    async create(req: FastifyRequest, reply: FastifyReply) {
        try {
            const createUserData = req.body as CreateUserDTO
            const result = CreateUserSchema.safeParse(createUserData)

            if(!result.success) {
                return reply.status(400).send({errors: result.error.errors})
            }

            const user = await this.userUsecases.create(createUserData)
            reply.status(201).send({user: user})
        } catch (error) {
            if(error instanceof UserAlreadyExists) {
                reply.status(error.statusCode).send({ error: error.message });
            } else {
                reply.status(500).send({ error: 'Internal Server Error' });
            }
        }
    }

    async getAllUsers(req: FastifyRequest, reply: FastifyReply) {
        try {
           const users =  await this.userUsecases.getAllUsers()
           reply.status(200).send({users: users})
        } catch (error) {
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    }
}