import { FastifyInstance } from "fastify";
import { PrismaUserRepository } from "../../data/repositories/prismaUserRepository";
import { UserUsecases } from "../../core/usecases/userUsecases";
import { BcryptService } from "../../infra/services/BcryptService";
import { UserController } from "../controller/userController";
import { JWTService } from "../../infra/services/jwtService";


export const userRoutes = (app: FastifyInstance): void => {
    const userRepository = new PrismaUserRepository()
    const bcryptService = new BcryptService()
    const jwtService = new JWTService()
    const userUsecases = new UserUsecases(userRepository, bcryptService, jwtService)
    const userController = new UserController(userUsecases)

    app.get('/users', (req, reply) => userController.getAllUsers(req, reply));
    app.post('/users', (req, reply) => userController.create(req, reply));
    app.post('/users/login', (req, reply) => userController.login(req, reply))

}