import { FastifyInstance } from 'fastify';
import { UserUseCases } from '../../core/domain/usecases/UserUseCases';
import { PrismaUserRepository } from '../../data/repositories/PrismaUserRepository';
import { UserController } from '../../presentation/controllers/UserController';
import { adaptRoute } from '../adapters/FastifyRouteAdapter';
import { JWTService } from '../../infra/adapters/JWTService';
import { BcryptService } from '../../infra/adapters/BcryptService';
import { env } from '../../shared/env';

export const userRouter = (app: FastifyInstance): void => {
  const userRepository = new PrismaUserRepository();
  const jwtService = new JWTService({ secret: env.JWT_SECRET, expiresIn: env.JWT_EXPIRES_IN });
  const bcryptService = new BcryptService();
  const userUseCases = new UserUseCases(userRepository, bcryptService, jwtService);
  const userController = new UserController(userUseCases);

  app.post('/users', adaptRoute(userController, 'createUser'));
  app.get('/users/:id', adaptRoute(userController, 'getUserById'));
  app.get('/users', adaptRoute(userController, 'getAllUsers'));
  app.put('/users', adaptRoute(userController, 'updateUser'));
  app.delete('/users/:id', adaptRoute(userController, 'deleteUser'));
};
