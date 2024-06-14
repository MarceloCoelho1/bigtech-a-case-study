import { FastifyReply, FastifyRequest, RouteHandlerMethod } from 'fastify';
import { UserController } from '../../presentation/controllers/UserController';

export const adaptRoute = (controller: UserController, method: keyof UserController): RouteHandlerMethod => {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    await controller[method](req, reply);
  };
};
