import { FastifyInstance } from "fastify";
import { PrismaUserRepository } from "../../data/repositories/prismaUserRepository";
import { UserUsecases } from "../../core/usecases/userUsecases";
import { BcryptService } from "../../infra/services/BcryptService";
import { UserController } from "../controller/userController";


export const userRoutes = (app: FastifyInstance): void => {
    const userRepository = new PrismaUserRepository()
    const bcryptService = new BcryptService()
    const userUsecases = new UserUsecases(userRepository, bcryptService)
    const userController = new UserController(userUsecases)

    app.get('/users', (req, reply) => userController.getAllUsers(req, reply));
    app.post('/users', (req, reply) => userController.create(req, reply));

}