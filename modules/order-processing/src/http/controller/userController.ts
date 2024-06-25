import { FastifyReply, FastifyRequest } from "fastify";
import { UserUsecases } from "../../core/usecases/userUsecases";
import { CreateUserDTO } from "../dtos/createUserDTO";
import { CreateUserSchema } from "../schemasValidation/createUserSchema";
import { UserAlreadyExists } from "../../core/errors/userAlreadyExistsError";
import { LoginUserDTO } from "../dtos/loginUserDTO";
import { LoginUserSchema } from "../schemasValidation/loginUserSchema";
import { UserNotExists } from "../../core/errors/userNotExistsError";
import { InvalidPassword } from "../../core/errors/invalidPasswordError";

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

            const token = await this.userUsecases.create(createUserData)
            reply.status(201).send({token: token})
        } catch (error) {
            if(error instanceof UserAlreadyExists) {
                reply.status(error.statusCode).send({ error: error.message });
            } else {
                reply.status(500).send({ error: 'Internal Server Error' });
            }
        }
    }

    async login(req: FastifyRequest, reply: FastifyReply) {
        try {
            const loginUserData = req.body as LoginUserDTO
            const result = LoginUserSchema.safeParse(loginUserData)

            if(!result.success) {
                return reply.status(400).send({errors: result.error.errors})
            }
            const token = await this.userUsecases.login(loginUserData)
            reply.status(201).send({token: token})

        } catch (error) {
            if(error instanceof UserNotExists) {
                reply.status(error.statusCode).send({ error: error.message });
            } else if(error instanceof InvalidPassword) {
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