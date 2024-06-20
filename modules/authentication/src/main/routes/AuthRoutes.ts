import { FastifyInstance } from 'fastify';
import { PrismaUserRepository } from '../../data/repositories/PrismaUserRepository';
import { adaptAuthRoute } from '../adapters/FastifyRouteAdapter';
import { JWTService } from '../../infra/adapters/JWTService';
import { BcryptService } from '../../infra/adapters/BcryptService';
import { env } from '../../shared/env';
import { AuthUseCases } from '../../core/domain/usecases/AuthUseCases';
import { AuthController } from '../../presentation/controllers/AuthController';
import { MailService } from '../../infra/adapters/MailService';
import { PrismaUserActivationRepository } from '../../data/repositories/PrismaUserActivationRepository';

export const authRouter = (app: FastifyInstance): void => {
  const userRepository = new PrismaUserRepository();
  const jwtService = new JWTService({ secret: env.JWT_SECRET, expiresIn: env.JWT_EXPIRES_IN });
  const bcryptService = new BcryptService();
  const mailService = new MailService();
  const userActivationRepository = new PrismaUserActivationRepository()
  const authUseCases = new AuthUseCases(userRepository, jwtService, bcryptService, mailService, userActivationRepository);
  const authController = new AuthController(authUseCases);

  app.post('/auth/login', adaptAuthRoute(authController, 'login')); 
  app.post('/auth/forgotpassword', adaptAuthRoute(authController, 'forgotPassword')); 
  app.post('/auth/resetpassword', adaptAuthRoute(authController, 'resetPassword'))
  app.get('/auth/verify', adaptAuthRoute(authController, 'verifyUser'))
} 