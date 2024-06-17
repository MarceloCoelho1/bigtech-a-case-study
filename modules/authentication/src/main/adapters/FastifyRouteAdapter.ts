import { FastifyReply, FastifyRequest, RouteHandlerMethod } from 'fastify';
import { UserController } from '../../presentation/controllers/UserController';
import { AuthController } from '../../presentation/controllers/AuthController';

export const adaptUserRoute = (controller: UserController, method: keyof UserController): RouteHandlerMethod => {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    await controller[method](req, reply);
  };
};

export const adaptAuthRoute = (controller: AuthController, method: keyof AuthController): RouteHandlerMethod => {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    await controller[method](req, reply);
  };
};
