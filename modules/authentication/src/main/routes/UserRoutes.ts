import { FastifyInstance } from 'fastify';
import { UserUseCases } from '../../core/domain/usecases/UserUseCases';
import { PrismaUserRepository } from '../../data/repositories/PrismaUserRepository';
import { UserController } from '../../presentation/controllers/UserController';
import { adaptRoute } from '../adapters/FastifyRouteAdapter';

export const userRouter = (app: FastifyInstance): void => {
  const userRepository = new PrismaUserRepository();
  const userUseCases = new UserUseCases(userRepository);
  const userController = new UserController(userUseCases);

  app.post('/users', adaptRoute(userController, 'createUser'));
  app.get('/users/:id', adaptRoute(userController, 'getUserById'));
  app.get('/users', adaptRoute(userController, 'getAllUsers'));
  app.put('/users', adaptRoute(userController, 'updateUser'));
  app.delete('/users/:id', adaptRoute(userController, 'deleteUser'));
};
