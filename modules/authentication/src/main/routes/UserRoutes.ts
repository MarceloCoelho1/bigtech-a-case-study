import { FastifyInstance } from 'fastify';
import { UserUseCases } from '../../core/domain/usecases/UserUseCases';
import { PrismaUserRepository } from '../../data/repositories/PrismaUserRepository';
import { UserController } from '../../presentation/controllers/UserController';
import { adaptUserRoute } from '../adapters/FastifyRouteAdapter';
import { JWTService } from '../../infra/adapters/JWTService';
import { BcryptService } from '../../infra/adapters/BcryptService';
import { env } from '../../shared/env';
import { PrismaUserActivationRepository } from '../../data/repositories/PrismaUserActivationRepository';
import { MailService } from '../../infra/adapters/MailService';


export const userRouter = (app: FastifyInstance): void => {
  const userRepository = new PrismaUserRepository();
  const jwtService = new JWTService({ secret: env.JWT_SECRET, expiresIn: env.JWT_EXPIRES_IN });
  const bcryptService = new BcryptService();
  const userActivationRepository = new PrismaUserActivationRepository()
  const mailService = new MailService()
  const userUseCases = new UserUseCases(userRepository, bcryptService, jwtService, userActivationRepository, mailService);
  const userController = new UserController(userUseCases);

  app.post('/users', adaptUserRoute(userController, 'createUser'));
  app.get('/users/:id', adaptUserRoute(userController, 'getUserById'));
  app.get('/users', adaptUserRoute(userController, 'getAllUsers'));
  app.put('/users', adaptUserRoute(userController, 'updateUser'));
  app.delete('/users/:id', adaptUserRoute(userController, 'deleteUser'));
};
